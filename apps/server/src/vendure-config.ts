import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSchedulerPlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin, FileBasedTemplateLoader } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { DashboardPlugin } from '@vendure/dashboard/plugin';
import { GraphiqlPlugin } from '@vendure/graphiql-plugin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const lifecycleEvent = process.env.npm_lifecycle_event ?? '';
const isDevLifecycle = lifecycleEvent.startsWith('dev');
const envFileCandidates = isDevLifecycle
    ? ['.env.development', '.env']
    : ['.env.production', '.env'];

for (const envFile of envFileCandidates) {
    const envPath = path.resolve(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath, override: false });
        break;
    }
}

const IS_DEV = process.env.APP_ENV === 'dev' || isDevLifecycle;
const serverPort = +process.env.PORT || 3000;
const dbType = process.env.DB_TYPE || 'sqlite';
const shouldSynchronizeDb = process.env.DB_SYNCHRONIZE !== 'false';
const sqliteDbPath = process.env.DB_PATH
    ? path.resolve(process.cwd(), process.env.DB_PATH)
    : path.join(__dirname, '../vendure.sqlite');
const shouldSynchronizeSqliteDevDb = IS_DEV && dbType === 'sqlite';

const getDbConnectionOptions = () => {
    if (dbType === 'postgres') {
        const configuredDbHost = process.env.DB_HOST || 'localhost';
        const dbHost = IS_DEV && configuredDbHost === 'postgres'
            ? 'localhost'
            : configuredDbHost;

        return {
            type: 'postgres' as const,
            synchronize: shouldSynchronizeDb,
            migrations: shouldSynchronizeDb ? [] : [path.join(__dirname, './migrations/*.+(js|ts)')],
            logging: false,
            host: dbHost,
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME || 'vendure',
            username: process.env.DB_USERNAME || 'vendure',
            password: process.env.DB_PASSWORD,
        };
    }
    return {
        type: 'better-sqlite3' as const,
        synchronize: shouldSynchronizeSqliteDevDb,
        migrations: shouldSynchronizeSqliteDevDb ? [] : [path.join(__dirname, './migrations/*.+(js|ts)')],
        logging: false,
        database: sqliteDbPath,
    };
};

export const config: VendureConfig = {
    apiOptions: {
        port: serverPort,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        trustProxy: IS_DEV ? false : 1,
        // The following options are useful in development mode,
        // but are best turned off for production for security
        // reasons.
        ...(IS_DEV ? {
            adminApiDebug: true,
            shopApiDebug: true,
        } : {}),
    },
    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD,
        },
        cookieOptions: {
          secret: process.env.COOKIE_SECRET,
        },
    },
    dbConnectionOptions: getDbConnectionOptions(),
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    // When adding or altering custom field definitions, the database will
    // need to be updated. See the "Migrations" section in README.md.
    customFields: {
        Customer: [
            {
                name: 'wishlistItems',
                type: 'text',
                description: [],
            },
        ],
    },
    plugins: [
        GraphiqlPlugin.init(),
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            assetUrlPrefix: process.env.ASSET_URL_PREFIX,
        }),
        DefaultSchedulerPlugin.init(),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templateLoader: new FileBasedTemplateLoader(path.join(__dirname, '../static/email/templates')),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation.
                // Here we are assuming a storefront running at http://localhost:8080.
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        DashboardPlugin.init({
            route: 'dashboard',
            appDir: IS_DEV
                ? path.join(__dirname, '../node_modules/@vendure/dashboard/dist')
                : path.join(__dirname, '../dist/dashboard'),
        }),
    ],
};
