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
    <div className="w-full sm:w-1/2 bg-white p-4 rounded-lg">
      <div className="text-gray-800 font-medium mb-2">预览</div>
      {error && (
        <div className="text-red-500 text-sm mb-2 p-2 bg-red-100 rounded">
          {error}
        </div>
      )}
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <div 
          id="visualization" 
          ref={visualizationRef}
          className="w-full h-full flex items-center justify-center"
        />
      </div>
    </div>
  );
}); 