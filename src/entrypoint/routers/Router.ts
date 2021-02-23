import { HttpResponse} from '../helpers/HttpResponse'
import { HttpRequest } from '../helpers/HttpRequest'

export interface Router {
    route(httpRequest: HttpRequest): Promise<HttpResponse>
}