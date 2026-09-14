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