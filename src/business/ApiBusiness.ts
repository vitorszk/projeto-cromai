import { FileInputDTO, GetFileDTO } from "../model/File";
import { binToStr } from "../utils/binToStr";
import { bytesToInt } from "../utils/bytesToInt";
import os from 'os'

export class ApiBusiness {
    async upload(input: GetFileDTO) {
        if (!input.name) {
            throw new Error("Image was not uploaded!")
        }
    }

    async writeMessage(input: FileInputDTO) {
        const { Transform } = require('stream')
        const fs = require('fs')
        const { path } = input
        const outputFile = 'result-output.bmp'
        const readStream = fs.createReadStream(path)
        const writeStream = fs.createWriteStream(outputFile)

        const hideMessage = (message: string) => new Transform({
            transform: function (chunk: any, encoding: any, callback: () => void) {
                if (!this.offset) {
                    this.offset = 0
                }

                if (this.offset === 0) {
                    const id = (String.fromCharCode(chunk[0], chunk[1]))
                    if (id !== 'BM') {
                        throw new Error("Image is not a Bitmap file")
                    }
                    //a partir do décimo byte que conseguimos ler os dados do arquivo.
                    const dataOffset = bytesToInt([
                        chunk[10],
                        chunk[11],
                        chunk[12],
                        chunk[13]
                    ])

                    //somar os bits para esconder a mensagem
                    message.split('').forEach(bit => {
                        chunk[this.dataOffset] += parseInt(bit)
                        this.dataOffset++
                    })

                    const bitmapSize = bytesToInt([
                        chunk[2],
                        chunk[3],
                        chunk[4],
                        chunk[5]
                    ])

                    const usableBytes = bitmapSize - dataOffset
                }

                this.push(chunk)
                this.offset += chunk.length
                callback()
            }
        })
        const newPath = os.tmpdir() + "/teste5.bmp"
        console.log(hideMessage('01000001'))

        fs.writeFile(newPath, Buffer.from(readStream.pipe(hideMessage('01000001').pipe(writeStream)).toString(), 'base64').toString(),'base64', function(err: any) {
            if(err) {
                return console.log(err);
            }
        }); 

    }

    async decodeMessage(input: GetFileDTO) {
        const { Transform } = require('stream')
        const fs = require('fs')
        const readStream = fs.createReadStream(input)

        const showMessage = () => new Transform({
            transform: function (chunk: any, encoding: any, callback: () => void) {
                if (!this.offset) {
                    this.offset = 0
                }

                if (this.offset === 0) {
                    const id = (String.fromCharCode(chunk[0], chunk[1]))
                    if (id !== 'BM') {
                        throw new Error("Image is not a Bitmap file")
                    }

                    const dataOffset = bytesToInt([
                        chunk[10],
                        chunk[11],
                        chunk[12],
                        chunk[13]
                    ])

                    let message = '01000001'

                    for (let i = dataOffset; i < chunk.length; i++) {
                        message += chunk[i] % 2
                    }

                    binToStr(message)
                }
                this.offset += chunk.length
                callback()
            }
        })
        return readStream.pipe(showMessage())
    }

    async getImage(input: GetFileDTO) {
        if (!input.name) {
            throw new Error("Image not found")
        }
    }
}