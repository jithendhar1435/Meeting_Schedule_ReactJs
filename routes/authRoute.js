import express from 'express'
import { forgotpassword, login, register, test } from '../controllers/authcontroller.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

//router object
const router = express.Router()

//routing
router.post("/register",register)
router.post("/login",login)

router.get("/test",requireSignIn,test)
router.post("/forgot-password",forgotpassword)
router.get("/user-auth", requireSignIn, (req,res)=>{
    res.status(200).send({
        ok:true
    })
})
router.get("/admin-auth",requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({
        ok:true
    })
})
export default router