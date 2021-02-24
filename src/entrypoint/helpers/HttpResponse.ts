export class HttpResponse {
    statusCode: number
    body: any

    constructor(statusCode: number, body: any){
        this.statusCode = statusCode
        this.body = body
    }

    static ok(body: any): HttpResponse{
        return new HttpResponse(200, body)
    }

    static badRequest(error: Error) {
        return new HttpResponse(400, {error: error.message})
    }

    static serverError(error: Error) {
        return new HttpResponse(500, {error: error.message})
    }
}