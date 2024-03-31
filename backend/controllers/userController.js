const model = require("../models/user")

exports.post = async (req, res) => {
    try {
        const { name, description, password, email } = req.body;
   

        // Erstelle einen neuen Post-Eintrag
        const newPost = await model.create({
            username:name,
            description,
            password,
            email
        });

        res.status(201).json({ message: 'Post erstellt', post: newPost });
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