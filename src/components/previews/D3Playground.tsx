'use client';

import React, { useCallback, useRef, useState } from 'react';
import * as d3 from 'd3';
import { HeaderBar } from './D3Components/HeaderBar';
import { CodeEditor } from './D3Components/CodeEditor';
import { VisualizationPreview } from './D3Components/VisualizationPreview';

export function D3Playground() {
  const visualizationRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVisualize = useCallback((code: string) => {
    if (!visualizationRef.current) return;

    try {
      setError(null);
      setIsLoading(true);
      const executeCode = new Function('d3', 'visualizationRef', `
        try {
          ${code}
        } catch (e) {
          throw e;
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
      <HeaderBar title="D3 Playground" />
      
      <div className="flex flex-col sm:flex-row h-auto sm:h-[600px] space-y-4 sm:space-y-0 sm:space-x-4">
        <CodeEditor onVisualize={handleVisualize} />
        <VisualizationPreview 
          error={error}
          isLoading={isLoading}
          visualizationRef={visualizationRef}
        />
      </div>
    </div>
  );
} 