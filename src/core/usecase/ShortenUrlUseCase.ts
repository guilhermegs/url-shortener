import { IUseCase } from "../domain/base/IUseCase";
import { UrlEntity } from "../domain/entity/UrlEntity";
import { UrlService } from "./service/UrlService";
import { IdGeneratorService } from './service/IdGeneratorService'

export class ShortenUrlUseCase implements IUseCase<string, string> {

    constructor (
        private urlServicer: UrlService,
        private idGeneratorService: IdGeneratorService
    ) { }
    
    execute(originalUrl: string): string {
        const newUrl = this.idGeneratorService.generate()

        const urlEntity = new UrlEntity(originalUrl, newUrl)
        this.urlServicer.insert(urlEntity)
        
        return urlEntity.newUrl
    }
}