import { IdGeneratorService } from "../service/IdGeneratorService";

export class IdGenerator implements IdGeneratorService {
    generate(): string {
        return Math.random().toString(36).substring(7);
    }

}