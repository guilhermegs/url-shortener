import { Request, Response } from 'express' 
import { HttpResponse,HttpRequest } from '../../../entrypoint/helpers'
import { Router } from '../../../entrypoint/routers/Router'

export class ExpressControllerAdapter {
    static adapt (controller: Router) {
      return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = new HttpRequest(req.body, req.params)
        const httpResponse: HttpResponse = await controller.route(httpRequest)

        if(httpResponse.statusCode == 301){
          res.redirect(httpResponse.redirectTo)          
        } else {
          res.status(httpResponse.statusCode).json(httpResponse.body)
        }              
      }
    }
  }