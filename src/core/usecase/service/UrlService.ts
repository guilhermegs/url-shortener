import { UrlEntity } from '../../domain/entity/UrlEntity'

export interface UrlService {
    insert(urlEntity: UrlEntity): Promise<void>
    findByOriginalUrl(originalUrl: string): Promise<UrlEntity>
    deleteByOriginalUrl(originalUrl: string): Promise<void>
}