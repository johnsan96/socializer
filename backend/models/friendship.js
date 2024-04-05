const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db.js');

const Friendship = sequelize.define('friendship', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true

    },
    friend_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }

}, {
    tableName: 'friendships',
    timestamps: false
   
});

module.exports = Friendship;
