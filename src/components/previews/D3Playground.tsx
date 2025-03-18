'use client';

import React, { useCallback, useRef, useState } from 'react';
import * as d3 from 'd3';
import { CodeEditor } from './D3Components/CodeEditor';
import { VisualizationPreview } from './D3Components/VisualizationPreview';
import { ErrorBoundary } from './D3Components/ErrorBoundary';

export function D3Playground() {
  const visualizationRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVisualize = useCallback((code: string) => {
    if (!visualizationRef.current) return;

    try {
      setError(null);
      setIsLoading(true);

      const executeCode = new Function('d3', 'container', `
        try {
          d3.select(container).selectAll("*").remove();
          ${code}
        } catch (e) {
          throw new Error(e.message);
        }
      `);
      
      executeCode(d3, visualizationRef.current);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 p-2 sm:p-6 rounded-lg shadow-2xl">
      <div className="flex items-center justify-between mb-4 px-4 py-2 bg-gray-800 rounded-t-lg border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-sm">D3 Playground</div>
      </div>
      
      <div className="flex flex-col sm:flex-row h-auto sm:h-[600px] space-y-4 sm:space-y-0 sm:space-x-4">
        <CodeEditor onVisualize={handleVisualize} />
        <ErrorBoundary>
          <VisualizationPreview 
            error={error}
            isLoading={isLoading}
            visualizationRef={visualizationRef}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
} 