import { FileInputDTO } from "../model/File";


export class ApiBusiness {
    async upload(input: FileInputDTO) {
        if (!input.name) {
            throw new Error("Image was not uploaded!")
        }      
    }
}