'use client';

import { memo } from 'react';

interface HeaderBarProps {
  title: string;
}

export const HeaderBar = memo(function HeaderBar({ title }: HeaderBarProps) {
  return (
    <div className="flex items-center justify-between mb-4 px-4 py-2 bg-gray-800 rounded-t-lg border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-gray-400 text-sm">{title}</div>
    </div>
  );
}); 