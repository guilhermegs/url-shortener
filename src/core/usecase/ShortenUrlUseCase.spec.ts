import { mock } from 'jest-mock-extended'
import { ShortenUrlUseCase } from './ShortenUrlUseCase'
import { UrlShortenerService } from './service/UrlShortenerService'
import { UrlService } from './service/UrlService'
import { UrlEntity } from '../domain/entity/UrlEntity'

const makeSut = (newUrl) => {
    const mockUrlShortenerService = mock<UrlShortenerService>()
    mockUrlShortenerService.shorten.mockReturnValue(newUrl)

    const mockUrlService = mock<UrlService>()

    const sut = new ShortenUrlUseCase(mockUrlShortenerService, mockUrlService)

    return {
        sut,
        mockUrlShortenerService,
        mockUrlService
    }
}

describe('ShortenUrlUseCase', () => {
    
    it('should call UrlEncurtator with the original url', () => {
        const originalUrl = "https://any-url.com"
        
        const {sut, mockUrlShortenerService} = makeSut("any_new_url");

        sut.execute(originalUrl)

        expect(mockUrlShortenerService.shorten).toBeCalledWith(originalUrl)        
    })

    it('should call UrlService with the return of UrlShortenerService', () => {
        const originalUrl = "https://any-url.com"
        const newUrl = "https://new-url.com"
        const urlEntity = new UrlEntity(originalUrl, newUrl)
        
        const {sut, mockUrlShortenerService, mockUrlService} = makeSut(newUrl)

        sut.execute(originalUrl)
        
        expect(mockUrlShortenerService.shorten).toBeCalledWith(originalUrl)
        expect(mockUrlService.insert).toBeCalledWith(urlEntity)
    })

    it('should return the new url returned by UrlShortenerService', () => {
        const originalUrl = "https://any-url.com"
        const newUrl = "https://new-url.com"        
        
        const {sut, mockUrlShortenerService, mockUrlService} = makeSut(newUrl)

        const response = sut.execute(originalUrl)
        
        expect(response).toBe(newUrl)
    })

})