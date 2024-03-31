
exports.post = async (req, res) => {
    try {
        
                const imagePath = req.file ? req.file.path : null;
        
                console.log("imagePath: "+imagePath)

        console.log(req.file, req.body)

        res.status(201).json({ message: 'Image erstellt', imageName: req.file.originalname});
    } catch (error) {
        console.error('Fehler beim Erstellen des Posts:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
};