"use client";

import { useEffect, useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  ComposedChart,
  Area,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { getI18nText } from "@/i18n";

interface Contribution {
  date: string;
  commitCount: number;
  additions: number;
  deletions: number;
}

interface GitHubHeatmapContent {
  title: string;
  controls: {
    chartType: {
      line: string;
      bar: string;
    };
    timeGroup: {
      day: string;
      week: string;
      month: string;
      year: string;
    };
  };
}

type TimeGroup = "day" | "week" | "month" | "year";

export default function GitHubHeatmapPage() {
  const { language } = useLanguage();
  const content = getI18nText<GitHubHeatmapContent>(language, 'visualizations.githubHeatmap');
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [timeGroup, setTimeGroup] = useState<TimeGroup>("day");

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(`/api/github?username=thinkinbig`);
        if (!response.ok) {
          throw new Error("Failed to fetch contributions");
        }
        const data = await response.json();
        setContributions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const groupDataByTime = (
    data: Contribution[],
    group: TimeGroup
  ): Contribution[] => {
    const grouped = new Map<string, Contribution>();

    data.forEach((item) => {
      const date = new Date(item.date);
      let key: string;

      switch (group) {
        case "week":
          const week = Math.floor(date.getDate() / 7);
          key = `${date.getFullYear()}-${date.getMonth() + 1}-W${week + 1}`;
          break;
        case "month":
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          break;
        case "year":
          key = `${date.getFullYear()}`;
          break;
        default:
          key = item.date;
      }

      if (!grouped.has(key)) {
        grouped.set(key, {
          date: key,
          commitCount: 0,
          additions: 0,
          deletions: 0,
        });
      }

      const current = grouped.get(key)!;
      current.commitCount += item.commitCount;
      current.additions += item.additions;
      current.deletions += item.deletions;
    });

    return Array.from(grouped.values()).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const groupedData = groupDataByTime(contributions, timeGroup);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-12 text-center">{content.title}</h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md w-40">
            <button
              onClick={() => setTimeGroup("day")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                timeGroup === "day" 
                  ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              }`}
            >
              {content.controls.timeGroup.day}
            </button>
            <button
              onClick={() => setTimeGroup("week")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                timeGroup === "week" 
                  ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              }`}
            >
              {content.controls.timeGroup.week}
            </button>
            <button
              onClick={() => setTimeGroup("month")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                timeGroup === "month" 
                  ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              }`}
            >
              {content.controls.timeGroup.month}
            </button>
            <button
              onClick={() => setTimeGroup("year")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                timeGroup === "year" 
                  ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              }`}
            >
              {content.controls.timeGroup.year}
            </button>
          </div>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div className="w-full md:w-auto">
                <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <button
                    onClick={() => setChartType("line")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      chartType === "line" 
                        ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm" 
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                    }`}
                  >
                    {content.controls.chartType.line}
                  </button>
                  <button
                    onClick={() => setChartType("bar")}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      chartType === "bar" 
                        ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm" 
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                    }`}
                  >
                    {content.controls.chartType.bar}
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <div className="min-w-[800px]">
                {chartType === "line" ? (
                  <ComposedChart width={800} height={400} data={groupedData}>
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: '#6B7280' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      className="dark:fill-gray-300 dark:stroke-gray-600"
                    />
                    <YAxis 
                      yAxisId="left" 
                      tick={{ fill: '#6B7280' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      className="dark:fill-gray-300 dark:stroke-gray-600"
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      tick={{ fill: '#6B7280' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      className="dark:fill-gray-300 dark:stroke-gray-600"
                    />
                    <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" className="dark:stroke-gray-600" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      wrapperClassName="dark:bg-gray-800"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="commitCount"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={false}
                      name="Commits"
                      className="dark:stroke-blue-400"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="additions"
                      stackId="1"
                      fill="#10B981"
                      stroke="#059669"
                      name="Additions"
                      className="dark:fill-green-400 dark:stroke-green-600"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="deletions"
                      stackId="1"
                      fill="#EF4444"
                      stroke="#DC2626"
                      name="Deletions"
                      className="dark:fill-red-400 dark:stroke-red-600"
                    />
                  </ComposedChart>
                ) : (
                  <ComposedChart width={800} height={400} data={groupedData}>
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: '#6B7280' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      className="dark:fill-gray-300 dark:stroke-gray-600"
                    />
                    <YAxis 
                      yAxisId="left" 
                      tick={{ fill: '#6B7280' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      className="dark:fill-gray-300 dark:stroke-gray-600"
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      tick={{ fill: '#6B7280' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      className="dark:fill-gray-300 dark:stroke-gray-600"
                    />
                    <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" className="dark:stroke-gray-600" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      wrapperClassName="dark:bg-gray-800"
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="commitCount"
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                      name="Commits"
                      className="dark:fill-blue-400"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="additions"
                      stackId="1"
                      fill="#10B981"
                      stroke="#059669"
                      name="Additions"
                      className="dark:fill-green-400 dark:stroke-green-600"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="deletions"
                      stackId="1"
                      fill="#EF4444"
                      stroke="#DC2626"
                      name="Deletions"
                      className="dark:fill-red-400 dark:stroke-red-600"
                    />
                  </ComposedChart>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
