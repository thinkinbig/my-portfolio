'use client';

export function RAGPreview() {
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

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-background">
        {/* Document View */}
        <div className="col-span-6 space-y-4">
          <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
            <div className="text-sm text-secondary mb-2">Lecture Slide</div>
            <div className="aspect-video bg-foreground/10 rounded-lg"></div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="col-span-6 flex flex-col">
          <div className="flex-1 p-4 rounded-lg bg-foreground/5 border border-foreground/10 mb-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0"></div>
                <div className="flex-1 p-3 rounded-lg bg-background">
                  Can you explain the concept from slide 15?
                </div>
              </div>
              <div className="flex gap-2 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0"></div>
                <div className="flex-1 p-3 rounded-lg bg-primary/10">
                  Based on slide 15, the concept involves...
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Ask about the lecture content..."
              className="flex-1 px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/10 focus:outline-none focus:border-primary/30"
            />
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 