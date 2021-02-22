export interface UrlShortenerService {
    shorten(originalUrl: string): string;
}