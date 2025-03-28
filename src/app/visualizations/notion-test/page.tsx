'use client';

import { useState, useEffect } from 'react';

export default function NotionTestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formattedData, setFormattedData] = useState<any>(null);

  const databaseId = '1bfc87ff7aa4803c831afbaef50af952';

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/notion?databaseId=${databaseId}&pageSize=10&sortBy=created_time&sortDirection=descending`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || '获取数据失败');
      }
      
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 格式化数据
  useEffect(() => {
    if (data?.results) {
      const formatted = data.results.map((item: any) => {
        const createdTime = item.properties['Created time']?.created_time 
          ? new Date(item.properties['Created time'].created_time).toLocaleString()
          : null;
        
        const lastUpdatedTime = item.properties['Last updated time']?.last_edited_time
          ? new Date(item.properties['Last updated time'].last_edited_time).toLocaleString()
          : null;

        return {
          ...item,
          formattedCreatedTime: createdTime,
          formattedLastUpdatedTime: lastUpdatedTime
        };
      });

      setFormattedData({
        ...data,
        results: formatted
      });
    }
  }, [data]);

  // 获取标题的辅助函数
  const getTitle = (properties: any) => {
    // 尝试不同的标题字段
    const titleFields = ['Term', 'Doc name', 'Name', '标题', 'Title'];
    for (const field of titleFields) {
      if (properties[field]?.title?.[0]?.plain_text) {
        return properties[field].title[0].plain_text;
      }
    }
    return '无标题';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notion API 测试</h1>
      
      <button
        onClick={fetchData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        disabled={loading}
      >
        {loading ? '加载中...' : '获取数据'}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          错误：{error}
        </div>
      )}

      {formattedData && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">查询结果</h2>
          <div className="space-y-4">
            {formattedData.results?.map((item: any) => (
              <div
                key={item.id}
                className="border dark:border-gray-700 rounded p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <h3 className="font-medium">
                  {getTitle(item.properties)}
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  {item.formattedCreatedTime && (
                    <p>创建时间：{item.formattedCreatedTime}</p>
                  )}
                  {item.formattedLastUpdatedTime && (
                    <p>最后更新：{item.formattedLastUpdatedTime}</p>
                  )}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block"
                >
                  在 Notion 中查看
                </a>
              </div>
            ))}
          </div>
          
          {formattedData.has_more && (
            <div className="mt-4 text-gray-500">
              还有更多结果...
            </div>
          )}
        </div>
      )}
    </div>
  );
} 