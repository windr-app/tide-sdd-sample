# Tide Viewer - Technical Documentation

## Application Architecture

The Tide Viewer is a Next.js 15 application built with TypeScript and ShadCN UI components, providing an interactive interface for viewing tide information for La Rochelle, France.

## Key Features Demonstrated

### Interactive UI Components

![Application Overview](assets/01-main-page.png)

The application demonstrates several interactive features:

1. **Toggle Controls**: Format, unit, and display type toggles
2. **Clickable Cards**: Day selection with visual feedback
3. **Real-time Updates**: Instant state changes without page refresh
4. **Responsive Design**: Clean layout that works across devices

### State Management

The application manages multiple UI states:

- **Time Format**: 24-hour vs 12-hour display
- **Measurement Units**: Metric (meters) vs Imperial (feet)
- **Tide Type Display**: Show/hide tide type labels
- **Day Selection**: Track selected tide day

### Visual Feedback System

Each interactive element provides clear visual feedback:

#### Button Highlighting
![Format Button Highlighted](assets/02-format-button-highlighted.png)
*Red border and background highlight indicate interactive elements*

#### State Changes
![12h Format Active](assets/03-12h-format-active.png)
*Button labels update to reflect current state*

#### Unit Conversion
![Feet Units Active](assets/05-feet-units-active.png)
*Real-time conversion between measurement systems*

#### Simplified Display
![Types Hidden](assets/07-types-hidden.png)
*Toggle simplified view by hiding tide type labels*

#### Selection Feedback
![Day Card Selected](assets/09-day-card-selected.png)
*Selected elements maintain active state with visual distinction*

## Component Structure

### TideViewer
Main container component managing overall application state and layout.

### TideCalendar
Grid layout component organizing tide day cards in a calendar format.

### TideDayCard
Individual day component displaying:
- Date and day information
- Tide coefficient
- Tide events with times and heights
- Interactive selection capability

### TideEventDisplay
Component for individual tide events showing time, height, and type.

### Control Components
- Format toggle button
- Unit toggle button  
- Type display toggle button

## Data Flow

1. **Tide Data**: Static data structure containing tide information
2. **State Management**: React state for UI preferences and selections
3. **Event Handling**: Click handlers for toggles and day selection
4. **Real-time Updates**: Immediate UI updates based on user interactions

## User Experience Design

### Accessibility
- Clear visual hierarchy with headings and sections
- Interactive elements clearly marked with appropriate styling
- Responsive design for various screen sizes
- Intuitive icons and labels

### Usability
- Single-click toggles for common preferences
- Visual feedback for all interactions
- Persistent state during session
- Clear data organization and presentation

### Performance
- Fast state updates without page refresh
- Efficient component rendering
- Minimal external dependencies
- Optimized image assets

## Development Tools

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **ShadCN UI**: Modern component library
- **Tailwind CSS**: Utility-first styling
- **Playwright**: End-to-end testing and automation

## Testing Approach

The documentation includes comprehensive visual testing with:

- Screenshot capture of all major UI states
- Interactive element highlighting for clarity
- Step-by-step user flow documentation
- Visual regression testing capabilities

## Browser Compatibility

The application works with modern browsers supporting:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Modern DOM APIs
- Responsive design features

## Future Enhancements

Potential improvements could include:
- Real-time tide data integration
- User location detection
- Favorite locations
- Tide predictions and charts
- Mobile app version
- Offline functionality

---

*This technical documentation provides insights into the application architecture and user experience design of the Tide Viewer application.*
