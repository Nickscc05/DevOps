# Laboratório de Troubleshooting — DevOps
 
## Objetivo

Foi apresentado um ambiente Linus que executa uma aplicação web simples. A aplicação possui três camadas: 

- Uma interface Web;
- Uma API responsável pela lógica de aplicação;
- Um banco de dados que armazena os dados exibidos.

O ambiente foi preparado com uma falha controlada. A missão era investigar o estado da aplicação, identificar a causa raiz e reativar o fluxo completo para que a págin volte a funcionar. 

## Resultado esperado

Ao concluir o laboratório: 

- A aplicação estará acessível pelo endereço recebido;
- A interface conseguirá consultar e exibir os dados do banco;  
- Os serviços necessários estarão funcionando;
- Você conseguirá explicar em qual camada estava o problema e por que a correção resolveu o incidente. 

## Ambiente 

| Item | Detalhe |
|---|---|
| Instância | AWS EC2 (`trainee-01`) |
| Sistema operacional | Ubuntu |
| Servidor web / proxy | Nginx |
| API | Node.js (serviço systemd `training-api`) |
| Banco de dados | PostgreSQL 16 |
| Acesso | SSH via chave (`lab.pem`) |

## Arquitetura de fluxo de requisição 

```
Navegador → Nginx (porta 80) → API Node.js (porta 3000) → PostgreSQL (porta 5432)
```

Durante o processo foi importante entender como tudo se relaciona, é como se fosse uma corrente está tudo ligado um ao outro. Então, quando um elo quebra tudo que vem depois dele para de funcionar também - nosso papel é investigar a situação e entender em qual camada está nossso problema mas pra isso devemos analisar do inicio ao fim fazendo validações antes de prosseguir para a próxima camada. É importante entender e achar o erro para depois procurar a melhor solução. 

---

## Estado Inicial 

Ao acessar a aplicação pela primeira vez, existia o seguinte erro: 

![alt text](<Captura de tela 2026-09-14 142627.png>)

Esse erro está nos informando um sintoma na verdade, descreve algo que aparece no **front-end**, mas não necessáriamente está relacionado com a origem do problema. É aqui que podemos começar a investigação.

---

## Incidente 1 - Falha ao encaminhar o Nginx para a porta correta

### Passo a passo 

**1. Levantamento inicial das portas da nossa aplicação**

```bash
sudo ss -tulpn
```

Esse comando foi inserido para podermos ter uma visão geral de todos os processos que estavam sendo escutados nas portas do servidor.

- `-t` → mostra sockets TCP
- `-u` → mostra sockets UDP
- `-l` → mostra apenas sockets em modo *listening* (escutando), não conexões já estabelecidas
- `-p` → mostra qual processo (nome e PID) é dono de cada socket
- `-n` → mostra números de porta em vez de tentar resolver nomes de serviço, o que deixa a leitura mais rápida

**2. Verificação do Nginx**

```bash
sudo nginx -T
```

Ao inserirmos é solicitado ao nginx a sintaxe da sua própria configuração e imprimir no nosso terminal o conteúdo completo dos arquivos de configuração carregados. É um comando bastante útil pois nos retorna exatamente a configurações e principalmente as ativas, ao analisar chegamos a primeira questão foi nos retornado um output que mostrava o proxy_pass que finalizava com a porta 3001.


**3. Confirmação de que o Nginx estava funcionando corretamente** 

```bash
systemctl status nginx --no-pager
```

O seguinte comando foi inserido para termos as seguintes confirmações: Se o Nginx estava **rodando agora** (`active (running)`) e se estava habilitado para subir automaticamente em um reboot (`enabled`). A flag `--no-pager` serve para mostrar apenas o necessário. 

![alt text](<Captura de tela 2026-09-15 101215.png>)

**4. Detalhe do que estava sendo escutado porém filtrado para TCP**
 
```bash
sudo ss -lntp
```
 
Essa versão do `ss`, nos retorna um olhar apenas para sockets TCP em escuta (`-l` listening, `-n` números de porta, `-t` TCP, `-p` processo). Foi aqui que foi possível comparar com a saída do `nginx -T`, e perceber o problema central:

```
LISTEN  0  511  ***.*.*.*:3000  users:(("node",pid=4157,...))
```
 
O processo Node (a API) estava escutando na porta **3000**, e **nenhuma linha da saída mostrava algo escutando na porta 3001** — que era exatamente a porta para onde o Nginx estava configurado a repassar as requisições de `/api/`.

## Identificação/Solução do erro

Como foi possível ver acima o nosso primeiro problema estava se dando porque o Nginx encaminhava as requisições de '/api/' para '***.*.*.*:3001', mas o processo da API (node) estava sendo escutado na porta '3000'. Como não havia nada sendo escutado na porta 3001 a conexão do proxy falhava o que nos gerava o erro  `Unexpected token '<'` mas é importante lembrar que essa mensagem não tinha uma ligação 100% direta com o nosso problema em si (porta errada). O que acontecia era : 

1. O front-end fazia uma requisição para `/api/...`, esperando uma resposta em **JSON**.
2. O Nginx tentava repassar essa requisição para `***.*.*.*:3001`, mas **não havia ninguém escutando ali** (conexão recusada).
3. Quando esse repasse falha, o **próprio Nginx** gera uma página de erro — e páginas de erro do Nginx são, por padrão, em **HTML** (começam com `<html>` ou similar).
4. O front-end recebia essa resposta e tentava interpretá-la como JSON. Como o primeiro caractere encontrado era `<` (início de uma tag HTML), o parser de JSON falhava com exatamente esse erro: `Unexpected token '<'`.