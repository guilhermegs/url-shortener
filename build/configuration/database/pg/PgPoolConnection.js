"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgPoolConnection = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.config();
var pg_1 = require("pg");
var PgPoolConnection = /** @class */ (function () {
    function PgPoolConnection() {
        this.pool = new pg_1.Pool();
    }
    PgPoolConnection.getInstance = function () {
        if (!PgPoolConnection.instance) {
            var isProduction = process.env.NODE_ENV === 'production';
            var connectionString = "postgresql://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_DATABASE;
            PgPoolConnection.instance = new PgPoolConnection();
            PgPoolConnection.instance.pool = new pg_1.Pool({
                connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
                ssl: isProduction,
            });
        }
        return PgPoolConnection.instance;
    };
    return PgPoolConnection;
}());
exports.PgPoolConnection = PgPoolConnection;
