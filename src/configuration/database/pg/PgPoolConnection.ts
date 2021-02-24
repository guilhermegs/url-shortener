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
            const isProduction = process.env.NODE_ENV === 'production'
            const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`            

            PgPoolConnection.instance = new PgPoolConnection();
            PgPoolConnection.instance.pool = new Pool({
                connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
                ssl: isProduction,
            })
        }

        return PgPoolConnection.instance;
    }

}