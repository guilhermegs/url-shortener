export class HttpRequest {
    body: any
    params: any

    constructor(body?: any, params?: any){
        this.body = body
        this.params = params
    }
}