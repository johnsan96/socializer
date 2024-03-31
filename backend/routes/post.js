
const express = require("express")

const postController = require("../controllers/postController")
const postRouter = express.Router()

const isAuth = require("../middleware/isAuth")

postRouter.route("/posts")
    .post(isAuth, postController.post)
    .get(isAuth, postController.getAllPosts)


module.exports = postRouter

