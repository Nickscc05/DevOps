## Etapa 01 - Instale Docker Engine e Docker Compose.

`lsb_release -a` - Nos mostra as informações padornizadas da distribuição Linux. 

## Passo 1: atualizar a lista de pacotes e instalar dependências

`sudo apt-get update`

`sudo apt-get update`

## Passo 2: adicionar a chave GPG oficial do Docker

`sudo install -m 0755 -d /etc/apt/keyrings`

`sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc`

`sudo chmod a+r /etc/apt/keyrings/docker.asc`

## Passo 3: adicionar o repositório do Docker à lista de fontes do apt

` echo \
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
   $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null `

## Passo 4: atualizar novamente e instalar o Docker

`sudo apt-get update`

`sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`

## Etapa 02 - Habilite e inicie o serviço do Docker.

`sudo systemctl status docker` 

Active: active (running) → o daemon está rodando agora, processando containers.
Loaded: ... enabled; preset: enabled → está habilitado para iniciar automaticamente no próximo boot da instância.

Se viesse desativado teriamos que rodar o comando abaixo:

`sudo systemctl enable --now docker`

`docker --version` confirma a engine principal

`docker compose version` confirma especificamente o plugin do Compose (lembra: são pacotes diferentes, docker-ce e docker-compose-plugin, então vale confirmar os dois isoladamente)

## Etapa 03 - Examine backend/package.json e backend/server.js.

`cat backend/package.json` - Aqui teremos o retorno basicamente do nosso documento de identidade do nosso 

`cat backend/server.js` - 

## Etapa 04 - Crie um Dockerfile para o backend.

vi backend/Dockerfile

FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

## Etapa 05 - Crie um Dockerfile para o frontend usando o frontend/nginx.conf.

Foi realizado a verificação antes de seguir com o dockerfile 

cat frontend/index.html
echo "---"
cat frontend/nginx.conf

## Etapa 06 - Complete o compose.yml com os serviços backend e frontend.

## Etapa 07 - Configure as variáveis de ambiente e a dependência saudável do banco.

## Etapa 08 - Suba os serviços e valide a aplicação pelo navegador e pelos endpoints de saúde. 

- Aplicação pelo navegador

![alt text](image.png)

- Endpoints de saúde

![alt text](image-1.png)
![alt text](image-2.png)
