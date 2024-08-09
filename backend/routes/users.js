var express = require('express');
var userRouter = express.Router();
var userController = require('../controllers/userController')

userRouter.route('/users')
    .post(userController.post)

// Route zum Abrufen eines einzelnen Benutzers
userRouter.route('/user/:id').get(userController.getUser);

module.exports = userRouter;

/* const express = require("express")   

const postController = require("../controllers/postController")
const postRouter = express.Router()

const isAuth = require("../middleware/isAuth")

postRouter.route("/posts")
    .post(isAuth, postController.post)
    .get(isAuth, postController.getAllPosts)


module.exports = postRouter */
