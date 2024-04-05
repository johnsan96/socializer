const isAuth = require("../middleware/isAuth")

const model = require("../models/friendship")

exports.post = async (req, res) => {
    try {
        const { user_id, friend_id } = req.body;

        const newFriend = await model.create({
            user_id: user_id,
            friend_id: friend_id
        });

        res.status(201).json({ message: 'erfolgreich ein Freund hinzugefügt', post: newFriend });
    } catch (error) {
        console.error('Fehler beim hinzufügen eines Freunds:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};

exports.getFriendsFromUser = async (req, res) => {
    try {
        const { user_id } = req.body;
        const friends = await model.findAll({ where: { user_id: user_id } });

        res.status(200).json(friends);
    } catch (error) {
        console.error('Fehler beim Abrufen der Freunde:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};