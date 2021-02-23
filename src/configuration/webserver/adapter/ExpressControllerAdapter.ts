import { Request, Response } from 'express' 
import { HttpResponse,HttpRequest } from '../../../entrypoint/helpers'
import { Router } from '../../../entrypoint/routers/Router'

export class ExpressControllerAdapter {
    static adapt (controller: Router) {
      return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
          body: req.body
        }
        const httpResponse: HttpResponse = await controller.route(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    }
  }