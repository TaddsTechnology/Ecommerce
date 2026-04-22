import type {Metadata} from 'next';
import { getActiveCustomer } from '@/lib/vendure/actions';
import { ChangePasswordForm } from './change-password-form';
import { EditProfileForm } from './edit-profile-form';
import { EditEmailForm } from './edit-email-form';
import {getRouteLocale} from '@/i18n/server';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Account'});
    return {
        title: t('profilePageTitle'),
    };
}

export default async function ProfilePage() {
    const customer = await getActiveCustomer();
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Account'});

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div>
                    <h1 className="text-3xl font-bold">{t('profile')}</h1>
                    <p className="text-gray-500 mt-2">
                        {t('manageAccountInfo')}
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <EditProfileForm customer={customer} />
                    <EditEmailForm currentEmail={customer?.emailAddress || ''} />
                    <ChangePasswordForm />
                </div>
            </div>
        </main>
    );
}
