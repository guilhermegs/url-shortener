# Encurtador de URL

Disponibiliza uma API para encurtar urls e acessá-las após encurtadas.

---

## Rodando local

1. Instale as dependências do projeto rodando o seguinte comando, pelo terminal, na raiz do projeto:

   ```bash
   npm install
   ```

2. Crie um arquivo .env na raiz do projeto com as seguintes propriedades:

   ```bash
   DB_USER=...
   DB_PASSWORD=...
   DB_HOST=...
   DB_PORT=...
   DB_DATABASE=...
   BASE_URL=...
   ```

3. Inicie a aplicação:

   ```bash
   npm start
   ```

3. A aplicação irá iniciar e será criada uma página do swagger com a documentação em:

   ```
   http://localhost:3333/api-docs/

   ```
---

## Arquitetura e Padrões

Este projeto segue os princípios e a estrutura de projeto definidas pelo Robert C. Martin (Uncle Bob) em seu livro "Clean Architecture"

Robert C. Martin, mais conhecido como Uncle Bob, propôs um estilo de arquitetura chamado Clean Architecture, onde as diferentes partes do sistema, possuem um baixo grau de dependência, ou seja, fraco acoplamento, resultando em uma fácil manutenibilidade e testabilidade.

Esse estilo foi derivado de outras idéias arquiteturais existentes, dentre elas a Arquitetura Cebola e Arquitetura Hexagonal que em sua essência, compartilhavam idéias similares.

---