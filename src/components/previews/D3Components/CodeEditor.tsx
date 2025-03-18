'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { codeExamples } from './codeExamples';

interface CodeEditorProps {
  onVisualize: (code: string) => void;
  isLoading?: boolean;
}

export const CodeEditor = memo(function CodeEditor({ 
  onVisualize,
  isLoading 
}: CodeEditorProps) {
  const [code, setCode] = useState<string>(codeExamples.barChart.code);
  const [selectedExample, setSelectedExample] = useState<keyof typeof codeExamples>('barChart');

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      onVisualize(value);
    }
  }, [onVisualize]);

  const handleExampleChange = useCallback((example: keyof typeof codeExamples) => {
    setSelectedExample(example);
    setCode(codeExamples[example].code);
    onVisualize(codeExamples[example].code);
  }, [onVisualize]);

  useEffect(() => {
    // 初始化时运行一次
    onVisualize(code);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-gray-900 p-4 relative group min-h-[300px] sm:min-h-0 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <select 
          value={selectedExample}
          onChange={(e) => handleExampleChange(e.target.value as keyof typeof codeExamples)}
          className="bg-gray-800 text-gray-200 rounded px-2 py-1"
        >
          {Object.entries(codeExamples).map(([key, { name }]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
      </div>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: isLoading,
          automaticLayout: true
        }}
      />
    </div>
  );
}); 