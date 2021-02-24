import { UseCase } from "../domain/base/UseCase";
import { UrlEntity } from "../domain/entity/UrlEntity";
import { UrlService } from "./service/UrlService";
import { IdGeneratorService } from './service/IdGeneratorService'
import { ValidityEndGeneratorService } from './service/ValidityEndGeneratorService'

export class ShortenUrlUseCase implements UseCase<string, Promise<string>> {

    constructor (
        private urlServicer: UrlService,
        private idGeneratorService: IdGeneratorService,
        private validityEndGeneratorService: ValidityEndGeneratorService
    ) { }

    BASE_URL = "http://localhost:8081/"
    
    async execute(originalUrl: string): Promise<string> {        
        const newUrl = this.BASE_URL + this.idGeneratorService.generate()
        const validityEnd = this.validityEndGeneratorService.generate()

        const urlEntity = new UrlEntity(originalUrl, newUrl, validityEnd)
        await this.urlServicer.insert(urlEntity)
        
        return urlEntity.newUrl
    }
}