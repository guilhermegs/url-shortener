import { UrlEntity } from '../../domain/entity/UrlEntity'

export interface UrlService {
    insert(urlEntity: UrlEntity): Promise<void>;
}