/**
 * TideViewer Component Tests
 */

import { render, screen, waitFor } from '@testing-library/react';
import { TideViewer } from '../../../src/components/tide/TideViewer';

// Mock the tide data module
jest.mock('../../../src/data/tides', () => ({
  getTideData: jest.fn()
}));

import { getTideData } from '../../../src/data/tides';
const mockGetTideData = getTideData as jest.MockedFunction<typeof getTideData>;

describe('TideViewer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading state initially', () => {
    mockGetTideData.mockReturnValue(null);
    render(<TideViewer month={9} year={2025} />);
    
    expect(screen.getByText('Chargement des données de marée...')).toBeInTheDocument();
  });

  it('should display error message for invalid month/year', async () => {
    mockGetTideData.mockReturnValue(null);
    render(<TideViewer month={13} year={2025} />);
    
    await waitFor(() => {
      expect(screen.getByText('Aucune donnée disponible pour 13/2025')).toBeInTheDocument();
    });
  });

  it('should display tide data when available', async () => {
    const mockData = {
      year: 2025,
      month: 9,
      location: "La Rochelle, France",
      days: [
        {
          date: "2025-09-01",
          dayName: "LUN",
          dayNumber: 1,
          coefficient: 27,
          events: [
            { time: "05:05", height: 2.99, type: 'low' as const },
            { time: "12:27", height: 4.53, type: 'high' as const }
          ]
        }
      ]
    };
    
    mockGetTideData.mockReturnValue(mockData);
    render(<TideViewer month={9} year={2025} />);
    
    await waitFor(() => {
      expect(screen.getByText('Marées de Septembre 2025')).toBeInTheDocument();
      expect(screen.getByText('La Rochelle, France')).toBeInTheDocument();
    });
  });

  it('should render control buttons', async () => {
    const mockData = {
      year: 2025,
      month: 9,
      location: "La Rochelle, France",
      days: []
    };
    
    mockGetTideData.mockReturnValue(mockData);
    render(<TideViewer month={9} year={2025} />);
    
    await waitFor(() => {
      expect(screen.getByText('Format: 24h')).toBeInTheDocument();
      expect(screen.getByText('Unité: m')).toBeInTheDocument();
      expect(screen.getByText('Masquer types')).toBeInTheDocument(); // Default is true, so shows "Masquer"
    });
  });
});
