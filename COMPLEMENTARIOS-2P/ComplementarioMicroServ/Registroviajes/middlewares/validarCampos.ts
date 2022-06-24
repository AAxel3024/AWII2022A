import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
// import {} from 'express'
const validarCampos = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        res.status(400).json(errors)
    }
    next()
}
export { validarCampos }