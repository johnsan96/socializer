// models/post.js

const { DataTypes } = require('sequelize');
const { sequelize, db } = require('../db/db.js');

const Post = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING, // Spalte für den Dateipfad der hochgeladenen Datei
        allowNull: true // Erlaube NULL, falls kein Bild hochgeladen wird
    }
}, {
    tableName: 'post',
    timestamps: false
});

module.exports = Post;
