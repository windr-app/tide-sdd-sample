/**
 * TideEventDisplay Component
 * Displays a single tide event with time, height, and type indicators
 */

import { TideEvent, TideDisplayOptions } from '@/types/tide';
import { formatTime, formatHeight, getTideTypeColor, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TideEventDisplayProps {
  event: TideEvent;
  displayOptions?: TideDisplayOptions;
  showType?: boolean;
  className?: string;
}

const defaultDisplayOptions: TideDisplayOptions = {
  timeFormat: '24h',
  heightUnit: 'm',
  showTideType: true
};

export function TideEventDisplay({
  event,
  displayOptions = defaultDisplayOptions,
  showType = true,
  className
}: TideEventDisplayProps) {
  const formattedTime = formatTime(event.time, displayOptions.timeFormat);
  const formattedHeight = formatHeight(event.height, displayOptions.heightUnit);
  const typeColor = getTideTypeColor(event.type);

  return (
    <div className={cn(
      "flex items-center justify-between p-2 rounded-md border",
      typeColor,
      className
    )}>
      <div className="flex flex-col">
        <span className="font-medium text-sm">
          {formattedTime}
        </span>
        <span className="text-xs opacity-75">
          {formattedHeight}
        </span>
      </div>
      
      {showType && displayOptions.showTideType && (
        <Badge 
          variant="secondary" 
          className={cn("text-xs", typeColor)}
        >
          {event.type === 'high' ? 'Haute' : 'Basse'}
        </Badge>
      )}
    </div>
  );
}
