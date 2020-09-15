import express from "express"
import multer from "multer"
import multerS3 from "multer-s3"
import aws from "aws-sdk"

import { v4 as uuidv4 } from "uuid"
import { getToken, authenticate, isAdmin } from "../util";

import config from './../config'

aws.config.update({
    accessKeyId: config.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_S3_SECRET_ACCESS_KEY
})

const s3 = new aws.S3()

const storageS3 = multerS3({
    s3,
    bucket: config.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, callback){
        callback(null, `${uuidv4()}.jpg`)
    }
})

const uploadS3 = multer({ storage: storageS3 })

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
router.post('/', authenticate, isAdmin, upload.single('image'), (req, res) => {
    // After the file was uploaded, send the path to it back to the front-end
    return res.send(`/${req.file.path}`)
})

router.post('/s3', authenticate, isAdmin, uploadS3.single('image'), (req, res) => {
    return res.send(req.file.location)
})

export default router