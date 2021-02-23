import { mock } from 'jest-mock-extended'
import { ShortenUrlUseCase } from './ShortenUrlUseCase'
import { IdGeneratorService } from './service/IdGeneratorService'
import { UrlService } from './service/UrlService'
import { UrlEntity } from '../domain/entity/UrlEntity'

const makeSut = (id) => {
    const mockIdGenerator = mock<IdGeneratorService>()
    mockIdGenerator.generate.mockReturnValue(id)

    const mockUrlService = mock<UrlService>()

    const sut = new ShortenUrlUseCase(mockUrlService, mockIdGenerator)

    return {
        sut,
        mockIdGenerator,
        mockUrlService
    }
}

describe('ShortenUrlUseCase', () => {
    
    it('should call IdGeneratorService with the original url', (): void => {
        const { sut, mockIdGenerator } = makeSut("anyid123");

        sut.execute("https://any-url.com")

        expect(mockIdGenerator.generate).toBeCalledTimes(1)
    })

    it('should call UrlService with a new url generated with the return of IdGeneratorService', (): void => {
        const originalUrl = "https://any-url.com"
        const id = "1234abcd"
        
        const { sut, mockIdGenerator, mockUrlService } = makeSut(id)

        sut.execute(originalUrl)
                
        expect(mockIdGenerator.generate).toBeCalledTimes(1)
        expect(mockUrlService.insert).toBeCalledWith(new UrlEntity(originalUrl, sut.BASE_URL + id))
    })

    it('should return a new new url with the id returned by IdGeneratorService', (): void => {
        const originalUrl = "https://any-url.com"
        const id = "abcd123dc"
        
        const { sut } = makeSut(id)

        const response = sut.execute(originalUrl)
        
        expect(response).toBe(sut.BASE_URL + id)
    })

})