
const express = require("express")

const loginController = require("../controllers/loginController")
const loginRouter = express.Router()

loginRouter.route("/login")
    .post(loginController.login);

/* app.delete('/logout', (req, res) => {
refreshTokens = refreshTokens.filter(token => token !== req.body.token)
res.sendStatus(204)
}) */

module.exports = loginRouter

