export class UrlEntity {
    originalUrl: string;
    newUrl: string;    

    constructor(originalUrl: string, newUrl: string) {
        this.originalUrl = originalUrl
        this.newUrl = newUrl        
    }
}