const express = require('express')
const {signUpTempUser,getTempUsers,deleteTempUser,addTempUser} = require('../controllers/tempUserController')
const router = express.Router()



//signup route
router.post('/signup',signUpTempUser)

//get/view users
router.post('/view',getTempUsers)

router.post('/delete',deleteTempUser)

router.post('/add',addTempUser)


module.exports = router