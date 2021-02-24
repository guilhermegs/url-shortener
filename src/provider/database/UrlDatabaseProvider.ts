import { UrlEntity } from '../../core/domain/entity/UrlEntity'
import { UrlService } from '../../core/usecase/service/UrlService'
import { Repository } from '../../configuration/database/Repository'

export class UrlDatabaseProvider implements UrlService {
    
    constructor(
        private database: Repository
    ) { }    

    QUERY_INSERT = 'INSERT INTO URL (original_url, new_url, validity_end) VALUES ($1, $2, $3)'
    QUERY_FIND_BY_ORIGINAL_URL = 'SELECT * FROM URL U WHERE U.original_url = $1'
    QUERY_FIND_BY_NEW_URL = 'SELECT * FROM URL U WHERE U.new_url = $1'
    QUERY_DELETE_BY_ORIGINAL_URL = 'DELETE FROM URL U WHERE U.original_url = $1'

    async insert(urlEntity: UrlEntity): Promise<void> {
        const queryParams = [urlEntity.originalUrl, urlEntity.newUrl, urlEntity.validityEnd]

        await this.database.query(this.QUERY_INSERT, queryParams)
    }

    async findByOriginalUrl(originalUrl: string): Promise<UrlEntity | null> {
        const queryParams = [originalUrl]

        const response: any[] = await this.database.query(this.QUERY_FIND_BY_ORIGINAL_URL, queryParams)
        if(response && response.length){
            return new UrlEntity(response[0].original_url, response[0].new_url, new Date(response[0].validity_end))
        }
        return null
    } 
    
    async deleteByOriginalUrl(originalUrl: string): Promise<void> {
        const queryParams = [originalUrl]
        
        await this.database.query(this.QUERY_DELETE_BY_ORIGINAL_URL, queryParams)
    }

    async findByNewUrl(newUrl: string): Promise<UrlEntity | null> {
        const queryParams = [newUrl]

        const response: any[] = await this.database.query(this.QUERY_FIND_BY_NEW_URL, queryParams)
        if(response && response.length){
            return new UrlEntity(response[0].original_url, response[0].new_url, new Date(response[0].validity_end))
        }
        return null
    }

}