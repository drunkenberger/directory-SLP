import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import LoadingIndicator from './LoadingIndicator';

// Add this to fix the TypeScript error for window.translations
declare global {
  interface Window {
    translations?: Record<string, any>;
  }
}

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const translateElements = () => {
      document.querySelectorAll('[data-translation-key]').forEach(element => {
        const key = element.getAttribute('data-translation-key');
        if (key) {
          element.setAttribute('data-i18n-key', key);
        }
      });
    };
    
    translateElements();
    
    if (window.translations) {
      document.querySelectorAll('[data-i18n-key]').forEach(element => {
        const key = element.getAttribute('data-i18n-key');
        
        if (key) {
          // Get translated value from nested object
          let value: any = window.translations || {};
          const parts = key.split('.');
          
          // Navigate through the nested properties
          for (const part of parts) {
            if (value && typeof value === 'object' && part in value) {
              value = value[part];
            } else {
              value = key; // Key not found, use the key itself
              break;
            }
          }
          
          // Only update text if we got a real translation
          if (typeof value === 'string' && value !== key) {
            element.textContent = value;
          }
        }
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <LoadingIndicator />
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <ScrollToTop />
      <Footer />
    </div>
  );
} 