import { mock } from 'jest-mock-extended'
import { ShortenUrlUseCase } from './ShortenUrlUseCase'
import { IdGeneratorService } from './service/IdGeneratorService'
import { UrlService } from './service/UrlService'
import { UrlEntity } from '../domain/entity/UrlEntity'

const makeSut = (newUrl) => {
    const mockIdGenerator = mock<IdGeneratorService>()
    mockIdGenerator.generate.mockReturnValue(newUrl)

    const mockUrlService = mock<UrlService>()

    const sut = new ShortenUrlUseCase(mockUrlService, mockIdGenerator)

    return {
        sut,
        mockIdGenerator,
        mockUrlService
    }
}

describe('ShortenUrlUseCase', () => {
    
    it('should call UrlShortenerService with the original url', (): void => {
        const originalUrl = "https://any-url.com"
        
        const { sut, mockIdGenerator } = makeSut("any_new_url");

        sut.execute(originalUrl)

        expect(mockIdGenerator.generate).toBeCalledTimes(1)
    })

    it('should call UrlService with the return of UrlShortenerService', (): void => {
        const originalUrl = "https://any-url.com"
        const newUrl = "https://new-url.com"
        const urlEntity = new UrlEntity(originalUrl, newUrl)
        
        const { sut, mockIdGenerator, mockUrlService } = makeSut(newUrl)

        sut.execute(originalUrl)
        
        expect(mockIdGenerator.generate).toBeCalledTimes(1)
        expect(mockUrlService.insert).toBeCalledWith(urlEntity)
    })

    it('should return the new url returned by UrlShortenerService', (): void => {
        const originalUrl = "https://any-url.com"
        const newUrl = "https://new-url.com"        
        
        const { sut } = makeSut(newUrl)

        const response = sut.execute(originalUrl)
        
        expect(response).toBe(newUrl)
    })

})