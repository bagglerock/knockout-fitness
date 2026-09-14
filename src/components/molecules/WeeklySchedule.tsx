import { useState } from 'react';
import days from '../../weekly-schedule.json';

function WeeklyClass({ value }: { value: string }) {
  const [start, end, ...name] = value.split(' - ');
  const needsConfirmation = start === '10:30 AM' && end === '11:00 PM';
  return (
    <li className="class-row">
      <span className="class-date">{start}</span>
      <div>
        <h3>{name.join(' - ')}</h3>
        <p>{needsConfirmation ? 'End time: please confirm with the gym' : `${start} – ${end}`}</p>
      </div>
      <span className="class-dot" aria-hidden="true" />
    </li>
  );
}
export function WeeklySchedule() {
  const [day, setDay] = useState('Monday');
  const selected = days.find((item) => item.day === day)!;
  return (
    <div className="weekly-schedule">
      <div className="day-selector" role="group" aria-label="Choose a day">
        {days.map((item) => (
          <button
            key={item.day}
            type="button"
            aria-pressed={day === item.day}
            onClick={() => setDay(item.day)}
          >
            {item.day.slice(0, 3)}
          </button>
        ))}
      </div>
      <h3 className="selected-day">{day}</h3>
      <ul className="weekly-classes">
        {selected.classes.map((value) => (
          <WeeklyClass key={value} value={value} />
        ))}
      </ul>
    </div>
  );
}
