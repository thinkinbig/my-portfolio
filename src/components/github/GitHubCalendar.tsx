import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { ReactCalendarHeatmapValue, TooltipDataAttrs } from 'react-calendar-heatmap';
import { Contribution } from '@/types/github';
import './GitHubCalendar.css';

interface GitHubCalendarProps {
  contributions: Contribution[];
}

export default function GitHubCalendar ({ contributions }: GitHubCalendarProps) {

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

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={contributions.map(contribution => ({
          date: contribution.date,
          count: contribution.commitCount,
        }))}
        classForValue={getClassForValue}
        tooltipDataAttrs={getTooltipDataAttrs}
        showWeekdayLabels={true}
      />
    </div>
  );
};