const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const model = require("../models/user")

/* export async function getProjectById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ error: 'Projekt nicht gefunden' });
        }
        res.json(project);
    } catch (error) {
        console.error('Fehler beim Abrufen des Projekts:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen des Projekts' });
    }
} */

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

exports.login = (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    model.findOne({
        where: {
            username: name
        }
    })
        .then(foundUser => {
            if (!foundUser) {

                return res.status(401).json({ message: "Benutzer existiert nicht." });
            }

            bcrypt.compare(password, foundUser.password)
                .then(result => {
                    if (!result) {

                        return res.status(401).json({ message: "Falsches Passwort." });
                    }

                    const accessToken = generateAccessToken({ id: foundUser.id, username: foundUser.username });
                    res.cookie("token", accessToken, { httpOnly: false });
                    res.json({ accessToken: accessToken });
                });
        })
        .catch(error => {
            console.error('Fehler beim Login:', error);
            res.status(500).json({ error: 'Interner Serverfehler' });
        });
}


const token = (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
}