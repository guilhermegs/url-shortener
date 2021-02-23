import { ShortenUrlUseCase } from '../../core/usecase/ShortenUrlUseCase'
import { HttpRequest, Router } from './Router'
import { HttpResponse } from '../helpers/HttpResponse'

export class ShortenUrlRouter implements Router {
    
    constructor(
        private shortenUrlUseCase: ShortenUrlUseCase
    ) { }

    async route(httpRequest: HttpRequest): Promise<HttpResponse> {
        const originalUrl = httpRequest.body.url

        const newUrl = await this.shortenUrlUseCase.execute(originalUrl)
        return HttpResponse.ok({newUrl});
    }
}