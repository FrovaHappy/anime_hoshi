import { type NextFunction, type Request, type Response } from 'express'
import { type AnyZodObject, ZodError } from 'zod'
import { type JsonResponse } from '../../../types'

export function validators(obj: AnyZodObject) {
  return (req: Request, res: Response<JsonResponse>, next: NextFunction) => {
    try {
      obj.parse({
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers
      })
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ code: 400, contents: error.issues, message: 'schema incorrect...' })
      }
      return res.status(500).json({ code: 500, contents: null, message: ' server error' })
    }
  }
}
