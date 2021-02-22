import { mock } from 'jest-mock-extended'
import { UrlDatabaseProvider } from './UrlDatabaseProvider'
import { Repository } from '../../configuration/database/Repository'
import { UrlEntity } from '../../core/domain/entity/UrlEntity'

describe('UrlDatabaseProvider', (): void => {

    it('should call the repository with right arguments', async (): Promise<void> => {
        const mockRepository = mock<Repository>()
        const sut = new UrlDatabaseProvider(mockRepository)

        const urlEntity = new UrlEntity('original-url', 'new-url')
        await sut.insert(urlEntity)
        
        expect(mockRepository.query).toBeCalledTimes(1)
        expect(mockRepository.query).toBeCalledWith(
            sut.INSERT_QUERY,
            [urlEntity.originalUrl, urlEntity.newUrl]
        )
    })
})

