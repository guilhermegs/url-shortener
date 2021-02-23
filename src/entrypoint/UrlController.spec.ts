import { mock } from 'jest-mock-extended'
import { ShortenUrlUseCase } from '../core/usecase/ShortenUrlUseCase'
import { ShortenUrlRequest } from './models/ShortenUrlRequest'
import { UrlController } from './UrlController'

const makeSut = (newUrl: string) => {
    const mockShortenUrlUseCase = mock<ShortenUrlUseCase>()
    mockShortenUrlUseCase.execute.mockResolvedValue(newUrl)

    const sut = new UrlController(mockShortenUrlUseCase)

    return {
        mockShortenUrlUseCase,
        sut
    }
}

describe('UrlController', () => {

    it('should call ShortenUrlUseCase with the originalUrl received in the body', async (): Promise<void> => {
        const { mockShortenUrlUseCase, sut } = makeSut("http://new-url.com")
        const url = "http://any-url.com"

        const shortenUrlRequest = new ShortenUrlRequest(url)

        await sut.shorten(shortenUrlRequest)
        expect(mockShortenUrlUseCase.execute).toBeCalledWith(url)
    })
})