import { IUseCase } from "../domain/base/IUseCase";
import { UrlShortenerService } from './service/UrlShortenerService'

export class ShortenUrlUseCase implements IUseCase<String, String> {

    constructor (
        private urlShortenerService: UrlShortenerService
    ) { }

    
    execute(originalUrl: String): String {
        this.urlShortenerService.shorten(originalUrl)
        return ""
    }
}