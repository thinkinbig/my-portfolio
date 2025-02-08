'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

type NoticeProps = {
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success';
};

export function Notice({ children, variant = 'warning' }: NoticeProps) {
  const variants = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'text-blue-500 dark:text-blue-400',
      hover: 'hover:text-blue-600 dark:hover:text-blue-300',
      link: 'text-blue-600 dark:text-blue-300'
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      text: 'text-amber-800 dark:text-amber-200',
      icon: 'text-amber-500 dark:text-amber-400',
      hover: 'hover:text-amber-600 dark:hover:text-amber-300',
      link: 'text-amber-600 dark:text-amber-300'
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-800 dark:text-emerald-200',
      icon: 'text-emerald-500 dark:text-emerald-400',
      hover: 'hover:text-emerald-600 dark:hover:text-emerald-300',
      link: 'text-emerald-600 dark:text-emerald-300'
    }
  };

  const style = variants[variant];
  const linkStyle = `font-semibold hover:underline inline-flex items-center gap-1 after:content-['↗'] after:text-xs transition-colors ${style.link} ${style.hover}`;

  return (
    <div className={`
      mb-8 p-5 rounded-xl shadow-sm backdrop-blur-sm
      border border-opacity-50 ${style.border} ${style.bg}
      transform transition-all duration-300 hover:shadow-md hover:-translate-y-0.5
    `}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-1">
          {variant === 'info' ? (
            <svg className={`h-5 w-5 ${style.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : variant === 'success' ? (
            <svg className={`h-5 w-5 ${style.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className={`h-5 w-5 ${style.icon} animate-pulse`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <div className={`text-sm font-medium ${style.text} leading-relaxed`}>
            <ReactMarkdown
              components={{
                a: ({...props}) => (
                  <a 
                    {...props} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={linkStyle}
                  />
                ),
              }}
            >
              {children as string}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
} 