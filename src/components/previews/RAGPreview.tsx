'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function RAGPreview() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Hi! I'm your KIT lecture assistant. I can help you understand the lecture content. Try asking me about distributed systems, cloud computing, or any other course topics!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // 模拟检索和生成过程
  const simulateRAGProcess = async () => {
    setIsProcessing(true);
    
    // Step 1: Document Retrieval
    setActiveStep(1);
    await new Promise(r => setTimeout(r, 1000));
    
    // Step 2: Embedding Generation
    setActiveStep(2);
    await new Promise(r => setTimeout(r, 1000));
    
    // Step 3: Context Injection
    setActiveStep(3);
    await new Promise(r => setTimeout(r, 1000));
    
    // Step 4: Response Generation
    setActiveStep(4);
    await new Promise(r => setTimeout(r, 1000));
    
    setActiveStep(null);
    setIsProcessing(false);
    
    return "Based on the lecture slides, this concept involves distributed systems principles including consensus algorithms and fault tolerance mechanisms...";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: input }
    ];
    setMessages(newMessages);
    setInput('');

    const response = await simulateRAGProcess();
    setMessages([...newMessages, { role: 'assistant', content: response }]);
  };

  // 示例讲义内容
  const sampleSlide = (
    <div className="h-full flex flex-col text-sm">
      <div className="bg-primary/5 p-3 mb-3 rounded">
        <h4 className="font-medium text-primary mb-2">Distributed Systems</h4>
        <div className="text-xs text-secondary">Lecture 3: Consensus Algorithms</div>
      </div>
      
      <div className="flex-1 space-y-4 p-3">
        <h5 className="font-medium">Paxos Consensus</h5>
        <ul className="space-y-3 text-xs text-secondary">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
            <span>Safety: Only a single value is chosen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
            <span>Liveness: Some value is eventually chosen</span>
          </li>
        </ul>

        <div className="mt-6 aspect-[16/9] relative bg-foreground/5 rounded-lg overflow-hidden">
          <Image 
            src="/images/paxos-diagram.svg"
            alt="Paxos Diagram"
            fill
            className="object-contain p-4"
          />
        </div>

        <div className="text-xs text-secondary mt-4">
          Key Components:
          <ul className="ml-4 mt-2 space-y-2">
            <li>• Proposers</li>
            <li>• Acceptors</li>
            <li>• Learners</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Window Frame */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-foreground/10">
        {/* Window Header */}
        <div className="bg-background border-b border-foreground/10 p-4 flex items-center gap-4">
          {/* Window Controls */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          {/* Address Bar */}
          <div className="flex-1 flex items-center gap-2 px-4 py-1.5 bg-foreground/5 rounded-lg text-sm text-secondary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            <span>kit.edu/lecture-assistant</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          {/* Original RAGPreview content */}
          <div className="bg-primary/10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-semibold text-primary text-lg">KIT Lecture Assistant</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 p-8 bg-background">
            {/* Left Panel: Document View & Processing Steps */}
            <div className="col-span-5 space-y-6">
              {/* Document Preview */}
              <div className="bg-foreground/5 rounded-xl p-6 border border-foreground/10">
                <h3 className="text-base font-medium mb-4">Lecture Slides</h3>
                <div className="bg-foreground/5 rounded-lg border border-foreground/10 p-4">
                  <div className="h-full">
                    {activeStep === 1 ? (
                      <div className="h-full flex items-center justify-center animate-pulse text-sm text-secondary">
                        Retrieving relevant content...
                      </div>
                    ) : sampleSlide}
                  </div>
                </div>
              </div>

              {/* Processing Steps */}
              <div className="space-y-3">
                {[
                  { step: 1, label: "Document Retrieval" },
                  { step: 2, label: "Embedding Generation" },
                  { step: 3, label: "Context Injection" },
                  { step: 4, label: "Response Generation" }
                ].map(({ step, label }) => (
                  <div
                    key={step}
                    className={`p-4 rounded-lg border transition-colors ${
                      activeStep === step
                        ? 'bg-primary/10 border-primary/30'
                        : 'bg-foreground/5 border-foreground/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                        ${activeStep === step ? 'bg-primary/20' : 'bg-foreground/10'}`}>
                        {step}
                      </div>
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel: Chat Interface */}
            <div className="col-span-7 flex flex-col">
              {/* Messages */}
              <div className="flex-1 bg-foreground/5 rounded-xl p-6 border border-foreground/10 mb-6 min-h-[500px] max-h-[500px] overflow-y-auto">
                <div className="space-y-6">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.role === 'assistant' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0" />
                      <div className={`flex-1 p-4 rounded-xl ${
                        msg.role === 'assistant' ? 'bg-primary/10' : 'bg-foreground/10'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex gap-4 flex-row-reverse">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0" />
                      <div className="flex-1 p-4 rounded-xl bg-primary/10">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about the lecture content..."
                    className="w-full px-6 py-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:outline-none focus:border-primary/30 text-base"
                    disabled={isProcessing}
                  />
                  {!input && !isProcessing && (
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary animate-cursor" />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`px-6 py-3 rounded-xl transition-colors text-base font-medium ${
                    isProcessing
                      ? 'bg-foreground/10 text-foreground/50'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  Ask
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 