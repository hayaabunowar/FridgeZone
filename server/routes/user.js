const express = require('express')
const { loginUser,signUpUser,viewUsers,changePass,deleteUser,changeRole} = require('../controllers/userController')
const router = express.Router()

//login route
router.post('/login',loginUser)

//view users in store
router.post('/view',viewUsers)

router.patch('/changepassword',changePass)

//change users role/title
router.patch('/changerole',changeRole)
//signup route
router.post('/signup',signUpUser)
router.get('/signup', async(req,res)=>{
})

//delete user

router.post('/delete',deleteUser)


module.exports = router