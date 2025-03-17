'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function WebIDEPreview() {
  const [showOutput, setShowOutput] = React.useState(false);
  const [currentLine, setCurrentLine] = React.useState(0);
  const [currentChar, setCurrentChar] = React.useState(0);
  
  const code = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

  const outputLines = [
    { content: '$ javac Main.java', delay: 500 },
    { content: '$ java Main', delay: 1000 },
    { content: 'Hello, World!', delay: 1500, className: 'text-green-400' }
  ];

  const handleRun = () => {
    setShowOutput(true);
    setCurrentLine(0);
    setCurrentChar(0);
    
    let totalDelay = 0;
    const charDelay = 50; // 每个字符的延迟

    outputLines.forEach((line, lineIndex) => {
      // 计算前一行完成打字需要的总时间
      const prevLineTypingTime = lineIndex > 0 
        ? outputLines[lineIndex - 1].content.length * charDelay 
        : 0;
      
      // 开始新行的时间 = 前一行的延迟 + 前一行打字的时间
      totalDelay += lineIndex > 0 ? outputLines[lineIndex - 1].delay + prevLineTypingTime : 0;

      setTimeout(() => {
        setCurrentLine(lineIndex);
        setCurrentChar(0);
      }, totalDelay);

      // 逐字打印当前行
      for (let charIndex = 0; charIndex <= line.content.length; charIndex++) {
        setTimeout(() => {
          setCurrentChar(charIndex);
        }, totalDelay + charIndex * charDelay);
      }
    });
  };

  const getDisplayText = (text: string, index: number) => {
    if (index !== currentLine) {
      return index < currentLine ? text : '';
    }
    return text.slice(0, currentChar);
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 p-2 sm:p-6 rounded-lg shadow-2xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4 px-4 py-2 bg-gray-800 rounded-t-lg border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-sm">Main.java</div>
      </div>

      <div className="flex flex-col sm:flex-row h-auto sm:h-[400px]">
        {/* Sidebar */}
        <div className="w-full sm:w-48 bg-gray-800 border-b sm:border-b-0 sm:border-r border-gray-700 p-2">
          <div className="flex items-center text-gray-400 text-sm mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Project Files
          </div>
          <div className="pl-4 text-gray-500 text-sm">
            <div className="p-1 hover:text-gray-300 cursor-pointer bg-primary/10 text-primary rounded">📄 Main.java</div>
            <div className="p-1 hover:text-gray-300 cursor-pointer">📄 Utils.java</div>
            <div className="p-1 hover:text-gray-300 cursor-pointer">📄 Config.java</div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 bg-gray-900 p-4 relative group min-h-[200px] sm:min-h-0">
          <SyntaxHighlighter
            language="java"
            style={vscDarkPlus}
            customStyle={{
              background: 'transparent',
              margin: 0,
              padding: '0.5em 0',
              height: '100%',
              fontSize: '14px',
              lineHeight: '21px',
              fontFamily: 'inherit'
            }}
            lineNumberStyle={{
              minWidth: '2.5em',
              paddingRight: '1em',
              color: '#666',
              userSelect: 'none',
            }}
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
          <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleRun}
              className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary rounded text-sm transition-colors"
            >
              Run ▶
            </button>
          </div>
        </div>

        {/* Terminal */}
        <div className="w-full sm:max-w-md bg-black p-2 border-t sm:border-t-0 sm:border-l border-gray-700 min-h-[150px] sm:min-h-0">
          <div className="flex justify-between items-center mb-2 text-gray-400 text-sm">
            <span>Terminal</span>
            <button 
              onClick={() => {
                setShowOutput(false);
                setCurrentLine(0);
                setCurrentChar(0);
              }}
              className="hover:text-gray-200"
            >
              ⟳
            </button>
          </div>
          <div className="text-gray-300 font-mono text-sm">
            {outputLines.map((line, index) => (
              <div
                key={index}
                className={`mb-1 transition-all duration-300 ${
                  showOutput
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2'
                } ${line.className || ''}`}
              >
                {getDisplayText(line.content, index)}
                {index === currentLine && (
                  <span className="animate-pulse">▋</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 