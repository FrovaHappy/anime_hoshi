import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import { JsonResponse } from '../../../types'

export function validators(obj: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      obj.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      })
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ code: 400, contents: error.issues, message: 'schema incorrect...' } as JsonResponse)
      }
      return res.status(500).json({ code: 500, contents: null, message: ' server error' } as JsonResponse)
    }
  }
}
