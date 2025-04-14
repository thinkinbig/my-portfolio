import React, { useCallback, useMemo, useRef } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { ReactCalendarHeatmapValue, TooltipDataAttrs } from 'react-calendar-heatmap';
import { Contribution } from '@/types/github';
import './GitHubCalendar.css';

interface GitHubCalendarProps {
  contributions: Contribution[];
  onCellHover?: (value: ReactCalendarHeatmapValue<string> | null) => void;
}

const GitHubCalendar = React.memo(({ contributions, onCellHover }: GitHubCalendarProps) => {

  const getClassForValue = (value: ReactCalendarHeatmapValue<string> | undefined) => {
    if (!value) {
      return 'color-empty';
    }
    const count = value.count || 0;
    if (count === 0) {
      return 'color-empty';
    }
    if (count <= 3) {
      return 'color-scale-1';
    }
    if (count <= 6) {
      return 'color-scale-2';
    }
    if (count <= 9) {
      return 'color-scale-3';
    }
    return 'color-scale-4';
  };

  const getTooltipDataAttrs = (value: ReactCalendarHeatmapValue<string> | undefined): TooltipDataAttrs => {
    if (!value) {
      return { 'data-tip': 'No contributions' } as TooltipDataAttrs;
    }
    return {
      'data-tip': `${value.date}: ${value.count || 0} commits`,
    } as TooltipDataAttrs;
  };

  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 6);

  const heatmapValues = useMemo(() => contributions.map(contribution => ({
    date: contribution.date,
    count: contribution.commitCount,
  })), [contributions]);

  // 用于存储 setTimeout ID 的 ref
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 使用 useCallback 记忆化事件处理函数
  const handleMouseOver = useCallback((_event: React.MouseEvent, value: ReactCalendarHeatmapValue<string> | undefined) => {
    // 清除之前的 timeout (如果有)
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    if (onCellHover && value) {
      // 设置一个新的 timeout，延迟触发 onCellHover
      hoverTimeoutRef.current = setTimeout(() => {
        onCellHover(value);
      }, 50); // 50毫秒延迟
    }
  }, [onCellHover]); // 依赖项是 onCellHover

  // 使用 useCallback 记忆化事件处理函数
  const handleMouseLeave = useCallback(() => {
    // 清除任何等待中的 hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    // 立即触发 onCellHover(null)
    if (onCellHover) {
      onCellHover(null);
    }
  }, [onCellHover]); // 依赖项是 onCellHover

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={heatmapValues}
        classForValue={getClassForValue}
        tooltipDataAttrs={getTooltipDataAttrs}
        showWeekdayLabels={true}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
});

GitHubCalendar.displayName = 'GitHubCalendar';

export default GitHubCalendar;