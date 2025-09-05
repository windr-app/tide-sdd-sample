/**
 * TideViewer Component
 * Main container that orchestrates tide data display
 */

'use client';

import { useState, useEffect } from 'react';
import { MonthTides, TideDisplayOptions } from '@/types/tide';
import { getTideData } from '@/data/tides';
import { cn } from '@/lib/utils';
import { TideCalendar } from './TideCalendar';
import { Button } from '@/components/ui/button';

interface TideViewerProps {
  month: number;
  year: number;
  className?: string;
}

export function TideViewer({ month, year, className }: TideViewerProps) {
  const [monthData, setMonthData] = useState<MonthTides | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayOptions, setDisplayOptions] = useState<TideDisplayOptions>({
    timeFormat: '24h',
    heightUnit: 'm',
    showTideType: true
  });

  useEffect(() => {
    const loadTideData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const data = getTideData(month, year);
        
        if (!data) {
          setError(`Aucune donnée disponible pour ${month}/${year}`);
          setMonthData(null);
        } else {
          setMonthData(data);
        }
      } catch (err) {
        setError('Erreur lors du chargement des données de marée');
        setMonthData(null);
      } finally {
        setLoading(false);
      }
    };

    loadTideData();
  }, [month, year]);

  const toggleTimeFormat = () => {
    setDisplayOptions(prev => ({
      ...prev,
      timeFormat: prev.timeFormat === '24h' ? '12h' : '24h'
    }));
  };

  const toggleHeightUnit = () => {
    setDisplayOptions(prev => ({
      ...prev,
      heightUnit: prev.heightUnit === 'm' ? 'ft' : 'm'
    }));
  };

  const toggleTideType = () => {
    setDisplayOptions(prev => ({
      ...prev,
      showTideType: !prev.showTideType
    }));
  };

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center min-h-[400px]", className)}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des données de marée...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("flex items-center justify-center min-h-[400px]", className)}>
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Erreur de chargement
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (!monthData) {
    return (
      <div className={cn("flex items-center justify-center min-h-[400px]", className)}>
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-4">📅</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Aucune donnée disponible
          </h2>
          <p className="text-gray-600">
            Les données de marée ne sont pas disponibles pour cette période.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTimeFormat}
        >
          Format: {displayOptions.timeFormat}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleHeightUnit}
        >
          Unité: {displayOptions.heightUnit}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTideType}
        >
          {displayOptions.showTideType ? 'Masquer' : 'Afficher'} types
        </Button>
      </div>

      {/* Calendar */}
      <TideCalendar
        monthData={monthData}
        displayOptions={displayOptions}
        onDaySelect={(day) => {
          console.log('Jour sélectionné:', day);
        }}
      />
    </div>
  );
}
