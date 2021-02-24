import { UseCase } from "../domain/base/UseCase";
import { UrlService } from "./service/UrlService";

export class RedirectUrlUseCase implements UseCase<string, Promise<string | null>> {

    constructor (
        private urlService: UrlService        
    ) { }    
    
    async execute(newUrl: string): Promise<string | null> {        
        const existentUrl = await this.urlService.findByNewUrl(newUrl)

        if(existentUrl && existentUrl.validityEnd > this.getToday()){
            return existentUrl.originalUrl
        }

        return null
    }

    private getToday(): Date{
        const today = new Date()
        today.setHours(0,0,0,0)

        return today
    }
}