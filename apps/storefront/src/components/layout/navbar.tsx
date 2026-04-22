"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, Heart, ShoppingBag, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWishlistStore } from "@/hooks/use-wishlist";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems.length;
  const cartCount = 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "All Products" },
    { href: "/collection/new", label: "New Arrivals" },
    { href: "/collection/sale", label: "Sale" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white border-b border-[var(--color-border)] shadow-sm"
          : "bg-white"
      }`}
    >
      {/* Top banner - promotional */}
      <div className="hidden bg-[var(--color-primary)] text-white text-center text-xs font-medium py-2 px-4">
        FREE SHIPPING ON ORDERS OVER $150 · FREE RETURNS
      </div>

      {/* Main nav */}
      <nav className="flex items-center justify-between h-[60px] px-4 md:px-6 max-w-[1920px] mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/vendure.svg" alt="Logo" width={32} height={32} className="h-8 w-8 bg-[var(--color-primary)]" />
        </Link>

        {/* Center: Category links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-grey-500)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-1">
          {/* Search - mobile only */}
          <Link href="/search" className="md:hidden p-2">
            <SearchIcon className="w-5 h-5" />
          </Link>

          {/* Search - desktop only */}
          <form action="/search" className="hidden md:block relative">
            <div className="relative">
              <Input
                type="search"
                name="q"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 h-10 pl-4 pr-10 rounded-full bg-[var(--color-grey-100)] border-0 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <SearchIcon className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </button>
            </div>
          </form>

          {/* Wishlist */}
          <Link href="/account/wishlist" className="relative p-2 rounded-full hover:bg-[var(--color-grey-100)]">
            <Heart className="w-5 h-5" />
            {isMounted && wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-[var(--color-grey-100)]">
            <ShoppingBag className="w-5 h-5" />
            {isMounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Sign In */}
          <Link href="/sign-in" className="hidden md:block text-sm font-medium hover:text-[var(--color-grey-500)]">
            Sign In
          </Link>

          {/* Mobile: Menu */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2">
            <Menu className="w-5 h-5" />
          </button>
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="fixed left-0 top-0 bottom-0 w-[300px] bg-white p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)}>✕</button>
                </div>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-[var(--color-text-primary)] hover:text-[var(--color-grey-500)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
