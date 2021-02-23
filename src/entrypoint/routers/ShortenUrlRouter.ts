import { ShortenUrlUseCase } from '../../core/usecase/ShortenUrlUseCase'
import { Router } from './Router'
import { HttpRequest, HttpResponse } from '../helpers'

export class ShortenUrlRouter implements Router {
    
    constructor(
        private shortenUrlUseCase: ShortenUrlUseCase
    ) { }

    async route(httpRequest: HttpRequest): Promise<HttpResponse> {
        const originalUrl = httpRequest.body.url

        if(!originalUrl){
            return HttpResponse.badRequest(new Error('O campo url é obrigatório.'))
        }

        const newUrl = await this.shortenUrlUseCase.execute(originalUrl)
        return HttpResponse.ok({newUrl});
    }
}