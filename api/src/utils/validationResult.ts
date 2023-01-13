import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

const validateResult = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw()
    next()
  } catch (errs: any) {
    res.status(403).send({ errors: errs.array() })
  }
}

export default validateResult
