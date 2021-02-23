import { UseCase } from "../domain/base/UseCase";
import { UrlEntity } from "../domain/entity/UrlEntity";
import { UrlService } from "./service/UrlService";
import { IdGeneratorService } from './service/IdGeneratorService'

export class ShortenUrlUseCase implements UseCase<string, Promise<string>> {

    constructor (
        private urlServicer: UrlService,
        private idGeneratorService: IdGeneratorService
    ) { }

    BASE_URL = "http://localhost:8081/"
    
    async execute(originalUrl: string): Promise<string> {
        const id = this.idGeneratorService.generate()
        const newUrl = this.BASE_URL + id

        const urlEntity = new UrlEntity(originalUrl, newUrl)
        await this.urlServicer.insert(urlEntity)
        
        return urlEntity.newUrl
    }
}