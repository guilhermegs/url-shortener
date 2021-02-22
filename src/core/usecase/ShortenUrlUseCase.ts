import { IUseCase } from "../domain/base/IUseCase";
import { UrlEntity } from "../domain/entity/UrlEntity";
import { UrlService } from "./service/UrlService";
import { UrlShortenerService } from './service/UrlShortenerService'

export class ShortenUrlUseCase implements IUseCase<string, string> {

    constructor (
        private urlShortenerService: UrlShortenerService,
        private urlServicer: UrlService
    ) { }
    
    execute(originalUrl: string): string {
        const newUrl = this.urlShortenerService.shorten(originalUrl)

        const urlEntity = new UrlEntity(originalUrl, newUrl);

        this.urlServicer.insert(urlEntity)
        return ""
    }
}