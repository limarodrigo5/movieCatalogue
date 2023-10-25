const { hash, compare } = require('bcryptjs');

const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');

class UsersController { 

    async create(request, response, next) {
        try {
        const { name, email, password } = request.body;

        const database = await sqliteConnection();
        const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if (checkUserExists) {
            throw new AppError('Esse email já está sendo utilizado.');
        }

        const hashedPassword = await hash(password, 8);

        await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword.toString()]);
        
        return response.status(201).send({ message: 'Usuário criado com sucesso!' });
    }
 catch (error) {
    next(error);
}
}

async update(request, response, next) {
    try {
      const { name, email, password, old_password } = request.body;
      const { id } = request.params;
  
      const database = await sqliteConnection();
      const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);
  
      if (!user) {
        throw new AppError('Usuário não encontrado.');
      }
  
      const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);
  
      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError('Esse email já está sendo utilizado.');
      }
  
      user.name = name || user.name;
      user.email = email || user.email;
  
      if (password && !old_password) {
        throw new AppError('Você precisa informar a senha antiga para atualizar a senha.');
      }
  
      if (password && old_password) {
        const checkOldPassword = await compare(old_password, user.password);
  
        if (!checkOldPassword) {
          throw new AppError('A senha antiga está incorreta.');
        }
  
        user.password = await hash(password, 8);
      }
  
      await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`, 
        [user.name, user.email, user.password, id]
      );
  
      return response.send({ message: 'Usuário atualizado com sucesso!' });
  
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erros
    }
  }
};

module.exports = UsersController;
