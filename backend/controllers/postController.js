const isAuth = require("../middleware/isAuth")

const model = require("../models/post")

exports.post = async (req, res) => {
    try {
        const { title, description, image_url } = req.body;
   

        const newPost = await model.create({
            title,
            user_id: 1,
            description,
            image_url: image_url 
        });

        res.status(201).json({ message: 'Post erstellt', post: newPost });
    } catch (error) {
        console.error('Fehler beim Erstellen des Posts:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
      
        const posts = await model.findAll();

        res.status(200).json(posts);
    } catch (error) {
     
        console.error('Fehler beim Abrufen der Beiträge:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};