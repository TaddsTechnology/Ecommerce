"use client";

import { useState, useEffect, useCallback } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PopupState {
  hasShownNewsletter: boolean;
  hasShownExitIntent: boolean;
  hasShownFreeShipping: boolean;
  setHasShownNewsletter: (value: boolean) => void;
  setHasShownExitIntent: (value: boolean) => void;
  setHasShownFreeShipping: (value: boolean) => void;
  resetAll: () => void;
}

export const usePopupStore = create<PopupState>()(
  persist(
    (set) => ({
      hasShownNewsletter: false,
      hasShownExitIntent: false,
      hasShownFreeShipping: false,
      setHasShownNewsletter: (value) => set({ hasShownNewsletter: value }),
      setHasShownExitIntent: (value) => set({ hasShownExitIntent: value }),
      setHasShownFreeShipping: (value) => set({ hasShownFreeShipping: value }),
      resetAll: () => set({
        hasShownNewsletter: false,
        hasShownExitIntent: false,
        hasShownFreeShipping: false,
      }),
    }),
    { name: "popup-storage" }
  )
);

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "center" | "bottom-right";
}

export function Popup({ isOpen, onClose, children, position = "center" }: PopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[var(--color-foreground)]/60"
            onClick={onClose}
          />
          
          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative bg-[var(--color-background)] p-8 md:p-12 max-w-md w-full mx-4 ${
              position === "center" ? "text-center" : "text-left"
            }`}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface NewsletterPopupProps {
  delay?: number;
}

export function NewsletterPopup({ delay = 3000 }: NewsletterPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;
    
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, hasShown]);

  if (!isOpen) return null;

  return (
    <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {/* Decorative line */}
      <div className="h-px w-12 bg-[var(--color-gold)] mx-auto mb-6" />
      
      <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
        Exclusive Access
      </span>
      
      <h3 className="text-2xl md:text-3xl font-[var(--font-display)] leading-[0.9] text-[var(--color-foreground)] mt-3 mb-4">
        Join the Inner Circle
      </h3>
      
      <p className="text-sm text-[var(--color-muted)] mb-8 max-w-xs mx-auto">
        Be first to access new collections, receive exclusive offers, and enjoy priority previews.
      </p>
      
      <form className="space-y-4 max-w-xs mx-auto" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
        <Input 
          type="email" 
          placeholder="Your email address"
          required
          className="bg-transparent border-[var(--color-foreground)]/20 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]/60"
        />
        <Button className="w-full">
          Subscribe
        </Button>
      </form>
      
      <p className="text-[10px] text-[var(--color-muted)] mt-4">
        By subscribing, you agree to receive marketing communications. Unsubscribe anytime.
      </p>
    </Popup>
  );
}

interface ExitIntentPopupProps {
  discount?: string;
}

export function ExitIntentPopup({ discount = "SAVE15" }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { hasShownExitIntent, setHasShownExitIntent } = usePopupStore();

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (hasShownExitIntent) return;
    
    if (e.clientY <= 0) {
      setIsOpen(true);
      setHasShownExitIntent(true);
    }
  }, [hasShownExitIntent, setHasShownExitIntent]);

  useEffect(() => {
    if (hasShownExitIntent) return;
    
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave, hasShownExitIntent]);

  if (!isOpen) return null;

  return (
    <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {/* Decorative line */}
      <div className="h-px w-12 bg-[var(--color-gold)] mx-auto mb-6" />
      
      <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
        Wait! Before You Go
      </span>
      
      <h3 className="text-2xl md:text-3xl font-[var(--font-display)] leading-[0.9] text-[var(--color-foreground)] mt-3 mb-4">
        Don&apos;t Miss Out
      </h3>
      
      <p className="text-sm text-[var(--color-muted)] mb-6">
        Complete your order and enjoy exclusive savings.
      </p>
      
      <div className="bg-[var(--color-muted-bg)] p-4 mb-6 text-center">
        <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">Use code</span>
        <p className="text-xl font-[var(--font-display)] text-[var(--color-gold)] mt-1">{discount}</p>
      </div>
      
      <Button className="w-full" onClick={() => setIsOpen(false)}>
        Continue Shopping
      </Button>
    </Popup>
  );
}

interface FreeShippingProgressProps {
  threshold?: number;
  currentAmount?: number;
}

export function FreeShippingProgress({ threshold = 15000, currentAmount = 0 }: FreeShippingProgressProps) {
  const progress = Math.min((currentAmount / threshold) * 100, 100);
  const remaining = Math.max(threshold - currentAmount, 0);

  if (currentAmount >= threshold) {
    return (
      <div className="bg-[var(--color-foreground)] text-[var(--color-background)] py-3 px-6 text-center text-sm">
        <span className="text-xs uppercase tracking-[0.2em]">🎉 Congratulations! You&apos;ve unlocked FREE shipping</span>
      </div>
    );
  }

  if (remaining === 0) return null;

  return (
    <div className="bg-[var(--color-muted-bg)] py-4 px-6 mt-16 md:mt-20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] mb-2">
          <span className="text-[var(--color-muted)]">Free Shipping Progress</span>
          <span className="text-[var(--color-foreground)]">
            ${(remaining / 100).toFixed(0)} more
          </span>
        </div>
        
        <div className="h-px bg-[var(--color-foreground)]/10 mb-2">
          <motion.div 
            className="h-full bg-[var(--color-gold)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
        
        <p className="text-[10px] text-[var(--color-muted)] text-center">
          Spend ${(remaining / 100).toFixed(0)} more for FREE shipping
        </p>
      </div>
    </div>
  );
}

interface VIPSignupPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VIPSignupPopup({ isOpen, onClose }: VIPSignupPopupProps) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="h-px w-12 bg-[var(--color-gold)] mx-auto mb-6" />
      
      <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
        VIP Program
      </span>
      
      <h3 className="text-2xl md:text-3xl font-[var(--font-display)] leading-[0.9] text-[var(--color-foreground)] mt-3 mb-4">
        Become a VIP
      </h3>
      
      <ul className="text-sm text-[var(--color-muted)] space-y-2 mb-6 text-left">
        <li className="flex items-center gap-2">
          <span className="w-1 h-1 bg-[var(--color-gold)]" />
          Early access to new collections
        </li>
        <li className="flex items-center gap-2">
          <span className="w-1 h-1 bg-[var(--color-gold)]" />
          Exclusive offers and private sales
        </li>
        <li className="flex items-center gap-2">
          <span className="w-1 h-1 bg-[var(--color-gold)]" />
          Complimentary gift wrapping
        </li>
        <li className="flex items-center gap-2">
          <span className="w-1 h-1 bg-[var(--color-gold)]" />
          Priority customer service
        </li>
      </ul>
      
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
        <Input 
          type="email" 
          placeholder="Your email address"
          required
          className="bg-transparent border-[var(--color-foreground)]/20 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]/60"
        />
        <Button className="w-full">
          Join the VIP List
        </Button>
      </form>
    </Popup>
  );
}

interface PopupManagerProps {
  freeShippingThreshold?: number;
  currentCartTotal?: number;
  discountCode?: string;
}

export function PopupManager({ 
  discountCode = "SAVE15"
}: PopupManagerProps) {
  return (
    <>
      <NewsletterPopup delay={3000} />
      <ExitIntentPopup discount={discountCode} />
    </>
  );
}