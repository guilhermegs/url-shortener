import { mock } from 'jest-mock-extended'
import { RedirectUrlUseCase } from '../../core/usecase/RedirectUrlUseCase'
import { RedirectUrlRouter } from './RedirectUrlRouter'
import { HttpRequest, HttpResponse } from '../helpers'

const makeSut = (originalUrl?: string) => {
    const mockRedirectUrlUseCase = mock<RedirectUrlUseCase>()

    if(originalUrl){
        mockRedirectUrlUseCase.execute.mockResolvedValue(originalUrl)
    }        

    const sut = new RedirectUrlRouter(mockRedirectUrlUseCase)

    return {
        mockRedirectUrlUseCase,
        sut
    }
}

describe('RedirectUrlRouter', () => {

    it('should call RedirectUrlUseCase with the newUrl received', async (): Promise<void> => {
        const { mockRedirectUrlUseCase, sut } = makeSut("http://original-url.com")
        const newUrl = "http://any-url.com"

        const httpRequest = new HttpRequest(null, {newUrl})
        await sut.route(httpRequest)
        expect(mockRedirectUrlUseCase.execute).toBeCalledWith(newUrl)
    })

    it('should return redirect to the original url with code 301', async (): Promise<void> => {
        const originalUrl = "http://original-url.com"
        const { sut } = makeSut(originalUrl)
        const newUrl = "http://any-url.com"

        const httpRequest = new HttpRequest(null, {newUrl})

        const response: HttpResponse = await sut.route(httpRequest)
        
        expect(response.statusCode).toBe(301)
        expect(response.redirectTo).toBe(originalUrl)
    })    

    it('should return an error 500 if RedirectUrlUseCase throws', async (): Promise<void> => {
        const originalUrl = "http://original-url.com"
        const newUrl = "http://any-url.com"

        const { sut, mockRedirectUrlUseCase } = makeSut(originalUrl)
        mockRedirectUrlUseCase.execute.mockImplementation(() => {
            throw new Error()
        })

        const httpRequest = new HttpRequest(null, {newUrl})

        const response: HttpResponse = await sut.route(httpRequest)
        
        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual({ error: 'Erro interno.' })
    })

    it('should return an error 404 if originalUrl not found', async (): Promise<void> => {        
        const { sut } = makeSut()        

        const newUrl = "http://any-url.com"
        const httpRequest = new HttpRequest(null, {newUrl})

        const response: HttpResponse = await sut.route(httpRequest)
        
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ error: 'URL não encontrada.' })
    })
})