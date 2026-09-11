#  JumpServer  

## Conceito

O JumpServer é uma plataforma de código aberto voltada para a gestão de acessos privilegiados (PAM - Privileged Access Management) e bastion host moderno. Ele centraliza a autenticação, controle de autorizações e auditoria de conexões administrativas a servidores, bancos de dados, clusters Kubernetes e dispositivos de rede. Os principais benefícios de sua implantação dividem-se em segurança, governança e eficiência operacional. 

## Centralização e Redução da Superfície de Ataque 
- **Ponto Único de Entrada:** Elimina a necessidade de expor portas administrativas críticas (como SSH 22, RDP 3389 ou bancos de dados) diretamente à rede corporativa ou internet. Apenas o JumpServer precisa se comunicar com os ativos de backend.

- **Acesso Web Universal:** Permite conexões a sessões SSH, Telnet, Kubernetes CLI e interfaces RDP diretamente pelo navegador (via HTML5/Apache Guacamole), sem exigir clientes locais pesados ou túneis complexos no endpoint do operador.

- **Segregação de Redes:** Facilita o controle de tráfego entre redes de gerenciamento (OOB/Management) e zonas operacionais, atuando como o intermediário confiável.

## Gestão Segura de Credenciais e Zero Trust

- **Ocultação de Credenciais Reais:** Os administradores conectam-se usando suas próprias identidades corporativas; o JumpServer injeta automaticamente senhas privilegiadas ou chaves SSH nos nós finais, impedindo o compartilhamento de senhas root/admin.

- **Integração de Identidades Corporativas:** Suporta autenticação federada com diretórios existentes (Active Directory, OpenLDAP, SAML 2.0, OAuth2/OIDC).

- **MFA Nativo e Obrigatório:** Permite forçar autenticação multifator (TOTP, tokens de hardware, SMS) antes de conceder qualquer nível de acesso aos ativos críticos.

## Auditoria e Conformidade Regulatória

- **Gravação Completa de Sessões:** Registra todas as sessões gráficas (RDP/VNC) em vídeo e as sessões de terminal (SSH/Telnet) em logs de texto reproduzíveis quadro a quadro.

- **Rastreabilidade Indelével:** Cada comando digitado fica atrelado ao usuário real autenticado, eliminando o anonimato de contas genéricas ou compartilhadas.

- **Adequação a Frameworks e Leis:** Fornece evidências robustas de conformidade com padrões de segurança e governança (como ISO 27001, LGPD, PCI-DSS e políticas internas de segurança da informação).

## Controle Granular de Acesso (RBAC) e Mitigação de Riscos

- **Listas de Bloqueio e Filtro de Comandos:** Permite criar regras que impedem a execução de comandos destrutivos (como rm -rf /, reboot, drop database) ou alertam a equipe de resposta a incidentes em tempo real.

- **Controle Temporal e Aprovação de Acesso:** Suporta fluxo de trabalho de autorização com prazo de validade (JIT - Just-in-Time access), concedendo privilégios temporários sob demanda.

- **Interrupção de Sessão Ativa:** Administradores de segurança podem monitorar conexões simultâneas e derrubar sessões suspeitas em tempo real.

## Custo-Benefício e Ecossistema

**Open Source Flexível:** Reduz drasticamente custos de licenciamento em comparação com soluções PAM proprietárias (CyberArk, BeyondTrust), mantendo arquitetura modular baseada em containers (Docker/Kubernetes).

**Amplo Suporte a Protocolos:** Abrange ecossistemas heterogêneos (Linux, Windows, switches/roteadores de diversos fabricantes, nós Kubernetes e bancos MySQL, PostgreSQL, Oracle).


## Como o JumpServer responde a cada ponto da exigência

| Trecho do Requisito | Como o JumpServer cumpre na prática |
|---|---|
| Eliminar digitação de senhas nas conexões técnicas |  O operador nunca digita a senha do servidor de destino. As contas de sistema configuradas no JumpServer utilizam exclusivamente chave pública/privada (ou SSH CA). A autenticação no nó de destino ocorre de ponta a ponta sem tráfego de senhas administrativas na rede. |
| Mitigar risco de interceptação keyloggers no endpoint | O operador não guarda a chave privada do servidor na máquina dele. A chave privada real fica isolada no cofre do JumpServer. Mesmo que a máquina do técnico tenha um keylogger ou malware, ele não consegue roubar o arquivo da chave privada do servidor nem capturar senhas com privilégio de root. |
| Prevenir ataques de força bruta no SSH | O JumpServer assume a conexão e permite fechar o SSH dos servidores finais para aceitar conexões apenas da rede/IP do JumpServer e desabilitar totalmente PasswordAuthentication no no sshd_config. Tentativas de força bruta externas contra os servidores tornam-se impossíveis. |
| Controle estrito de identificação sobre quem acessa | O JumpServer assume a conexão e permite fechar o SSH dos servidores finais para aceitar conexões apenas da rede/IP do JumpServer e desabilitar totalmente PasswordAuthentication no no sshd_config. Tentativas de força bruta externas contra os servidores tornam-se impossíveis. |
| Prevenir ataques de força bruta no SSH | Resolve a falha clássica de chaves SSH compartilhadas (id_rsa de equipe). Cada operador entra no JumpServer com seu usuário nominal individual (integrado ao Active Directory/LDAP ou SAML/MFA). O JumpServer atrela a sessão individual ao login real no servidor, gerando rastreabilidade total (quem, quando, comandos executados e gravação em vídeo/log da sessão). |


