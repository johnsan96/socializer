const model = require("../models/user")
const bcrypt = require('bcrypt');

exports.post = async (req, res) => {
    try {
        const { name, description, password, email } = req.body;

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            // Erstelle einen neuen Post-Eintrag
            const newPost = await model.create({
                username: name,
                description,
                password: hash,
                email: email
            });

            res.status(201).json({ message: 'User erstellt', user: newPost });

        })


    } catch (error) {
        console.error('Fehler beim Erstellen des Posts:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};

exports.getUser = async (req, res) => {
    try {
        // Abfrage aller Beiträge aus der Datenbank
        const posts = await model.findAll();

        // Erfolgreiche Antwort mit den abgerufenen Beiträgen
        res.status(200).json(posts);
    } catch (error) {
        // Fehlerbehandlung bei einem Fehler während der Abfrage
        console.error('Fehler beim Abrufen der Beiträge:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};