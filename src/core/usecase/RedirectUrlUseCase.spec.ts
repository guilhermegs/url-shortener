import { mock } from 'jest-mock-extended'
import { UrlService } from './service/UrlService'
import { UrlEntity } from '../domain/entity/UrlEntity'
import { RedirectUrlUseCase } from './RedirectUrlUseCase'
import { ValidityEndGeneratorService as ValidityEndGenerator } from './helper'

const makeSut = () => {    
    const validityEndGenerator = new ValidityEndGenerator()
    const validityEnd = validityEndGenerator.generate()

    const mockUrlService = mock<UrlService>()
    const url = new UrlEntity('original-url', 'new-url', validityEnd)    

    mockUrlService.findByNewUrl.mockResolvedValue(url)
    const sut = new RedirectUrlUseCase(mockUrlService)

    return {
        sut,
        url,
        mockUrlService        
    }
}

describe('RedirectUrlUseCase', () => {
    
    it('should call UrlService with the new url', async (): Promise<void> => {
        const { sut, mockUrlService } = makeSut();
        const newUrl = 'new-url'

        await sut.execute(newUrl)

        expect(mockUrlService.findByNewUrl).toBeCalledTimes(1)
        expect(mockUrlService.findByNewUrl).toBeCalledWith(newUrl)
    })

    it('should return the original url if UrlEntity exists and is valid', async (): Promise<void> => {
        const { sut, url } = makeSut()

        const response = await sut.execute('new-url')

        expect(response).toBe(url.originalUrl)
    })

    it('should return null if UrlEntity not found', async (): Promise<void> => {
        const { sut, mockUrlService } = makeSut()
        mockUrlService.findByNewUrl.mockResolvedValue(null)

        const response = await sut.execute('other-new-url')

        expect(response).toBe(null)
    })

    it('should return null if UrlEntity exists but is not valid', async (): Promise<void> => {
        const { sut, mockUrlService } = makeSut()
        
        const validityEndExpired = new Date()
        validityEndExpired.setHours(0,0,0,0)

        const expiredUrl = new UrlEntity(
            'any-original-url',
            'any-new-url',
            validityEndExpired
        )
        mockUrlService.findByNewUrl.mockResolvedValue(expiredUrl)

        const response = await sut.execute('any-new-url')

        expect(response).toBe(null)
    })
})