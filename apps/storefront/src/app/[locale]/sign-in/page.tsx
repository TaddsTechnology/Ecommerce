import type {Metadata} from 'next';
import {Suspense} from 'react';
import {getRouteLocale} from '@/i18n/server';
import {getTranslations} from 'next-intl/server';
import {LoginForm} from "./login-form";
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Auth'});
    return {
        title: t('pageTitle'),
    };
}

function LoginFormSkeleton() {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="h-4 w-20 bg-[var(--color-grey-200)] rounded"></div>
                <div className="h-12 w-full bg-[var(--color-grey-100)] rounded-lg"></div>
            </div>
            <div className="space-y-2">
                <div className="h-4 w-24 bg-[var(--color-grey-200)] rounded"></div>
                <div className="h-12 w-full bg-[var(--color-grey-100)] rounded-lg"></div>
            </div>
            <div className="h-12 w-full bg-[var(--color-grey-200)] rounded-full"></div>
        </div>
    );
}

async function SignInContent({searchParams}: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const resolvedParams = await searchParams;
    const redirectTo = resolvedParams?.redirectTo as string | undefined;

    return <LoginForm redirectTo={redirectTo}/>;
}

export default async function SignInPage({searchParams}: PageProps<'/[locale]/sign-in'>) {
    return (
        <div className="min-h-screen bg-gray-50 flex pt-16">
            {/* Left side - Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-900 items-center justify-center p-12">
                <div className="text-center text-white">
                    <h2 className="text-4xl lg:text-6xl font-bold uppercase tracking-tight">
                        Welcome<br/>Back
                    </h2>
                    <p className="mt-4 text-lg text-white/70">
                        Sign in to your account
                    </p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold uppercase tracking-wide">Sign In</h1>
                        <p className="mt-2 text-[var(--color-text-secondary)]">Enter your credentials</p>
                    </div>
                    
                    <Suspense fallback={<LoginFormSkeleton/>}>
                        <SignInContent searchParams={searchParams}/>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
