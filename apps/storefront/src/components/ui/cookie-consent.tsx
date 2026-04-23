'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CookieConsentState {
  hasConsented: boolean;
  analytics: boolean;
  marketing: boolean;
  setConsent: (analytics: boolean, marketing: boolean) => void;
}

export const useCookieConsent = create<CookieConsentState>()(
  persist(
    (set) => ({
      hasConsented: false,
      analytics: false,
      marketing: false,
      setConsent: (analytics, marketing) => set({ 
        hasConsented: true, 
        analytics, 
        marketing 
      }),
    }),
    { name: 'cookie-consent' }
  )
);

export function CookieConsent() {
  const { hasConsented, setConsent } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({ analytics: true, marketing: true });

  useEffect(() => {
    if (!hasConsented) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [hasConsented]);

  if (!isVisible || hasConsented) return null;

  const handleAcceptAll = () => {
    setConsent(true, true);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    setConsent(false, false);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    setConsent(preferences.analytics, preferences.marketing);
    setIsVisible(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[var(--color-foreground)]/40 z-[150]" />
      
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[160] bg-[var(--color-background)] border-t border-[var(--color-foreground)]/10 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {!showPreferences ? (
            <>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <h3 className="text-xl font-[var(--font-display)] leading-[0.9] mb-3">
                    We Value Your Privacy
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    We use cookies to enhance your shopping experience, personalize content, and analyze our traffic. 
                    By clicking &quot;Accept All&quot;, you consent to our use of cookies. You can manage your preferences or reject non-essential cookies.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPreferences(true)}
                    className="uppercase text-xs tracking-[0.15em]"
                  >
                    Customize
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRejectAll}
                    className="uppercase text-xs tracking-[0.15em]"
                  >
                    Reject All
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleAcceptAll}
                    className="uppercase text-xs tracking-[0.15em]"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[var(--color-foreground)]/10">
                <Link 
                  href="/cookies" 
                  className="text-xs text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors underline"
                >
                  Learn more about how we use cookies
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <h3 className="text-xl font-[var(--font-display)] leading-[0.9] mb-3">
                    Cookie Preferences
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    Customize your cookie preferences. Essential cookies are required for the website to function properly.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0 lg:pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPreferences(false)}
                    className="uppercase text-xs tracking-[0.15em]"
                  >
                    Back
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSavePreferences}
                    className="uppercase text-xs tracking-[0.15em]"
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-[var(--color-foreground)]/10">
                  <div>
                    <p className="text-sm font-medium">Essential Cookies</p>
                    <p className="text-xs text-[var(--color-muted)]">Required for the website to function</p>
                  </div>
                  <span className="text-xs text-[var(--color-muted)] uppercase tracking-[0.15em]">Always Active</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-[var(--color-foreground)]/10">
                  <div>
                    <p className="text-sm font-medium">Analytics Cookies</p>
                    <p className="text-xs text-[var(--color-muted)]">Help us improve our website</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[var(--color-foreground)]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-gold)]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-[var(--color-foreground)]/10">
                  <div>
                    <p className="text-sm font-medium">Marketing Cookies</p>
                    <p className="text-xs text-[var(--color-muted)]">Used for personalized advertisements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[var(--color-foreground)]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-gold)]"></div>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}