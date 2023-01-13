const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../database/checkConnection');
const Message = require('./messageModel.js');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAvatarImageSet: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        avatarImage: {
            type: DataTypes.TEXT,
            default: "",
        },
        longitude: {
            type: DataTypes.STRING,
            default: "",
        },
        latitude: {
            type: DataTypes.STRING,
            default: "",
        }
    }, 
    {
        sequelize,
        modelName: 'Users',
        timestamps: false
    }
);

User.hasMany(Message ,{
    foreignKey: "senderID",
    onDelete: "cascade"
})

User.sync()

module.exports = User