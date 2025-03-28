'use client';

import dynamic from 'next/dynamic';

// 动态导入组件以避免 SSR 问题
const KnowledgeGraphComponent = dynamic(
  () => import('./component/KnowledgeGraphComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="p-4">
        <div className="border rounded-lg p-4 bg-white h-[600px] flex items-center justify-center">
          <div className="text-gray-500">加载中...</div>
        </div>
      </div>
    ),
  }
);

export default function KnowledgeGraphPage() {
  return (
    <div className="container mx-auto p-4">
      <KnowledgeGraphComponent />
    </div>
  );
}
