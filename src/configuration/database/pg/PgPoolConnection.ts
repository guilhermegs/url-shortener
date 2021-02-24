import { config } from 'dotenv'
config()

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
            PgPoolConnection.instance.pool = new Pool({
                host: process.env.DB_HOST,
                port: parseInt(<string>process.env.DB_PORT, 10),
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });            
        }

        return PgPoolConnection.instance;
    }

}