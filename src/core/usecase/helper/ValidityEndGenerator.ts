import moment from 'moment'
import { ValidityEndGeneratorService } from "../service/ValidityEndGeneratorService";

export class ValidityEndGenerator implements ValidityEndGeneratorService {
    generate(): Date {
        return moment().add(1, 'days').toDate()
    }

}