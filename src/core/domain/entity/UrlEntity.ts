export class UrlEntity {
    originalUrl: string;
    newUrl: string;
    validityEnd: Date;

    constructor(originalUrl: string, newUrl: string, validityEnd: Date) {
        this.originalUrl = originalUrl
        this.newUrl = newUrl
        this.validityEnd = validityEnd
    }
}