"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const ApiController_1 = require("./controller/ApiController");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const apiRouter = express_1.default.Router();
const apiController = new ApiController_1.ApiController();
const storage = multer_1.default.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
apiRouter.post("/upload", upload.single('img'), apiController.upload);
apiRouter.post("/write-message-on-image", apiController.writeMessage);
apiRouter.get("/get-image", apiController.getImage);
apiRouter.get("/decode-message-from-image", apiController.decodeMessage);
const PORT = process.env.PORT || 3003;
app.listen(process.env.PORT || 3003, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
//# sourceMappingURL=index.js.map