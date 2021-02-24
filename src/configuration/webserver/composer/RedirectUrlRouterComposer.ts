import { RedirectUrlUseCase } from "../../../core/usecase/RedirectUrlUseCase";
import { RedirectUrlRouter } from "../../../entrypoint/routers/RedirectUrlRouter";
import { UrlService } from "../../../provider/database";
import { Repository } from "../../database";

export class RedirectUrlRouterComposer {
    static compose(){
        const repository = new Repository()
        const urlService = new UrlService(repository)        
        const redirectUrlUseCase = new RedirectUrlUseCase(urlService)
        return new RedirectUrlRouter(redirectUrlUseCase)        
    }
}