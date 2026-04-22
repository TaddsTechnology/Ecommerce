'use client';

import { useState } from 'react';
import { User, LogIn } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export function NavbarUser() {
    const [isLoggedIn] = useState(false);

    if (!isLoggedIn) {
        return (
            <div className="flex items-center gap-2">
                <Link href="/sign-in" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hidden sm:block">
                    Sign In
                </Link>
                <Link href="/sign-in" className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-[30px] text-sm font-medium hover:opacity-90">
                    Join
                </Link>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[var(--color-grey-100)]">
                <User className="h-5 w-5" />
                <span className="hidden sm:inline text-sm">John</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white min-w-[180px]">
                <DropdownMenuItem>
                    <Link href="/account/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/account/orders" className="w-full">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/sign-in" className="w-full flex items-center gap-2">
                        <LogIn className="h-4 w-4" /> Sign Out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
