'use client';

import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: 'header' | 'hero';
}

export function Logo({ className = "", variant = 'header' }: LogoProps) {
  if (variant === 'hero') {
    return (
      <div className="relative w-full h-full">
        <Image
          src="/crystal.svg"
          alt="Crystal Logo"
          fill
          className={`dark:invert animate-float ${className}`}
          priority
        />
      </div>
    );
  }

  // Header variant
  return (
    <div className="relative w-8 h-8">
      <Image
        src="/crystal.svg"
        alt="Crystal Logo"
        fill
        className={`dark:invert ${className}`}
        priority
      />
    </div>
  );
} 