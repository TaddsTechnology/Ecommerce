"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, Heart, ShoppingBag, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWishlistStore } from "@/hooks/use-wishlist";
import { NavbarCollections } from "./navbar/navbar-collections";

interface Collection {
  id: string;
  name: string;
  slug: string;
}

interface NavbarProps {
  collections?: Collection[];
}

export function Navbar({ collections = [] }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems.length;
  const cartCount = 0;

  const defaultLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "All Products" },
    { href: "/collection/new-arrivals", label: "New Arrivals" },
    { href: "/collection/sale", label: "Sale" },
  ];

  const navLinks = collections.length > 0 
    ? collections.slice(0, 5).map(c => ({ href: `/collection/${c.slug}`, label: c.name }))
    : defaultLinks;

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

  if (!isMounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white border-b border-[var(--color-border)] shadow-sm"
          : "bg-white"
      }`}
    >
      {/* Top banner */}
      <div className="hidden bg-[var(--color-primary)] text-white text-center text-xs font-medium py-2 px-4">
        FREE SHIPPING ON ORDERS OVER $150 · FREE RETURNS
      </div>

      {/* Main nav */}
      <nav className="flex items-center justify-between h-[60px] px-4 md:px-6 max-w-[1920px] mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/vendure.svg" alt="Logo" width={32} height={32} className="h-8 w-8 bg-[var(--color-primary)]" />
        </Link>

        {/* Center: Category links */}
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

          {/* Search - desktop */}
          <div className="hidden md:block relative">
            <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) router.push(`/search?q=${encodeURIComponent(searchQuery)}`); }}>
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 h-9 pl-9 pr-4 bg-gray-50 border-0 rounded-full text-sm focus:ring-1 focus:ring-primary"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>
          </div>

          {/* Wishlist */}
          <Link href="/account/wishlist" className="p-2 relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="p-2 relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--color-border)]">
          <div className="flex flex-col py-4 px-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-4 text-sm font-medium text-[var(--color-text-primary)] hover:bg-gray-50 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}