import { IUseCase } from "../domain/base/IUseCase";
import { UrlEntity } from "../domain/entity/UrlEntity";
import { UrlService } from "./service/UrlService";
import { IdGeneratorService } from './service/IdGeneratorService'

export class ShortenUrlUseCase implements IUseCase<string, string> {

    constructor (
        private urlServicer: UrlService,
        private idGeneratorService: IdGeneratorService
    ) { }

    BASE_URL = "http://localhost:8081/"
    
    execute(originalUrl: string): string {
        const id = this.idGeneratorService.generate()
        const newUrl = this.BASE_URL + id

        const urlEntity = new UrlEntity(originalUrl, newUrl)
        this.urlServicer.insert(urlEntity)
        
        return urlEntity.newUrl
    }
}