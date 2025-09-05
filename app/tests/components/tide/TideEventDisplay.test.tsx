/**
 * TideEventDisplay Component Tests
 */

import { render, screen } from '@testing-library/react';
import { TideEventDisplay } from '@/components/tide/TideEventDisplay';
import { TideEvent } from '@/types/tide';

describe('TideEventDisplay', () => {
  const mockHighTideEvent: TideEvent = {
    time: '12:27',
    height: 4.53,
    type: 'high'
  };

  const mockLowTideEvent: TideEvent = {
    time: '17:42',
    height: 3.03,
    type: 'low'
  };

  it('should render tide event time correctly', () => {
    render(<TideEventDisplay event={mockHighTideEvent} />);
    
    expect(screen.getByText('12:27')).toBeInTheDocument();
  });

  it('should render tide event height correctly', () => {
    render(<TideEventDisplay event={mockHighTideEvent} />);
    
    expect(screen.getByText('4.53m')).toBeInTheDocument();
  });

  it('should show high tide type indicator', () => {
    render(<TideEventDisplay event={mockHighTideEvent} />);
    
    expect(screen.getByText('Haute')).toBeInTheDocument();
  });

  it('should show low tide type indicator', () => {
    render(<TideEventDisplay event={mockLowTideEvent} />);
    
    expect(screen.getByText('Basse')).toBeInTheDocument();
  });

  it('should apply high tide styling', () => {
    const { container } = render(<TideEventDisplay event={mockHighTideEvent} />);
    
    const element = container.firstChild;
    expect(element).toHaveClass('text-blue-600', 'bg-blue-50');
  });

  it('should apply low tide styling', () => {
    const { container } = render(<TideEventDisplay event={mockLowTideEvent} />);
    
    const element = container.firstChild;
    expect(element).toHaveClass('text-orange-600', 'bg-orange-50');
  });

  it('should hide type indicator when showType is false', () => {
    render(<TideEventDisplay event={mockHighTideEvent} showType={false} />);
    
    expect(screen.queryByText('Haute')).not.toBeInTheDocument();
  });

  it('should format time in 12h format when specified', () => {
    render(
      <TideEventDisplay 
        event={mockHighTideEvent} 
        displayOptions={{ timeFormat: '12h', heightUnit: 'm', showTideType: true }}
      />
    );
    
    expect(screen.getByText('12:27 PM')).toBeInTheDocument();
  });

  it('should format height in feet when specified', () => {
    render(
      <TideEventDisplay 
        event={mockHighTideEvent} 
        displayOptions={{ timeFormat: '24h', heightUnit: 'ft', showTideType: true }}
      />
    );
    
    expect(screen.getByText('14.9ft')).toBeInTheDocument();
  });
});
