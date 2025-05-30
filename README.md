
# Sistema de Orçamentos - Boa Vista Seguros

## 📑 Descrição do Projeto
O **Sistema de Orçamentos** é uma solução desenvolvida para a geração e gestão de orçamentos personalizados, alinhados às apólices de seguro contratadas pelos clientes. O sistema visa:

- Otimizar o atendimento.
- Oferecer propostas adequadas.
- Manter o histórico de interações de forma segura e estruturada.

## 🎯 Objetivo
Fornecer uma ferramenta eficiente para controle de orçamentos, permitindo que a equipe da Boa Vista Seguros atenda seus clientes de forma ágil, segura e profissional, com fácil acesso às informações e histórico.

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript
- **Backend:**
  - APIs REST (HTTP: GET, POST, PUT, DELETE)
    - Autenticação por token (JWT)
    - Utilização do Knex
    - Bcrypt para criação de senhas
    - Puppeteer para gerar PDF
- **Integração de Dados:**
  - Processos de ETL e consumo de APIs
- **Infraestrutura:**
  - AWS (Amazon Web Services)
    - Hospedagem de aplicações e bancos de dados
    - Modelo SaaS (Software como Serviço)
    - Alta escalabilidade, disponibilidade e segurança

## 🔗 Funcionalidades Principais

- Criação, edição e exclusão de orçamentos.
- Consulta de apólices e dados de clientes.
- Integração de dados de múltiplas fontes (via ETL ou APIs).
- Histórico de interações com clientes.
- Interface web responsiva e acessível.
- Comunicação eficiente entre frontend e backend por meio de APIs REST.

## 🏗️ Como Instalar e Executar o Projeto

### Pré-requisitos:
- Navegador web atualizado
- Conexão com a internet
- Acesso à AWS (ou serviço similar, caso seja adaptado)

### Instalação local (para testes ou desenvolvimento):

1. Clone este repositório:
   ```bash
   git clone https://github.com/Mateus608/ProjetoIntegrado-BVCSeguros.git
   ```
2. Acesse a pasta do projeto
3. Acesse o terminal
4. Instale as dependências:
   ```bash
   npm install
   ```
5. Crie o arquivo `.env` na raiz do projeto e configure da seguinte forma:
   ```env
   PORT=porta_do_servidor
   DB_HOST=local_do_banco
   DB_USER=usuario_do_banco
   DB_PASSWORD=senha_do_banco
   DB_DATABASE=nome_do_banco
   SECRET=sua_chave_secreta_para_token
   ```
6. Inicie o projeto:
   ```bash
   npm start
   ```
