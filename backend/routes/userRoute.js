import express from "express"
import User from '../models/userModel'
import { getToken, authenticate } from "../util";

const router = express.Router()

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    console.log(signinUser)
    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser) // ???
        })
    }
    else{
        res.status(401).send({
            message: "Invalid email or password!"
        })
    }
})

router.put('/:id', authenticate, async (req, res) => {
    const userId = req.params.id

    const user = await User.findById(userId)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password

        const updatedUser = await user.save()

        return res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: getToken(updatedUser)
        })
    }
    else{
        res.status(401).send({
            error: "User not found!"
        })
    }
})


router.post('/register', async (req, res) => {
    try{
        // Verify if the password isn't the same as the repeat of the password
        if(req.body.password !== req.body.rePassword){
            throw "Passwords aren't equal!"
        }
        // Define a new user to be saved into the databse
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false
        })

        // Save it inside the db
        const newUser = await user.save()
        if(newUser){
            res.send({
                _id: newUser._id,
                name: newUser.name,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        }
        else{
            throw "Invalid user data!"
        }
    }
    catch(error){
        res.send({message: error.message})
    }
})

// Here is only the specific route for the user collection
router.get('/createadmin', async (req, res) => {
    try{
        // Define a new user to be saved into the databse
        const user = new User({
            name: "Eduardo",
            email: "edu_model@hotmail.com",
            password: "123456789",
            isAdmin: true
        })

        // Save it inside the db
        const newUser = await user.save()

        res.send(user)
    }
    catch(error){
        res.send({message: error.message})
    }
})

export default router