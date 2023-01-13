const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ShitChat", "rlytvynov", "ussrTheBest", {
    host: "localhost",
    dialect: "mysql",
});
  
const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {sequelize, checkConnection}