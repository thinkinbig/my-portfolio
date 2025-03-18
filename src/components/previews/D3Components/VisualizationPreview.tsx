'use client';

import { memo, RefObject } from 'react';

interface VisualizationPreviewProps {
  error: string | null;
  isLoading: boolean;
  visualizationRef: RefObject<HTMLDivElement | null>;
}

export const VisualizationPreview = memo(function VisualizationPreview({
  error,
  isLoading,
  visualizationRef
}: VisualizationPreviewProps) {
  return (
    <div className="flex-1 bg-gray-900 p-4 rounded-lg relative min-h-[400px] max-h-[800px] overflow-auto">
      {/* 预览区域 - 自适应大小 */}
      <div className="w-full h-full flex items-center justify-center">
        <div 
          ref={visualizationRef} 
          className="bg-white rounded-lg shadow-lg overflow-hidden w-full h-full p-6"
        />
      </div>
      
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* 错误提示 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-md">
            <div className="text-red-500 font-mono text-sm whitespace-pre-wrap">
              {error}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}); 