import express from "express"
import multer from "multer"
import { ApiController } from "../controller/ApiController"


export const apiRouter = express.Router()
const apiController = new ApiController()

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })

apiRouter.post("/upload", upload.single('img'), apiController.upload)
apiRouter.post("/write-message-on-image", apiController.writeMessage)
apiRouter.get("/get-image", apiController.getImage)
apiRouter.get("/decode-message-from-image", apiController.decodeMessage)