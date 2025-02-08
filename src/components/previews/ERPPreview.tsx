'use client';

export function ERPPreview() {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-foreground/10">
      {/* Header Bar */}
      <div className="bg-primary/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <span className="font-semibold text-primary">ERP System Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-background">
        {/* Sidebar */}
        <div className="col-span-3 space-y-2">
          <div className="p-3 rounded bg-primary/5 text-primary hover:bg-primary/10 cursor-pointer transition-colors">
            Dashboard
          </div>
          <div className="p-3 rounded bg-primary/5 text-primary hover:bg-primary/10 cursor-pointer transition-colors">
            Production
          </div>
          <div className="p-3 rounded bg-primary/5 text-primary hover:bg-primary/10 cursor-pointer transition-colors">
            Inventory
          </div>
          <div className="p-3 rounded bg-primary/5 text-primary hover:bg-primary/10 cursor-pointer transition-colors">
            Reports
          </div>
        </div>

        {/* Main Area */}
        <div className="col-span-9 space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="text-sm text-blue-600 dark:text-blue-300">Total Orders</div>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-200">2,451</div>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="text-sm text-green-600 dark:text-green-300">Revenue</div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-200">$12,345</div>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <div className="text-sm text-purple-600 dark:text-purple-300">Products</div>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-200">847</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
            <h3 className="font-semibold mb-3">Recent Activity</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-secondary">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                New order #1234 received
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Inventory updated for SKU-789
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                Monthly report generated
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 