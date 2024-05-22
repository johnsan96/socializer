const sqlite3 = require('sqlite3').verbose(); // Importieren Sie sqlite3 auf herkömmliche Weise
const { Sequelize } = require('sequelize'); // Importieren Sie Sequelize auf herkömmliche Weise

// Pfad zur SQLite-Datenbankdatei
/* const dbPath = "/home/john/Dokumente/projects/socializer/backend/socializer.db"; */
const dbPath = "/usr/src/app/socializer.db"
// Erstellen Sie eine neue Instanz von Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath
});

// Öffnen Sie die Verbindung zur SQLite-Datenbank mit sqlite3
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Fehler beim Öffnen der Datenbank', err.message);
    } else {
        console.log('Verbindung zur SQLite-Datenbank hergestellt.');
    }
});

// Exportieren Sie sequelize und db
module.exports = { sequelize, db };
