## LINUX NOTE
# Comandos de Diagnóstico e Reset de Senha — Linux (RHEL/Rocky)

## Diagnóstico de conta e senha

| Comando | Função |
|---|---|
| `passwd -S usuario` | Mostra o status da senha: P (ativa), L (bloqueada), NP (sem senha), data da última troca e políticas de expiração da senha |
| `chage -l usuario` | Mostra info detalhada de expiração: última troca, expiração da senha, **expiração da conta**, dias mínimos/máximos entre trocas, aviso |
| `faillock --user usuario` | Mostra tentativas de login falhadas registradas (exige authselect com feature with-faillock habilitada) |
| `authselect current` | Mostra qual profile do authselect está ativo e quais features estão habilitadas |
| `lastlog -u usuario` | Mostra o último login do usuário |
| `last usuario` | Histórico de logins/logouts do usuário |
| `journalctl -u sshd` | Logs do serviço SSH, útil pra ver erros de autenticação detalhados |

## Reset e alteração de senha

| Comando | Função |
|---|---|
| `passwd usuario` | Define/altera a senha do usuário interativamente |
| `chpasswd` | Define senha em lote via pipe (ex: `echo "usuario:senha" \| chpasswd`) |
| `passwd -l usuario` | Bloqueia (trava) a conta do usuário |
| `passwd -u usuario` | Desbloqueia a conta do usuário |

## Expiração e políticas (chage)

| Comando | Função |
|---|---|
| `chage -E -1 usuario` | Remove a expiração da conta (deixa sem validade) |
| `chage -E YYYY-MM-DD usuario` | Define uma data de expiração para a conta |
| `chage -d 0 usuario` | Força troca de senha no próximo login (zera a data da última troca) |
| `chage -M dias usuario` | Define o máximo de dias que a senha pode ficar sem ser trocada |
| `chage -m dias usuario` | Define o mínimo de dias entre trocas de senha |
| `chage -W dias usuario` | Define quantos dias antes de expirar o usuário recebe aviso |

## Gerenciamento de usuário e shell

| Comando | Função |
|---|---|
| `useradd usuario` | Cria um novo usuário |
| `userdel usuario` | Remove o usuário (mantém home) |
| `userdel -r usuario` | Remove o usuário e a pasta home junto |
| `usermod -s /sbin/nologin usuario` | Bloqueia login via shell (usado geralmente para contas de serviço) |
| `usermod -s /bin/bash usuario` | Restaura o shell padrão (bash) para o usuário |
| `pkill -u usuario` | Encerra todos os processos/sessões ativas de um usuário |

## Autenticação (authselect)

| Comando | Função |
|---|---|
| `authselect select sssd --force` | Define o profile sssd como ativo (necessário para faillock funcionar) |
| `authselect enable-feature with-faillock` | Habilita o rastreamento de tentativas de login via faillock |

## Observações importantes

- **`passwd -S` não mostra expiração de conta** — só de senha. Sempre cruze com `chage -l` quando o diagnóstico não fechar.
- Conta expirada (`chage -E`) bloqueia login mesmo com senha correta e ativa (`passwd -S` mostrando `P`).
- PAM registra tentativas de login falhas automaticamente no `last`/`lastlog`, mesmo sem faillock ativo.