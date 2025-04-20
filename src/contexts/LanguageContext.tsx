'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '@/i18n';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // 始终以 'en' 作为初始值，确保服务器和客户端首次渲染一致
  const [language, setLanguage] = useState<Language>('en');
  // 使用一个状态来标记是否已从 localStorage 加载
  const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);

  // Effect 1: 仅在客户端首次挂载时从 localStorage 加载语言
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // 获取浏览器默认语言
      const browserLanguage = navigator.language.split('-')[0] as Language;
      // 检查浏览器语言是否在支持的语言列表中
      const supportedLanguages: Language[] = ['en', 'zh', 'de'];
      const defaultLanguage = supportedLanguages.includes(browserLanguage) ? browserLanguage : 'en';
      setLanguage(defaultLanguage);
    }
    setIsLocalStorageLoaded(true); // 标记已加载
  }, []); // 确保只在挂载时运行一次

  // Effect 2: 当语言改变且已从 localStorage 加载后，保存到 localStorage
  useEffect(() => {
    // 仅在 localStorage 加载完成后才开始保存，避免覆盖初始加载的值
    if (isLocalStorageLoaded) { 
      localStorage.setItem('language', language);
    }
  }, [language, isLocalStorageLoaded]); // 依赖 language 和加载状态

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 