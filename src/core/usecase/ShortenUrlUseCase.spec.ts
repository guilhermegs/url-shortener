import { mock } from 'jest-mock-extended'
import { ShortenUrlUseCase } from './ShortenUrlUseCase'
import { IdGeneratorService } from './service/IdGeneratorService'
import { UrlService } from './service/UrlService'
import { UrlEntity } from '../domain/entity/UrlEntity'
import { ValidityEndGeneratorService } from './service/ValidityEndGeneratorService'

const makeSut = (id) => {
    const mockIdGenerator = mock<IdGeneratorService>()
    mockIdGenerator.generate.mockReturnValue(id)

    const mockUrlService = mock<UrlService>()
    
    const mockValidityEndGeneratorService = mock<ValidityEndGeneratorService>()
    const validityEnd = mockValidityEndGeneratorService.generate()
    mockValidityEndGeneratorService.generate.mockReturnValue(validityEnd)

    const sut = new ShortenUrlUseCase(mockUrlService, mockIdGenerator, mockValidityEndGeneratorService)

    return {
        sut,
        mockIdGenerator,
        mockUrlService,
        validityEnd
    }
}

describe('ShortenUrlUseCase', () => {
    
    it('should call IdGeneratorService with the original url', async (): Promise<void> => {
        const { sut, mockIdGenerator } = makeSut("anyid123");

        await sut.execute("https://any-url.com")

        expect(mockIdGenerator.generate).toBeCalledTimes(1)
    })

    it('should create a UrlEntity ann call UrlService with it', async (): Promise<void> => {
        const originalUrl = "https://any-url.com"
        const id = "1234abcd"
        
        const { sut, mockIdGenerator, mockUrlService, validityEnd } = makeSut(id)

        await sut.execute(originalUrl)
                        
        const urlEntity = new UrlEntity(originalUrl, sut.BASE_URL + id, validityEnd)

        expect(mockIdGenerator.generate).toBeCalledTimes(1)
        expect(mockUrlService.insert).toBeCalledWith(urlEntity)
    })

    it('should return a new new url with the id returned by IdGeneratorService', async (): Promise<void> => {
        const originalUrl = "https://any-url.com"
        const id = "abcd123dc"
        
        const { sut } = makeSut(id)

        const response = await sut.execute(originalUrl)
        
        expect(response).toBe(sut.BASE_URL + id)
    })

})