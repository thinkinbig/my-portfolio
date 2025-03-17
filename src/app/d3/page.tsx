import { D3Playground } from '@/components/previews/D3Playground';

export default function D3Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">D3.js 可视化练习场</h1>
        <p className="text-gray-300 mb-8">在这里，你可以实时编写和预览 D3.js 可视化效果。</p>
        <D3Playground />
      </div>
    </main>
  );
} 