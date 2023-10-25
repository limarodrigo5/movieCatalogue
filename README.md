# 🎬 Movie Catologue

Bem-vindo ao Movie Catologue! Esse projeto foi desenvolvido com o intuito de catalogar filmes e é perfeito para quem é apaixonado por cinema.

## 📖 Conteúdos

- **Backend** desenvolvido com Node.js:
  - Uso do framework `Express` para criação da API.
  - Banco de dados `SQLite` integrado com `Knex` para gerenciamento de queries e migrations.
- **Estrutura de diretórios** padrão MVC.

![Estrutura do Movie Catalogue](https://imgur.com/4VsaBBh.png)
![Funcionalidade de cada campo](https://imgur.com/dsVAxQQ.png)

## 🚀 Como usar

1. **Clone o repositório**:
```bash
git clone https://github.com/limarodrigo5/movieCatalogue.git
```
2. **Instale as dependências**:
```bash
npm install
```
3. **Rode as migrations para configurar o banco de dados:**
```bash
npx knex migrate:latest
```
4. **Inicie a aplicação backend:**
```bash
npm run start
```

Prontinho! Agora o servidor estará rodando na porta definida e você já pode começar a usar a API do Movie Catologue.

Desenvolvido por Rodrigo Lima