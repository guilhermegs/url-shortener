import { RedirectUrlUseCase } from '../../core/usecase/RedirectUrlUseCase'
import { Router } from './Router'
import { HttpRequest, HttpResponse } from '../helpers'

export class RedirectUrlRouter implements Router {
    
    constructor(
        private redirectUrlUseCase: RedirectUrlUseCase
    ) { }

    async route(httpRequest: HttpRequest): Promise<HttpResponse> {
        const newUrl = httpRequest.params.newUrl

        try {
            const originalUrl = await this.redirectUrlUseCase.execute(newUrl)    

            if(originalUrl){
                return HttpResponse.redirect(originalUrl)
            }
            
            return HttpResponse.notFound(new Error('URL não encontrada.'))
        } catch(err) {
            console.error(err)
            return HttpResponse.serverError(new Error('Erro interno.'))
        }    
    }
}