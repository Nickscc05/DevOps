# Script para reiniciar e registrar o log 

O primeiro passo é criar nosso arquivo de script através do  vi, para isso utilizaremos o comando `vi restart-log.sh` ao entrar no vi devemos pressionar o i para que possamos entrar no modo de inserção. 

#!/bin/bash - Diz ao SO qual insterpretador usar para executar nosso script 
LOG_FILE="/home/ubuntu/aws-docker/restart.log" - Cria a variável LOG_FILE, que guarda o caminho completo de onde o log vai ser escrito. 
cd /home/ubuntu/aws-docker - O docker compose precisa ser executado de dentro da pasta onde está o compose.yml

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Reiniciando containers..." >> "$LOG_FILE"
docker compose restart >> "$LOG_FILE" 2>&1
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Containers reiniciados." >> "$LOG_FILE"


 .---------------- minuto (0 - 59)
 |  .------------- hora (0 - 23)

 |  |  .---------- dia do mês (1 - 31)
 |  |  |  .------- mês (1 - 12)
 |  |  |  |  .---- dia da semana (0 - 6) (Domingo é 0 ou 7)
 |  |  |  |  |
 *  *  *  *  *  comando_para_executar
