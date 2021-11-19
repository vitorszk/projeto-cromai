"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const ApiBusiness_1 = require("../business/ApiBusiness");
class ApiController {
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    name: req.file.originalname
                };
                const apiBusiness = new ApiBusiness_1.ApiBusiness();
                const result = yield apiBusiness.upload(input);
                res.status(200).send({ message: "Image uploaded!", result, input });
            }
            catch (err) {
                if (err instanceof Error)
                    return res.status(400).send(err.message);
            }
        });
    }
    writeMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    path: req.file.path
                };
                const apiBusiness = new ApiBusiness_1.ApiBusiness();
                const result = yield apiBusiness.writeMessage(input);
                res.status(200).send({ message: "Message written!", result });
            }
            catch (err) {
                if (err instanceof Error)
                    return res.status(400).send(err.message);
            }
        });
    }
    decodeMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    name: req.file.originalname
                };
                const apiBusiness = new ApiBusiness_1.ApiBusiness();
                const result = yield apiBusiness.decodeMessage(input);
                res.status(200).send({ message: "Message decoded: ", result });
            }
            catch (err) {
                if (err instanceof Error)
                    return res.status(400).send(err.message);
            }
        });
    }
    getImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    name: req.query.name
                };
                const apiBusiness = new ApiBusiness_1.ApiBusiness();
                const result = yield apiBusiness.getImage(input);
                res.status(200).download(`${result}`);
            }
            catch (error) {
                let errorMessage = "Error downloading the image";
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
            }
        });
    }
}
exports.ApiController = ApiController;
//# sourceMappingURL=ApiController.js.map