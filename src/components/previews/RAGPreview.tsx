'use client';

import { useState } from 'react';

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

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-foreground/10">
      {/* Header Bar */}
      <div className="bg-primary/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-semibold text-primary">KIT Lecture Assistant</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 p-6 bg-background">
        {/* Left Panel: Document View & Processing Steps */}
        <div className="col-span-5 space-y-4">
          {/* Document Preview */}
          <div className="bg-foreground/5 rounded-xl p-4 border border-foreground/10">
            <h3 className="text-sm font-medium mb-3">Lecture Slides</h3>
            <div className="aspect-[4/3] bg-foreground/5 rounded-lg border border-foreground/10 p-4">
              <div className="h-full flex items-center justify-center text-center text-sm text-secondary">
                {activeStep === 1 ? (
                  <div className="animate-pulse">Retrieving relevant content...</div>
                ) : "Sample lecture content..."}
              </div>
            </div>
          </div>

          {/* Processing Steps */}
          <div className="space-y-2">
            {[
              { step: 1, label: "Document Retrieval" },
              { step: 2, label: "Embedding Generation" },
              { step: 3, label: "Context Injection" },
              { step: 4, label: "Response Generation" }
            ].map(({ step, label }) => (
              <div
                key={step}
                className={`p-3 rounded-lg border transition-colors ${
                  activeStep === step
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-foreground/5 border-foreground/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                    ${activeStep === step ? 'bg-primary/20' : 'bg-foreground/10'}`}>
                    {step}
                  </div>
                  <span className="text-sm">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Chat Interface */}
        <div className="col-span-7 flex flex-col">
          {/* Messages */}
          <div className="flex-1 bg-foreground/5 rounded-xl p-4 border border-foreground/10 mb-4 min-h-[400px] max-h-[400px] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'assistant' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                  <div className={`flex-1 p-3 rounded-xl ${
                    msg.role === 'assistant' ? 'bg-primary/10' : 'bg-foreground/10'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                  <div className="flex-1 p-3 rounded-xl bg-primary/10">
                    <div className="flex gap-1">
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
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the lecture content..."
              className="flex-1 px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/10 focus:outline-none focus:border-primary/30"
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={isProcessing}
              className={`px-4 py-2 rounded-lg transition-colors ${
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
  );
} 