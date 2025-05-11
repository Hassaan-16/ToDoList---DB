import React, { useState, useEffect } from 'react';
import { getTasksDeadline } from '../api/index';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState('No boards selected');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    getTasksDeadline('defaultUserId') // Replace with a default or static user ID if needed
      .then((response) => {
        const deadlines = response.data.map((item: any) => ({
          title: item.title,
          start: item.dueDate,
          description: item.description,
        }));
        setEvents(deadlines);
        setSuccess('Tasks loaded successfully!');
        setError(null);
      })
      .catch(() => {
        setError('Failed to load tasks. Please try again later.');
        setSuccess(null);
      });
  }, []);

  const handleEventClick = (clickInfo: any) => {
    setSelectedDescription(clickInfo.event.extendedProps.description || 'No description available');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-md p-3 text-sm">
            {success}
          </div>
        )}
        <div className="px-4 py-6 sm:px-0 bg-gray-100 rounded-md">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay',
            }}
          />
        </div>
        <div className="mt-6 p-4 bg-gray-200 rounded-md">
          <h2 className="text-lg font-semibold">Details</h2>
          <p className="text-gray-700 mt-2">{selectedDescription}</p>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
