import { mock } from 'jest-mock-extended'
import { ShortenUrlUseCase } from '../core/usecase/ShortenUrlUseCase'
import { ShortenUrlRouter } from './ShortenUrlRouter'
import { HttpRequest, HttpResponse } from './Router'

const makeSut = (newUrl: string) => {
    const mockShortenUrlUseCase = mock<ShortenUrlUseCase>()
    mockShortenUrlUseCase.execute.mockResolvedValue(newUrl)

    const sut = new ShortenUrlRouter(mockShortenUrlUseCase)

    return {
        mockShortenUrlUseCase,
        sut
    }
}

describe('UrlController', () => {

    it('should call ShortenUrlUseCase with the originalUrl received in the body', async (): Promise<void> => {
        const { mockShortenUrlUseCase, sut } = makeSut("http://new-url.com")
        const url = "http://any-url.com"

        const httpRequest: HttpRequest = {body: {url}}
        await sut.route(httpRequest)
        expect(mockShortenUrlUseCase.execute).toBeCalledWith(url)
    })

    it('should return a new url in the body and status 200', async (): Promise<void> => {
        const newUrl = "http://new-url.com"
        const { sut } = makeSut(newUrl)
        const url = "http://any-url.com"

        const httpRequest: HttpRequest = {body: url}

        const response: HttpResponse = await sut.route(httpRequest)

        console.log(response)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({newUrl})
    })
})