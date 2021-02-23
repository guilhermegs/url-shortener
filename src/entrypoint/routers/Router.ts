import { HttpResponse} from '../helpers/HttpResponse'

export interface HttpRequest {
    body: any
}
export interface Router {
    route(httpRequest: HttpRequest): Promise<HttpResponse>
}