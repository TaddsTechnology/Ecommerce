import { bootstrap, runMigrations } from '@vendure/core';
import { config } from './vendure-config';

const isDevSqlite = config.dbConnectionOptions.type === 'better-sqlite3'
    && config.dbConnectionOptions.synchronize === true;

const startServer = isDevSqlite
    ? bootstrap(config)
    : runMigrations(config).then(() => bootstrap(config));

startServer.catch(err => {
    console.log(err);
});
