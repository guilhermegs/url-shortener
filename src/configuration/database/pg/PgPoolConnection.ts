import { Pool } from 'pg';

export class PgPoolConnection {
    private static instance: PgPoolConnection;
    pool: Pool;

    private constructor () {
        this.pool = new Pool();
    }

    public static getInstance(): PgPoolConnection {
        if (!PgPoolConnection.instance) {
            PgPoolConnection.instance = new PgPoolConnection();
            // TODO: Improve the connection. Get from env
            PgPoolConnection.instance.pool = new Pool({
                host: '127.0.0.1',
                port: 5432,
                user: 'postgres',
                database: 'wizer',
                password: 'docker'
            });            
        }

        return PgPoolConnection.instance;
    }

}