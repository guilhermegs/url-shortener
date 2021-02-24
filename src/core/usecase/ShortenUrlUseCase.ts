import { UseCase } from "../domain/base/UseCase";
import { UrlEntity } from "../domain/entity/UrlEntity";
import { UrlService } from "./service/UrlService";
import { IdGeneratorService } from './service/IdGeneratorService'
import { ValidityEndGeneratorService } from './service/ValidityEndGeneratorService'

export class ShortenUrlUseCase implements UseCase<string, Promise<string>> {

    constructor (
        private urlService: UrlService,
        private idGeneratorService: IdGeneratorService,
        private validityEndGeneratorService: ValidityEndGeneratorService
    ) { }

    BASE_URL = "http://localhost:8081/"
    
    async execute(originalUrl: string): Promise<string> {        
        const existentUrl = await this.urlService.findByOriginalUrl(originalUrl)

        if(existentUrl) {
            if(existentUrl.validityEnd > this.getToday()){
                return existentUrl.newUrl
            } else {
                await this.urlService.deleteByOriginalUrl(originalUrl)        
            }    
        }

        const newUrl = this.idGeneratorService.generate()
        const validityEnd = this.validityEndGeneratorService.generate()

        const urlEntity = new UrlEntity(originalUrl, newUrl, validityEnd)
        
        await this.urlService.insert(urlEntity)
        
        return this.BASE_URL + urlEntity.newUrl
    }

    private getToday(): Date{
        const today = new Date()
        today.setHours(0,0,0,0)

        return today
    }
}