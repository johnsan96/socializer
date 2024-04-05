const express = require("express")

const friendController = require("../controllers/friendshipController")
const friendRouter = express.Router()

const isAuth = require("../middleware/isAuth")

friendRouter.route("/friendships")
    .post(isAuth, friendController.post)
    .get(isAuth, friendController.getFriendsFromUser)


module.exports = friendRouter

