import { FileInputDTO } from "../model/File";
import { bytesToInt } from "../utils/bytesToInt";


export class ApiBusiness {
    async upload(input: FileInputDTO) {
        if (!input.name) {
            throw new Error("Image was not uploaded!")
        }
    }

    async writeMessage(input: FileInputDTO) {
        const { Transform } = require('stream')
        const fs = require('fs')
        const file = input
        const outputFile = 'result-output.bmp'
        const readStream = fs.createReadStream(file)
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
        readStream.pipe(hideMessage('01000001').pipe(writeStream))
    }
}