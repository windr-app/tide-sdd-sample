/**
 * TideDayCard Component Tests
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { TideDayCard } from '@/components/tide/TideDayCard';
import { DayTides } from '@/types/tide';

describe('TideDayCard', () => {
  const mockDayData: DayTides = {
    date: '2025-09-02',
    dayName: 'MAR',
    dayNumber: 2,
    coefficient: 24,
    eveningCoefficient: 24,
    events: [
      { time: '06:21', height: 3.18, type: 'low' },
      { time: '01:19', height: 4.39, type: 'high' },
      { time: '19:11', height: 3.06, type: 'low' },
      { time: '13:52', height: 4.69, type: 'high' }
    ]
  };

  it('should display day name and number', () => {
    render(<TideDayCard dayData={mockDayData} />);
    
    expect(screen.getByText('MAR 2')).toBeInTheDocument();
  });

  it('should display morning coefficient', () => {
    render(<TideDayCard dayData={mockDayData} />);
    
    expect(screen.getByText('24')).toBeInTheDocument();
  });

  it('should display evening coefficient when different', () => {
    render(<TideDayCard dayData={mockDayData} />);
    
    // Since evening coefficient is same as morning (24), should only show one badge
    const coefficientBadges = screen.getAllByText('24');
    expect(coefficientBadges).toHaveLength(1);
  });

  it('should render all tide events', () => {
    render(<TideDayCard dayData={mockDayData} />);
    
    // Check that all 4 tide times are present
    expect(screen.getByText('01:19')).toBeInTheDocument();
    expect(screen.getByText('06:21')).toBeInTheDocument();
    expect(screen.getByText('13:52')).toBeInTheDocument();
    expect(screen.getByText('19:11')).toBeInTheDocument();
  });

  it('should sort tide events by time', () => {
    render(<TideDayCard dayData={mockDayData} />);
    
    const tideEvents = screen.getAllByText(/\d{2}:\d{2}/);
    const times = tideEvents.map(el => el.textContent);
    
    // Events should be sorted chronologically
    expect(times[0]).toBe('01:19');
    expect(times[1]).toBe('06:21');
    expect(times[2]).toBe('13:52');
    expect(times[3]).toBe('19:11');
  });

  it('should call onClick when card is clicked', () => {
    const mockOnClick = jest.fn();
    render(<TideDayCard dayData={mockDayData} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should apply selection styling when selected', () => {
    const { container } = render(<TideDayCard dayData={mockDayData} isSelected={true} />);
    
    const card = container.querySelector('[class*="ring-2"]');
    expect(card).toBeInTheDocument();
  });

  it('should display coefficient description', () => {
    render(<TideDayCard dayData={mockDayData} />);
    
    // For coefficient 24, should show "Marées de morte-eau"
    expect(screen.getByText('Marées de morte-eau')).toBeInTheDocument();
  });

  it('should only show one coefficient when evening coefficient is same as morning', () => {
    const singleCoefficientData: DayTides = {
      ...mockDayData,
      eveningCoefficient: 24 // Same as morning coefficient
    };
    
    render(<TideDayCard dayData={singleCoefficientData} />);
    
    const coefficientBadges = screen.getAllByText('24');
    expect(coefficientBadges).toHaveLength(1); // Only shows one when they're the same
  });

  it('should show different evening coefficient when different from morning', () => {
    const differentCoefficientData: DayTides = {
      ...mockDayData,
      eveningCoefficient: 30 // Different from morning coefficient
    };
    
    render(<TideDayCard dayData={differentCoefficientData} />);
    
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });
});
