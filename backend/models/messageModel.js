const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../database/checkConnection');

class Message extends Model {}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        senderID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        acceptorID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        sequelize,
        modelName: 'Messages',
        timestamps: true
    }
);

Message.sync()

module.exports = Message