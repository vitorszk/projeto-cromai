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
exports.ApiBusiness = void 0;
const binToStr_1 = require("../utils/binToStr");
const bytesToInt_1 = require("../utils/bytesToInt");
class ApiBusiness {
    upload(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.name) {
                throw new Error("Image was not uploaded!");
            }
        });
    }
    writeMessage(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Transform } = require('stream');
            const fs = require('fs');
            const file = input;
            const outputFile = 'result-output.bmp';
            const readStream = fs.createReadStream(file);
            const writeStream = fs.createWriteStream(outputFile);
            const hideMessage = (message) => new Transform({
                transform: function (chunk, encoding, callback) {
                    if (!this.offset) {
                        this.offset = 0;
                    }
                    if (this.offset === 0) {
                        const id = (String.fromCharCode(chunk[0], chunk[1]));
                        if (id !== 'BM') {
                            throw new Error("Image is not a Bitmap file");
                        }
                        //a partir do décimo byte que conseguimos ler os dados do arquivo.
                        const dataOffset = (0, bytesToInt_1.bytesToInt)([
                            chunk[10],
                            chunk[11],
                            chunk[12],
                            chunk[13]
                        ]);
                        //somar os bits para esconder a mensagem
                        message.split('').forEach(bit => {
                            chunk[this.dataOffset] += parseInt(bit);
                            this.dataOffset++;
                        });
                        const bitmapSize = (0, bytesToInt_1.bytesToInt)([
                            chunk[2],
                            chunk[3],
                            chunk[4],
                            chunk[5]
                        ]);
                        const usableBytes = bitmapSize - dataOffset;
                    }
                    this.push(chunk);
                    this.offset += chunk.length;
                    callback();
                }
            });
            readStream.pipe(hideMessage('01000001').pipe(writeStream));
        });
    }
    decodeMessage(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Transform } = require('stream');
            const fs = require('fs');
            const readStream = fs.createReadStream(input);
            const showMessage = () => new Transform({
                transform: function (chunk, encoding, callback) {
                    if (!this.offset) {
                        this.offset = 0;
                    }
                    if (this.offset === 0) {
                        const id = (String.fromCharCode(chunk[0], chunk[1]));
                        if (id !== 'BM') {
                            throw new Error("Image is not a Bitmap file");
                        }
                        const dataOffset = (0, bytesToInt_1.bytesToInt)([
                            chunk[10],
                            chunk[11],
                            chunk[12],
                            chunk[13]
                        ]);
                        let message = '01000001';
                        for (let i = dataOffset; i < chunk.length; i++) {
                            message += chunk[i] % 2;
                        }
                        (0, binToStr_1.binToStr)(message);
                    }
                    this.offset += chunk.length;
                    callback();
                }
            });
            readStream.pipe(showMessage());
        });
    }
    getImage(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.name) {
                throw new Error("Image not found");
            }
            return input;
        });
    }
}
exports.ApiBusiness = ApiBusiness;
//# sourceMappingURL=ApiBusiness.js.map