'use client';

import {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {loginAction} from './actions';
import {Input} from '@/components/ui/input';
import { Link } from '@/i18n/navigation';

type LoginFormData = {
    username: string;
    password: string;
};

interface LoginFormProps {
    redirectTo?: string;
}

export function LoginForm({redirectTo}: LoginFormProps) {
    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm<LoginFormData>({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = (data: LoginFormData) => {
        setServerError(null);

        startTransition(async () => {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('password', data.password);
            if (redirectTo) {
                formData.append('redirectTo', redirectTo);
            }

            const result = await loginAction(undefined, formData);
            if (result?.error) {
                setServerError(result.error);
            }
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                    type="email"
                    placeholder="your@email.com"
                    disabled={isPending}
                    {...form.register('username')}
                    className="h-12 rounded-lg bg-[var(--color-grey-100)] border-0 focus-visible:ring-2"
                />
                {form.formState.errors.username && (
                    <p className="text-sm text-[var(--color-error)]">{form.formState.errors.username.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Password</label>
                    <Link href="/forgot-password" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
                        Forgot?
                    </Link>
                </div>
                <Input
                    type="password"
                    placeholder="••••••••"
                    disabled={isPending}
                    {...form.register('password')}
                    className="h-12 rounded-lg bg-[var(--color-grey-100)] border-0 focus-visible:ring-2"
                />
                {form.formState.errors.password && (
                    <p className="text-sm text-[var(--color-error)]">{form.formState.errors.password.message}</p>
                )}
            </div>

            {serverError && (
                <div className="text-sm text-[var(--color-error)]">{serverError}</div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-[var(--color-primary)] text-white rounded-[30px] font-medium hover:opacity-90 disabled:opacity-50"
            >
                {isPending ? 'Signing in...' : 'Sign In'}
            </button>
        </form>
    );
}
