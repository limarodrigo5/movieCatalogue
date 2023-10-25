const sqliteConnection = require('../../sqlite');

const createUsers = require('./createUsers');

const migrationsRun = async () => {
const schemas = [
    createUsers
].join('');

sqliteConnection()
.then(db => db.exec(schemas))
.catch(error => console.log(error));
}

module.exports = migrationsRun;