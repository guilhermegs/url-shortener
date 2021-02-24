import { mock } from 'jest-mock-extended'
import { UrlDatabaseProvider } from './UrlDatabaseProvider'
import { Repository } from '../../configuration/database/Repository'
import { UrlEntity } from '../../core/domain/entity/UrlEntity'

const makeSut = () => {
    const mockRepository = mock<Repository>()
    const urls: any[] = [
        { id:1, original_url: 'original-url', new_url: 'new-url', validity_end: new Date() }
    ]
    mockRepository.query.mockResolvedValue(urls)

    const sut = new UrlDatabaseProvider(mockRepository)

    return {
        sut,
        mockRepository,
        urls
    }
}

describe('UrlDatabaseProvider', (): void => {

    describe('insert', (): void => {
        it('should call the repository with right arguments in the insert function', async (): Promise<void> => {
            const { sut, mockRepository } = makeSut()
    
            const urlEntity = new UrlEntity('original-url', 'new-url', new Date())
            await sut.insert(urlEntity)
            
            expect(mockRepository.query).toBeCalledTimes(1)
            expect(mockRepository.query).toBeCalledWith(
                sut.QUERY_INSERT,
                [urlEntity.originalUrl, urlEntity.newUrl, urlEntity.validityEnd]
            )
        })
    })    

    describe('findByOriginalUrl', (): void => {
        it('should call the repository with right arguments in the findByOriginalUrl function', async (): Promise<void> => {
            const { sut, mockRepository } = makeSut()
            
            const originalUrl = 'original-url'
            await sut.findByOriginalUrl(originalUrl)
            
            expect(mockRepository.query).toBeCalledTimes(1)
            expect(mockRepository.query).toBeCalledWith(
                sut.QUERY_FIND_BY_ORIGINAL_URL,
                [originalUrl]
            )
        })

        it('should return a url if exists', async (): Promise<void> => {
            const { sut, urls } = makeSut()
                        
            const response = await sut.findByOriginalUrl(urls[0].original_url)
            
            expect(response).toStrictEqual(
                new UrlEntity(urls[0].original_url, urls[0].new_url, urls[0].validity_end)
            )
        })

        it('should return null if url not found', async (): Promise<void> => {
            const { sut, urls, mockRepository } = makeSut()
            mockRepository.query.mockResolvedValue([])
                        
            const response = await sut.findByOriginalUrl(urls[0].original_url)
            
            expect(response).toBeNull()
        })
    })
    
    describe('deleteByOriginalUrl', ():void => {
        it('should call the repository with right arguments in the deleteByOriginalUrl function', async (): Promise<void> => {
            const { sut, mockRepository } = makeSut()
            
            const originalUrl = 'original-url'
            await sut.deleteByOriginalUrl(originalUrl)
            
            expect(mockRepository.query).toBeCalledTimes(1)
            expect(mockRepository.query).toBeCalledWith(
                sut.QUERY_DELETE_BY_ORIGINAL_URL,
                [originalUrl]
            )
        })
    })

    describe('findByNewUrl', (): void => {
        it('should call the repository with right arguments in the findByNewUrl function', async (): Promise<void> => {
            const { sut, mockRepository } = makeSut()
            
            const newUrl = 'new-url'
            await sut.findByNewUrl(newUrl)
            
            expect(mockRepository.query).toBeCalledTimes(1)
            expect(mockRepository.query).toBeCalledWith(
                sut.QUERY_FIND_BY_NEW_URL,
                [newUrl]
            )
        })

        it('should return a url if exists', async (): Promise<void> => {
            const { sut, urls } = makeSut()
                        
            const response = await sut.findByNewUrl(urls[0].new_url)
            
            expect(response).toStrictEqual(
                new UrlEntity(urls[0].original_url, urls[0].new_url, urls[0].validity_end)
            )
        })

        it('should return null if url not found', async (): Promise<void> => {
            const { sut, urls, mockRepository } = makeSut()
            mockRepository.query.mockResolvedValue([])
                        
            const response = await sut.findByNewUrl(urls[0].new_url)
            
            expect(response).toBeNull()
        })
    })
})

