import { UrlEntity } from '../../core/domain/entity/UrlEntity'
import { UrlService } from '../../core/usecase/service/UrlService'
import { Repository } from '../../configuration/database/Repository'

export class UrlDatabaseProvider implements UrlService {
    
    constructor(
        private database: Repository
    ) { }

    INSERT_QUERY = 'INSERT INTO URL (original_url, new_url, validity_end) VALUES ($1, $2, $3)'

    async insert(urlEntity: UrlEntity): Promise<void> {
        const queryParams = [urlEntity.originalUrl, urlEntity.newUrl, urlEntity.validityEnd]

        await this.database.query(this.INSERT_QUERY, queryParams)
    }

}