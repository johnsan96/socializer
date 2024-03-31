const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const token = req.cookies.token;
    console.log(token)
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (user) {
            console.log("user is authentificated.")
        }
        req.user = user;

        console.log("req.user: " + req.user.name)


        next();
    } catch (err) {
        res.clearCookie("token");
        console.log("jwt not value anymore...")
        res.status(401).json({ error: 'JWT nicht mehr gültig' });

    }
}
