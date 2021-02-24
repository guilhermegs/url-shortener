import { UrlEntity } from '../../domain/entity/UrlEntity'

export interface UrlService {
    insert(urlEntity: UrlEntity): Promise<void>
    findByOriginalUrl(originalUrl: string): Promise<UrlEntity | null>
    findByNewUrl(newUrl: string): Promise<UrlEntity | null>
    deleteByOriginalUrl(originalUrl: string): Promise<void>
}