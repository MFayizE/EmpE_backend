const express = require('express')
const multer = require('multer');

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Set the destination folder for storing the uploaded file
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()); // Set the filename of the uploaded file
    }
  });
  
  // Multer file filter
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept the file if it has an image MIME type
    } else {
      cb(new Error('Only image files are allowed.'), false); // Reject the file if it doesn't have an image MIME type
    }
  };
  
  // Multer upload instance
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });
  
const{RegisterUser,LoginUser, getMe} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.post('/register',upload.single('profileImage'), RegisterUser)
router.post('/login', LoginUser)
router.get('/me',protect, getMe)


module.exports = router