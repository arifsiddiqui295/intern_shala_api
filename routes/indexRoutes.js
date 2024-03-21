const express = require('express');
const { homepage, studentSignup,studentSignin,studentSignout } = require('../controllers/indexController');
const router = express.Router();
router.get('/',homepage )

//POST // Student SIGNUP
router.post('/student/signup',  studentSignup);

//POST // Student SIGNIN
router.post('/student/signin',studentSignin);

//GET // Student SIGNOUT
router.get('/student/signin',  studentSignout);
module.exports = router