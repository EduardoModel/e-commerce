import express from "express"
import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import { getToken, authenticate, isAdmin } from "../util";

const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, `uploads/`)
    },
    filename(req, file, callback){
        callback(null, `${uuidv4()}.jpg`)
    }
})

const upload = multer({ storage })

const router = express.Router()

// To accept only one image as upload
router.post('/', upload.single('image'), (req, res) => {
    // After the file was uploaded, send the path to it back to the front-end
    return res.send(`/${req.file.path}`)
})

export default router