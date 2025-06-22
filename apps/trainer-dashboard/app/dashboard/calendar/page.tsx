'use client';

import { useState } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  PlusIcon,
  ClockIcon,
  UserIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const appointments = [
  {
    id: 1,
    client: 'Max Mustermann',
    type: 'Training',
    date: '2024-01-22',
    time: '09:00',
    duration: 60,
    location: 'Studio',
    color: 'bg-primary-500',
  },
  {
    id: 2,
    client: 'Anna Schmidt',
    type: 'Messung',
    date: '2024-01-22',
    time: '10:30',
    duration: 30,
    location: 'Studio',
    color: 'bg-green-500',
  },
  {
    id: 3,
    client: 'Tom Weber',
    type: 'Beratung',
    date: '2024-01-22',
    time: '14:00',
    duration: 45,
    location: 'Online',
    color: 'bg-purple-500',
  },
  {
    id: 4,
    client: 'Lisa Müller',
    type: 'Training',
    date: '2024-01-22',
    time: '16:00',
    duration: 60,
    location: 'Studio',
    color: 'bg-primary-500',
  },
  {
    id: 5,
    client: 'Max Mustermann',
    type: 'Training',
    date: '2024-01-24',
    time: '09:00',
    duration: 60,
    location: 'Studio',
    color: 'bg-primary-500',
  },
];

const timeSlots = Array.from({ length: 13 }, (_, i) => {
  const hour = i + 7;
  return `${hour.toString().padStart(2, '0')}:00`;
});

const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const currentWeek = [
  { day: 'Mo', date: 22 },
  { day: 'Di', date: 23 },
  { day: 'Mi', date: 24 },
  { day: 'Do', date: 25 },
  { day: 'Fr', date: 26 },
  { day: 'Sa', date: 27 },
  { day: 'So', date: 28 },
];

export default function CalendarPage() {
  const [view, setView] = useState<'week' | 'month'>('week');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentForm, setAppointmentForm] = useState({
    client: '',
    type: '',
    date: '',
    time: '',
    duration: '60',
    location: 'Studio',
    notes: '',
  });

  const getAppointmentsForDay = (date: number) => {
    return appointments.filter(apt => parseInt(apt.date.split('-')[2]) === date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New appointment:', appointmentForm);
    setShowAppointmentForm(false);
    setAppointmentForm({
      client: '',
      type: '',
      date: '',
      time: '',
      duration: '60',
      location: 'Studio',
      notes: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Kalender</h1>
          <p className="mt-1 text-sm text-gray-500">
            Verwalte deine Termine und Trainingseinheiten
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex rounded-lg border border-gray-300">
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                view === 'week'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Woche
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                view === 'month'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Monat
            </button>
          </div>
          <button 
            onClick={() => setShowAppointmentForm(true)}
            className="btn-primary"
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            Neuer Termin
          </button>
        </div>
      </div>

      {showAppointmentForm && (
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Neuen Termin erstellen</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="label">Kunde</label>
                  <select 
                    className="input"
                    value={appointmentForm.client}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, client: e.target.value })}
                    required
                  >
                    <option value="">Kunde auswählen...</option>
                    <option value="1">Max Mustermann</option>
                    <option value="2">Anna Schmidt</option>
                    <option value="3">Tom Weber</option>
                    <option value="4">Lisa Müller</option>
                  </select>
                </div>
                <div>
                  <label className="label">Termintyp</label>
                  <select 
                    className="input"
                    value={appointmentForm.type}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, type: e.target.value })}
                    required
                  >
                    <option value="">Typ auswählen...</option>
                    <option value="training">Training</option>
                    <option value="measurement">Messung</option>
                    <option value="consultation">Beratung</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>
                <div>
                  <label className="label">Datum</label>
                  <input
                    type="date"
                    className="input"
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="label">Uhrzeit</label>
                  <input
                    type="time"
                    className="input"
                    value={appointmentForm.time}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="label">Dauer (Minuten)</label>
                  <select 
                    className="input"
                    value={appointmentForm.duration}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, duration: e.target.value })}
                  >
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                    <option value="120">120</option>
                  </select>
                </div>
                <div>
                  <label className="label">Ort</label>
                  <select 
                    className="input"
                    value={appointmentForm.location}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, location: e.target.value })}
                  >
                    <option value="Studio">Studio</option>
                    <option value="Online">Online</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Kunde">Beim Kunden</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Notizen (optional)</label>
                <textarea
                  className="input"
                  rows={3}
                  value={appointmentForm.notes}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                  placeholder="Zusätzliche Informationen..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAppointmentForm(false)}
                  className="btn-secondary"
                >
                  Abbrechen
                </button>
                <button type="submit" className="btn-primary">
                  Termin erstellen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">Januar 2024 - Woche 4</h2>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              Heute
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 gap-0 border-t border-l">
                <div className="border-r border-b p-2 bg-gray-50"></div>
                {currentWeek.map((day, index) => (
                  <div key={index} className="border-r border-b p-2 text-center bg-gray-50">
                    <p className="text-xs font-medium text-gray-600">{day.day}</p>
                    <p className={`text-sm font-semibold ${
                      day.date === 22 ? 'text-primary-600' : 'text-gray-900'
                    }`}>{day.date}</p>
                  </div>
                ))}
              </div>

              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 gap-0 border-l">
                  <div className="border-r border-b p-2 text-xs text-gray-500 bg-gray-50">
                    {time}
                  </div>
                  {currentWeek.map((day, index) => {
                    const dayAppointments = getAppointmentsForDay(day.date);
                    const appointment = dayAppointments.find(apt => apt.time === time);
                    
                    return (
                      <div key={index} className="border-r border-b p-1 min-h-[60px] relative hover:bg-gray-50">
                        {appointment && (
                          <div className={`${appointment.color} text-white rounded p-2 text-xs cursor-pointer hover:opacity-90 transition-opacity`}>
                            <p className="font-medium">{appointment.client}</p>
                            <p className="opacity-90">{appointment.type}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Heutige Termine</h3>
            <div className="space-y-3">
              {appointments.filter(apt => apt.date === '2024-01-22').map((appointment) => (
                <div key={appointment.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 ${appointment.color} rounded-full mt-2`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{appointment.client}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center">
                        <ClockIcon className="mr-1 h-3 w-3" />
                        {appointment.time} - {appointment.duration} Min
                      </span>
                      <span className="flex items-center">
                        <MapPinIcon className="mr-1 h-3 w-3" />
                        {appointment.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Verfügbarkeit diese Woche</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gebuchte Termine</span>
                <span className="font-medium text-gray-900">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Freie Slots</span>
                <span className="font-medium text-green-600">22</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Auslastung</span>
                <span className="font-medium text-gray-900">45%</span>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Nächste freie Termine</h3>
            <div className="space-y-2 text-sm">
              <button className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Heute, 11:30 - 12:30</p>
                <p className="text-xs text-gray-500">60 Minuten verfügbar</p>
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Heute, 17:30 - 19:00</p>
                <p className="text-xs text-gray-500">90 Minuten verfügbar</p>
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900">Morgen, 08:00 - 09:00</p>
                <p className="text-xs text-gray-500">60 Minuten verfügbar</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}