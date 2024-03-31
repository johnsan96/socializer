const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.js');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
   
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;
