"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, Heart, Menu, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWishlistStore } from "@/hooks/use-wishlist";

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
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    setIsMounted(true);
    const storedCart = typeof window !== 'undefined' ? localStorage.getItem('cartCount') : '0';
    setCartCount(storedCart ? parseInt(storedCart, 10) : 0);
  }, []);

  const defaultLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Shop" },
    { href: "/collection/new-arrivals", label: "New" },
    { href: "/collection/sale", label: "Sale" },
  ];

  const navLinks = collections.length > 0 
    ? collections.slice(0, 4).map(c => ({ href: `/collection/${c.slug}`, label: c.name }))
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[var(--color-background)]/95 backdrop-blur-sm border-b border-[var(--color-foreground)]/10"
          : "bg-transparent"
      }`}
    >
      {/* Main nav */}
      <nav className="flex items-center justify-between h-16 md:h-20 px-8 md:px-16 max-w-[1920px] mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-lg md:text-xl font-[var(--font-display)] tracking-tight text-[var(--color-foreground)]">
            BRAND
          </span>
        </Link>

        {/* Center: Category links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-[var(--color-foreground)] hover:text-[var(--color-gold)] transition-colors duration-500"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          {/* Search - mobile only */}
          <Link href="/search" className="md:hidden p-2">
            <SearchIcon className="w-5 h-5" />
          </Link>

          {/* Search - desktop */}
          <div className="hidden md:block relative">
            <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) router.push(`/search?q=${encodeURIComponent(searchQuery)}`); }}>
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-32 lg:w-40 h-10 pl-0 pr-0 bg-transparent border-b border-transparent text-xs uppercase tracking-wider focus:border-b-2 focus:border-[var(--color-gold)]"
              />
            </form>
          </div>

          {/* Wishlist */}
          <Link href="/account/wishlist" className="p-2 relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--color-gold)] text-[var(--color-foreground)] text-[10px] font-medium flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Sign In / Account */}
          <Link href="/sign-in" className="text-xs uppercase tracking-[0.2em] hover:text-[var(--color-gold)] transition-colors duration-500 hidden md:block">
            Sign In
          </Link>

          {/* Cart - with count */}
          <Link href="/cart" className="p-2 relative hover:text-[var(--color-gold)] transition-colors duration-500">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-gold)] text-[var(--color-foreground)] text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
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
        <div className="md:hidden bg-[var(--color-background)] border-t border-[var(--color-foreground)]/10">
          <div className="flex flex-col py-8 px-8 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 text-xs uppercase tracking-[0.2em] text-[var(--color-foreground)] hover:text-[var(--color-gold)] transition-colors duration-300 border-b border-[var(--color-foreground)]/10"
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