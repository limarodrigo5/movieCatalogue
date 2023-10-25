# 🎬 Movie Catologue

Bem-vindo ao Movie Catologue! Esse projeto foi desenvolvido com o intuito de catalogar filmes e é perfeito para quem é apaixonado por cinema.

## 📖 Conteúdos

- **Backend** desenvolvido com Node.js:
  - Uso do framework `Express` para criação da API.
  - Banco de dados `SQLite` integrado com `Knex` para gerenciamento de queries e migrations.
- **Estrutura de diretórios** padrão MVC.

## 🚀 Funcionalidades do Backend
![Estrutura do Movie Catalogue](https://imgur.com/4VsaBBh.png)
![Funcionalidade de cada campo](https://imgur.com/dsVAxQQ.png)

### 🔎 MovieController
- **Criação de filmes**: Adiciona um novo filme ao catálogo com título, rating e link para a imagem.
- **Busca de filmes**: Retorna a lista de filmes, com opções de filtrar por título, rating ou link.
- **Deleção de filmes**: Permite remover um filme do catálogo a partir de seu ID.
- **Atualização de filmes**: Altera as informações de um filme existente.

### 🚪 UsersController
- **Registro**: Permite que novos usuários se registrem fornecendo email e senha.
- **Login**: Autentica um usuário com base no email e senha fornecidos.

### ⚙️ Configuração do Banco de Dados
- Utiliza migrations para criar e configurar as tabelas de filmes e usuários.

### 🔒 Segurança com bcryptjs

Para garantir a segurança das senhas dos usuários, o sistema utiliza a biblioteca `bcryptjs`. Essa biblioteca é responsável por:

- **Hashing de Senhas**: Antes de salvar a senha do usuário no banco de dados, a senha é transformada em um hash usando o `bcryptjs`. Isso significa que a senha original não é armazenada, apenas uma versão criptografada dela. 
- **Comparação de Senhas**: Durante o login, o `bcryptjs` compara a senha fornecida pelo usuário com o hash armazenado no banco de dados, sem nunca descriptografar o hash. Se a senha fornecida gerar o mesmo hash, o usuário é autenticado.
- **Salting**: Para tornar a criptografia ainda mais segura, o `bcryptjs` usa um "salt", que é basicamente um texto adicional misturado com a senha original para criar o hash. Isso torna cada hash único e ainda mais difícil de ser comprometido.

Usar o `bcryptjs` é uma prática recomendada na indústria para lidar com senhas e garantir que elas não sejam facilmente comprometidas em caso de qualquer brecha de segurança.

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

Foram utilizados os softwares [Insomnia](https://insomnia.rest/download) para montagem da API e [Beekeeper Studio](https://www.beekeeperstudio.io/get) para visualização dos dados.

Desenvolvido por Rodrigo Lima