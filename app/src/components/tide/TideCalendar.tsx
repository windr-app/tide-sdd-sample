/**
 * TideCalendar Component
 * Displays monthly tide data in calendar format
 */

import { useState } from 'react';
import { MonthTides, DayTides, TideDisplayOptions } from '@/types/tide';
import { cn } from '@/lib/utils';
import { TideDayCard } from './TideDayCard';

interface TideCalendarProps {
  monthData: MonthTides;
  displayOptions?: TideDisplayOptions;
  onDaySelect?: (day: DayTides) => void;
  className?: string;
}

const defaultDisplayOptions: TideDisplayOptions = {
  timeFormat: '24h',
  heightUnit: 'm',
  showTideType: true
};

const monthNames = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export function TideCalendar({
  monthData,
  displayOptions = defaultDisplayOptions,
  onDaySelect,
  className
}: TideCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleDaySelect = (day: DayTides) => {
    setSelectedDay(day.date);
    onDaySelect?.(day);
  };

  const monthName = monthNames[monthData.month - 1];

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Marées de {monthName} {monthData.year}
        </h1>
        <p className="text-lg text-gray-600">
          {monthData.location}
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {monthData.days.map((day) => (
          <TideDayCard
            key={day.date}
            dayData={day}
            displayOptions={displayOptions}
            isSelected={selectedDay === day.date}
            onClick={() => handleDaySelect(day)}
            className="h-fit"
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3">Légende</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">Types de marées</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-50 border border-blue-200"></div>
                <span>Marée haute (≥ 4.0m)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-50 border border-orange-200"></div>
                <span>Marée basse (&lt; 4.0m)</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Coefficients</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-50 border border-red-200"></div>
                <span>95+ Très fort</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-50 border border-orange-200"></div>
                <span>70-94 Fort</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-50 border border-blue-200"></div>
                <span>45-69 Moyen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-50 border border-gray-200"></div>
                <span>20-44 Faible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
