import { Request, Response } from "express"
import { ApiBusiness } from "../business/ApiBusiness"
import { FileInputDTO, GetFileDTO } from "../model/File";

export class ApiController {
    async upload(req: Request, res: Response) {
        try {
            const input: GetFileDTO = {
                name: req.file!.originalname
            }

            const apiBusiness = new ApiBusiness();
            const result = await apiBusiness.upload(input)

            res.status(200).send({ message: "Image uploaded!", result, input })
        } catch (err: unknown) {
            if (err instanceof Error)
                return res.status(400).send(err.message)
        }
    }

    async writeMessage(req: Request, res: Response) {
        try {
            const input: FileInputDTO = {
                path: req.body.path
            }

            const apiBusiness = new ApiBusiness();
            const result = await apiBusiness.writeMessage(input)

            res.status(200).send({ message: "File 'new-img.bmp' saved at your local temporary folder!", result })
        } catch (err: unknown) {
            if (err instanceof Error)
                return res.status(400).send(err.message)
        }
    }

    async decodeMessage(req: Request, res: Response) {
        try {
            const input: GetFileDTO = {
                name: req.body.originalname
            }

            const apiBusiness = new ApiBusiness()
            const result = await apiBusiness.decodeMessage(input)

            res.status(200).send({ message: "Message decoded: ", result })
        } catch (err: unknown) {
            if (err instanceof Error)
                return res.status(400).send(err.message)
        }
    }

    async getImage(req: Request, res: Response) {
        try {
            const input: GetFileDTO = {
                name: req.query.name as string
            }

            const apiBusiness = new ApiBusiness()
            const result = await apiBusiness.getImage(input)

            res.status(200).sendFile(`${result}`)
        } catch (error) {
            let errorMessage = "Error downloading the image";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
        }
    }
}