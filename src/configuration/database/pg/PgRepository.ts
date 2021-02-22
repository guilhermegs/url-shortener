import { Repository } from "../Repository"
import { PgPoolConnection } from "./PgPoolConnection"

export class PgRepository implements Repository {

    pgPoolConnection: PgPoolConnection

    constructor () {
        this.pgPoolConnection = PgPoolConnection.getInstance()
    }

    async query(queryString: string, queryParams: any[]): Promise<any[]> {
        return (await this.pgPoolConnection.pool.query(queryString, queryParams)).rows
    }

}