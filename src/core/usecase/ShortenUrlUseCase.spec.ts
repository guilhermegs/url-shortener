import { mock } from 'jest-mock-extended'
import { ShortenUrlUseCase } from './ShortenUrlUseCase'
import { IdGeneratorService } from './service/IdGeneratorService'
import { UrlService } from './service/UrlService'
import { UrlEntity } from '../domain/entity/UrlEntity'
import { ValidityEndGeneratorService } from './service/ValidityEndGeneratorService'
import { ValidityEndGeneratorService as ValidityEndGenerator } from './helper'


const makeIdGenerator = (id) => {
    const mockIdGenerator = mock<IdGeneratorService>()
    mockIdGenerator.generate.mockReturnValue(id)
    return mockIdGenerator
}

const makeUrlService = () => {
    return mock<UrlService>()
}

const makeValidityEndGeneratorService = () => {
    const validityEndGenerator = new ValidityEndGenerator()
    const validityEnd = validityEndGenerator.generate()

    const mockValidityEndGeneratorService = mock<ValidityEndGeneratorService>()    
    mockValidityEndGeneratorService.generate.mockReturnValue(validityEnd)
    return {mockValidityEndGeneratorService, validityEnd}
}

const makeSut = (id) => {
    const mockIdGenerator = makeIdGenerator(id)
    const mockUrlService = makeUrlService()
    const { mockValidityEndGeneratorService, validityEnd } = makeValidityEndGeneratorService()

    const sut = new ShortenUrlUseCase(mockUrlService, mockIdGenerator, mockValidityEndGeneratorService)

    return {
        sut,
        mockIdGenerator,
        mockUrlService,
        mockValidityEndGeneratorService,
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
                        
        const urlEntity = new UrlEntity(originalUrl, id, validityEnd)

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

    it('should call UrlService to verify if url already exists', async (): Promise<void> => {
        const originalUrl = "https://any-url.com"        
    
        const { sut, mockUrlService } = makeSut("abcd123dc")

        await sut.execute(originalUrl)
        
        expect(mockUrlService.findByOriginalUrl).toBeCalledWith(originalUrl)
    })

    it('should return the existent url if find one and it is valid', async (): Promise<void> => {
        const originalUrl = "https://any-url.com"        
        const existentNewUrl = "existent-new-url"
        
        const { sut, 
            mockUrlService, 
            mockIdGenerator, 
            mockValidityEndGeneratorService,
            validityEnd 
        } = makeSut("abcd123dc")

        const existentUrl = new UrlEntity(
            originalUrl, 
            existentNewUrl, 
            validityEnd
        )        
        mockUrlService.findByOriginalUrl.mockResolvedValue(existentUrl)
        
        const response = await sut.execute(originalUrl)
        
        expect(response).toBe(sut.BASE_URL + existentNewUrl)
        expect(mockUrlService.insert).toBeCalledTimes(0)
        expect(mockIdGenerator.generate).toBeCalledTimes(0)
        expect(mockValidityEndGeneratorService.generate).toBeCalledTimes(0)
    })

    it('should delete the existent url if find one and it is not valid', async (): Promise<void> => {
        const originalUrl = "https://any-url.com"
        const existentNewUrl = "existent-new-url"
        const id = "abcd123dc"
        
        const { sut,
            mockUrlService, 
            mockIdGenerator, 
            mockValidityEndGeneratorService,            
        } = makeSut(id)

        const validityEndExpired = new Date()
        validityEndExpired.setHours(0,0,0,0)

        const existentUrl = new UrlEntity(
            originalUrl, 
            existentNewUrl,
            validityEndExpired
        )
        mockUrlService.findByOriginalUrl.mockResolvedValue(existentUrl)
        
        const response = await sut.execute(originalUrl)
        
        expect(response).toBe(sut.BASE_URL + id)
        expect(mockUrlService.deleteByOriginalUrl).toBeCalledTimes(1)
        expect(mockUrlService.deleteByOriginalUrl).toBeCalledWith(originalUrl)
        expect(mockIdGenerator.generate).toBeCalledTimes(1)
        expect(mockValidityEndGeneratorService.generate).toBeCalledTimes(1)
        expect(mockUrlService.insert).toBeCalledTimes(1)        
    })

    it('should throw an error when UrlService throws', async (): Promise<void> => {        
        const {sut, mockUrlService} = makeSut("abc12345")
        mockUrlService.insert.mockImplementation(() => {
            throw new Error()
        })

        const promise = sut.execute("any_url")
        expect(promise).rejects.toThrow()
    })

    it('should throw an error when IdGeneratorService throws', async (): Promise<void> => {        
        const {sut, mockIdGenerator} = makeSut("abc12345")
        mockIdGenerator.generate.mockImplementation(() => {
            throw new Error()
        })

        const promise = sut.execute("any_url")
        expect(promise).rejects.toThrow()
    })

    it('should throw an error when ValidityEndGeneratorService throws', async (): Promise<void> => {        
        const {sut, mockValidityEndGeneratorService} = makeSut("abc12345")
        mockValidityEndGeneratorService.generate.mockImplementation(() => {
            throw new Error()
        })

        const promise = sut.execute("any_url")
        expect(promise).rejects.toThrow()
    })

})