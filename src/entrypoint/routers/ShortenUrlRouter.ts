import { ShortenUrlUseCase } from "../../core/usecase/ShortenUrlUseCase"
import { HttpRequest, HttpResponse, Router } from './Router'

export class ShortenUrlRouter implements Router {
    
    constructor(
        private shortenUrlUseCase: ShortenUrlUseCase
    ) { }

    async route(httpRequest: HttpRequest): Promise<HttpResponse> {
        const originalUrl = httpRequest.body.url

        const newUrl = await this.shortenUrlUseCase.execute(originalUrl)
        return {statusCode: 200, body: {newUrl}}
    }
}