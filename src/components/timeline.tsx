import React from 'react';

interface TimelineEvent {
  date: string;
  event: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="timeline">
      {events.map((event, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-date">{event.date}</div>
          <div className="timeline-event">{event.event}</div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
