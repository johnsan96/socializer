
const express = require("express")

const imageController = require("../controllers/imageController")
const imageRouter = express.Router()

const isAuth = require("../middleware/isAuth")

const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
     
     cb(null, file.originalname)
        //path.extname get the uploaded file extension
    }
  });
  const multerFilter = (req, file, cb) => {
     
          if (!file.originalname.match(/\.(png|jpg)$/)) { 
               // upload only png and jpg format
             return cb(new Error('Please upload a Image'))
           }
         cb(null, true)
      
  };
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
  });
  

imageRouter.route("/image")
    .post(upload.single('image'), imageController.post);

module.exports = imageRouter

