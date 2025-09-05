/**
 * TideDayCard Component
 * Displays tide information for a single day
 */

import { DayTides, TideDisplayOptions } from '@/types/tide';
import { getCoefficientInfo, sortTideEvents, cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TideEventDisplay } from './TideEventDisplay';

interface TideDayCardProps {
  dayData: DayTides;
  displayOptions?: TideDisplayOptions;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const defaultDisplayOptions: TideDisplayOptions = {
  timeFormat: '24h',
  heightUnit: 'm',
  showTideType: true
};

export function TideDayCard({
  dayData,
  displayOptions = defaultDisplayOptions,
  isSelected = false,
  onClick,
  className
}: TideDayCardProps) {
  const sortedEvents = sortTideEvents(dayData.events);
  const coefficientInfo = getCoefficientInfo(dayData.coefficient);
  const hasEveningCoefficient = dayData.eveningCoefficient && 
    dayData.eveningCoefficient !== dayData.coefficient;

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-md cursor-pointer",
        isSelected && "ring-2 ring-blue-500 shadow-lg",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">
              {dayData.dayName} {dayData.dayNumber}
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={cn("text-xs", coefficientInfo.color)}>
              {dayData.coefficient}
            </Badge>
            {hasEveningCoefficient && (
              <Badge className={cn("text-xs", getCoefficientInfo(dayData.eveningCoefficient!).color)}>
                {dayData.eveningCoefficient}
              </Badge>
            )}
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          {coefficientInfo.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          {sortedEvents.map((event, index) => (
            <TideEventDisplay
              key={`${event.time}-${index}`}
              event={event}
              displayOptions={displayOptions}
              showType={displayOptions.showTideType}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
