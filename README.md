🎬 Echo

Plataforma Web para Reviews e Interação Social sobre Conteúdos Geek








📖 Sobre o Projeto

O Echo é uma plataforma web desenvolvida como Trabalho de Conclusão de Curso (TCC), com o objetivo de oferecer um ambiente unificado para publicação de reviews e interação entre usuários interessados em conteúdos de entretenimento, como filmes, séries, jogos, animes, mangás e demais mídias da cultura geek.

A proposta surgiu da observação de que grande parte das plataformas disponíveis atualmente são segmentadas em nichos específicos, dificultando a centralização de opiniões, avaliações e discussões em um único ambiente.

O sistema busca promover a formação de comunidades digitais por meio da troca de experiências, recomendações e debates entre usuários com interesses em comum.

🎯 Objetivos
Objetivo Geral

Desenvolver uma plataforma web que permita a publicação de reviews e a interação social entre usuários interessados em conteúdos de entretenimento.

Objetivos Específicos
Permitir o cadastro e autenticação de usuários.
Disponibilizar a criação e gerenciamento de reviews.
Implementar interação através de comentários e curtidas.
Possibilitar denúncias de conteúdos inadequados.
Disponibilizar ferramentas administrativas para moderação.
Centralizar discussões sobre diferentes categorias de mídia em uma única plataforma.
✨ Funcionalidades
👤 Usuários
Cadastro de conta
Login e autenticação
Gerenciamento de perfil
Edição de informações pessoais
📝 Reviews
Criação de reviews
Edição de reviews
Exclusão de reviews
Avaliação de conteúdos
Organização por categorias
💬 Interação Social
Sistema de comentários
Curtidas em publicações
Visualização de perfis
Participação em discussões
🚨 Moderação
Sistema de denúncias
Análise de conteúdo reportado
Remoção de conteúdos inadequados
Gerenciamento de usuários
⚙️ Administração
Painel administrativo
Controle de denúncias
Moderação de publicações
Gestão da comunidade
🏗️ Arquitetura do Sistema

O projeto foi desenvolvido seguindo a arquitetura cliente-servidor.

┌─────────────────┐
│     React       │
│    Front-end    │
└────────┬────────┘
         │ REST API
         ▼
┌─────────────────┐
│ Node.js + Express│
│    Back-end      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│    Database     │
└─────────────────┘
Front-end

Responsável pela interface do usuário, consumo das APIs e gerenciamento da experiência de navegação.

Tecnologias:

React
JavaScript
HTML5
CSS3
Back-end

Responsável pelas regras de negócio, autenticação, autorização e comunicação com o banco de dados.

Tecnologias:

Node.js
Express.js
JWT
REST API
Banco de Dados

Responsável pelo armazenamento persistente das informações do sistema.

Tecnologia:

PostgreSQL
🗄️ Principais Entidades
Usuário
Cadastro
Autenticação
Perfil
Review
Título
Conteúdo
Nota
Categoria
Autor
Comentário
Conteúdo
Autor
Data de publicação
Curtida
Usuário
Review
Denúncia
Motivo
Conteúdo denunciado
Status
🔒 Segurança

O sistema implementa mecanismos para garantir a segurança das informações dos usuários:

Autenticação baseada em JWT
Controle de acesso por permissões
Proteção de rotas privadas
Validação de dados no servidor
Criptografia de senhas
🚀 Tecnologias Utilizadas
Camada	Tecnologia
Front-end	React
Back-end	Node.js
Framework API	Express
Banco de Dados	PostgreSQL
Autenticação	JWT
Controle de Versão	Git
Hospedagem	(Definir conforme implementação)
📷 Telas do Sistema
Página Inicial

Inserir screenshot

Feed de Reviews

Inserir screenshot

Detalhes da Review

Inserir screenshot

Perfil do Usuário

Inserir screenshot

Painel Administrativo

Inserir screenshot

📚 Trabalho Acadêmico

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC) para obtenção do título de Bacharel/Tecnólogo em Sistemas de Informação.

Tema

Desenvolvimento de uma Plataforma Web para Reviews e Interação Social sobre Conteúdos Geek

Área de Pesquisa
Desenvolvimento Web
Redes Sociais
Sistemas de Informação
Experiência do Usuário
👨‍💻 Autor

Mike

Desenvolvedor Full Stack e autor do projeto Echo.

📄 Licença

Este projeto possui finalidade acadêmica e foi desenvolvido para apresentação como Trabalho de Conclusão de Curso.

Todos os direitos reservados ao autor.
