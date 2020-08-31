import mongoose from "mongoose"

// Defines what will be saved from the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
})

// The name of the collection to be saved into the db, following the passed schema
const userModel = mongoose.model("User", userSchema)

export default userModel