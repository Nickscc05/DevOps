#  JumpServer  

## Conceito

O JumpServer é uma plataforma de código aberto voltada para a gestão de acessos privilegiados (PAM - Privileged Access Management) e bastion host moderno. Ele centraliza a autenticação, controle de autorizações e auditoria de conexões administrativas a servidores, bancos de dados, clusters Kubernetes e dispositivos de rede. Os principais benefícios de sua implantação dividem-se em segurança, governança e eficiência operacional. 

## Centralização e Redução da Superfície de Ataque 
- Ponto Único de Entrada: Elimina a necessidade de expor portas administrativas críticas (como SSH 22, RDP 3389 ou bancos de dados) diretamente à rede corporativa ou internet. Apenas o JumpServer precisa se comunicar com os ativos de backend.

- Acesso Web Universal: Permite conexões a sessões SSH, Telnet, Kubernetes CLI e interfaces RDP diretamente pelo navegador (via HTML5/Apache Guacamole), sem exigir clientes locais pesados ou túneis complexos no endpoint do operador.

- Segregação de Redes: Facilita o controle de tráfego entre redes de gerenciamento (OOB/Management) e zonas operacionais, atuando como o intermediário confiável.




