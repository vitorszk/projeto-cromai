import { Request, Response } from "express"
import { ApiBusiness } from "../business/ApiBusiness"
import { FileInputDTO } from "../model/File";

export class ApiController {
    async upload(req: Request, res: Response) {
        try {
            const input: FileInputDTO = {
                name: req.file?.originalname
            }

            const apiBusiness = new ApiBusiness();
            const result = await apiBusiness.upload(input)

            res.status(200).send({message: "Image uploaded!", result, input})
        } catch (err: unknown) {
            if (err instanceof Error) 
                return res.status(400).send(err.message)
        }
    }
}