import { IdGeneratorService } from "../../../core/usecase/helper";
import { ShortenUrlUseCase } from "../../../core/usecase/ShortenUrlUseCase";
import { ShortenUrlRouter } from "../../../entrypoint/routers/ShortenUrlRouter";
import { UrlService } from "../../../provider/database";
import { Repository } from "../../database";

export class ShortenUrlRouterComposer {
    static compose(){
        const repository = new Repository()
        const urlService = new UrlService(repository)
        const idGeneratorService = new IdGeneratorService()
        const shortenUrlUseCase = new ShortenUrlUseCase(urlService, idGeneratorService)
        return new ShortenUrlRouter(shortenUrlUseCase)        
    }
}