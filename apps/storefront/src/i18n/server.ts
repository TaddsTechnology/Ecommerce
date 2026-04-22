import {routing} from './routing';

export async function getRouteLocale(): Promise<string> {
    // Use default locale to avoid headers() in cache
    // This can be enhanced with middleware later for dynamic locale detection
    return routing.defaultLocale;
}