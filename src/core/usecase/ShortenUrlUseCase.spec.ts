import { mock } from 'jest-mock-extended'
import { ShortenUrlUseCase } from './ShortenUrlUseCase'
import { UrlShortenerService } from './service/UrlShortenerService'

describe('ShortenUrlUseCase', () => {
    
    it('should call UrlEncurtator with the original url', () => {
        const originalUrl = "http://any-url.com"

        const mockUrlShortenerService = mock<UrlShortenerService>()
        const sut = new ShortenUrlUseCase(mockUrlShortenerService)

        sut.execute(originalUrl)
        
        expect(mockUrlShortenerService.shorten).toBeCalledWith(originalUrl)        
    })

})