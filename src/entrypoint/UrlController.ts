import { Request, Response } from 'express'
import { ShortenUrlUseCase } from "../core/usecase/ShortenUrlUseCase";
import { ShortenUrlRequest } from './models/ShortenUrlRequest';
import { ShortenUrlResponse } from './models/ShortenUrlResponse';

export class UrlController {
    
    constructor(
        private shortenUrlUseCase: ShortenUrlUseCase
    ) { }

    async shorten(shortenUrlRequest: ShortenUrlRequest) {
        const newUrl = await this.shortenUrlUseCase.execute(shortenUrlRequest.url)        
    }
}