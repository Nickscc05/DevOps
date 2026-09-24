# Script para reiniciar e registrar o log 

O primeiro passo é criar nosso arquivo de script através do  vi, para isso utilizaremos o comando `vi restart-log.sh` ao entrar no vi devemos pressionar o i para que possamos entrar no modo de inserção. 

```bash
#!/bin/bash - Diz ao SO qual insterpretador usar para executar nosso script 
LOG_FILE="/home/ubuntu/aws-docker/restart.log" 
cd /home/ubuntu/aws-docker

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Reiniciando containers..." >> "$LOG_FILE"
docker compose restart >> "$LOG_FILE" 2>&1
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Containers reiniciados." >> "$LOG_FILE"`
```
- `LOG_FILE`: variável com o caminho do arquivo onde o histórico de restarts é registrado.
- `cd /home/ubuntu/aws-docker`: garante que o `docker compose` seja executado a partir do diretório correto, independente de onde o agendador dispare o script.
- `date '+%Y-%m-%d %H:%M:%S'`: gera um timestamp legível (ano-mês-dia hora:minuto:segundo), usado para marcar início e fim de cada restart.
- `>> "$LOG_FILE"`: redireciona a saída **acrescentando** ao final do arquivo (não sobrescrevendo), preservando o histórico de execuções anteriores.
- `2>&1`: redireciona também as mensagens de erro (stderr) para o mesmo log, não só a saída normal (stdout) — garante que falhas do `docker compose restart` fiquem registradas.
- `chmod +x`: concede permissão de execução ao script.




