export class HttpResponse {
    statusCode: number
    body: any
    redirectTo?: string

    constructor(statusCode: number, body: any, redirectTo?: string){
        this.statusCode = statusCode
        this.body = body
        this.redirectTo = redirectTo
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

    static redirect(redirectTo: string) {
        return new HttpResponse(301, null, redirectTo)
    }
}