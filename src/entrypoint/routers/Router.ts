export interface HttpRequest {
    body: any
}

export interface HttpResponse {
    statusCode: number
    body: any
}

export interface Router {
    route(httpRequest: HttpRequest): Promise<HttpResponse>
}