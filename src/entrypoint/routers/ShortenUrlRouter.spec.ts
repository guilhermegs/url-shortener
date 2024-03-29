import { mock } from 'jest-mock-extended'
import { ShortenUrlUseCase } from '../../core/usecase/ShortenUrlUseCase'
import { ShortenUrlRouter } from './ShortenUrlRouter'
import { HttpRequest, HttpResponse } from '../helpers'

const makeSut = (newUrl: string) => {
    const mockShortenUrlUseCase = mock<ShortenUrlUseCase>()
    mockShortenUrlUseCase.execute.mockResolvedValue(newUrl)

    const sut = new ShortenUrlRouter(mockShortenUrlUseCase)

    return {
        mockShortenUrlUseCase,
        sut
    }
}

describe('ShortenUrlRouter', () => {

    it('should call ShortenUrlUseCase with the originalUrl received in the body', async (): Promise<void> => {
        const { mockShortenUrlUseCase, sut } = makeSut("http://new-url.com")
        const url = "http://any-url.com"

        const httpRequest = new HttpRequest({url})
        await sut.route(httpRequest)
        expect(mockShortenUrlUseCase.execute).toBeCalledWith(url)
    })

    it('should return a new url in the body and status 200', async (): Promise<void> => {
        const newUrl = "http://new-url.com"
        const { sut } = makeSut(newUrl)
        const url = "http://any-url.com"

        const httpRequest = new HttpRequest({url})

        const response: HttpResponse = await sut.route(httpRequest)
        
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({newUrl})
    })

    it('should return an error 400 if url is not provided', async (): Promise<void> => {
        const newUrl = "http://new-url.com"
        const { sut } = makeSut(newUrl)        

        const httpRequest = new HttpRequest({})

        const response: HttpResponse = await sut.route(httpRequest)
        
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ error: 'O campo url é obrigatório.' })
    })

    it('should return an error 500 if ShortenUrlUseCase throws', async (): Promise<void> => {
        const newUrl = "http://new-url.com"
        const url = "http://any-url.com"

        const { sut, mockShortenUrlUseCase } = makeSut(newUrl)
        mockShortenUrlUseCase.execute.mockImplementation(() => {
            throw new Error()
        })

        const httpRequest = new HttpRequest({url})

        const response: HttpResponse = await sut.route(httpRequest)
        
        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual({ error: 'Erro interno.' })
    })
})