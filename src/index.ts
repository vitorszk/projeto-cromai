import express, { Express } from "express"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import { ApiController } from "./controller/ApiController"

dotenv.config()

const app: Express = express()
app.use(express.json())
app.use(cors())

const apiRouter = express.Router()
const apiController = new ApiController()

const upload = multer()

apiRouter.post("/upload", upload.single(""), apiController.upload)
apiRouter.post("/write-message-on-image", apiController.writeMessage)
apiRouter.get("/get-image", apiController)
apiRouter.get("/decode-message-from-image", apiController)

const PORT = process.env.PORT || 3003

app.listen(process.env.PORT || 3003, function(this: any){
   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
 });