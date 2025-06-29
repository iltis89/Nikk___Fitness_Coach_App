import React from 'react';
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const activities = [
  { 
    id: 1, 
    type: 'measurement', 
    client: 'Max Mustermann', 
    action: 'Messung durchgeführt', 
    time: 'vor 2 Stunden',
    icon: ChartBarIcon,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  { 
    id: 2, 
    type: 'plan', 
    client: 'Anna Schmidt', 
    action: 'Neuer Trainingsplan erstellt', 
    time: 'vor 4 Stunden',
    icon: ClipboardDocumentListIcon,
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  { 
    id: 3, 
    type: 'appointment', 
    client: 'Tom Weber', 
    action: 'Termin bestätigt', 
    time: 'vor 5 Stunden',
    icon: CalendarDaysIcon,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  { 
    id: 4, 
    type: 'message', 
    client: 'Lisa Müller', 
    action: 'Nachricht erhalten', 
    time: 'gestern',
    icon: ChatBubbleLeftIcon,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
];

export default function RecentActivities() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Letzte Aktivitäten</h3>
        <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto scrollbar-hide">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="group flex items-center gap-4 p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer"
            tabIndex={0}
            role="article"
            aria-label={`${activity.client} - ${activity.action}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`p-3 rounded-xl ${activity.bg} group-hover:scale-110 transition-transform duration-200`}>
              <activity.icon className={`h-5 w-5 ${activity.color}`} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-primary-700 transition-colors">
                {activity.client}
              </p>
              <p className="text-xs text-gray-600 mt-0.5 truncate">
                {activity.action}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          Alle Aktivitäten anzeigen →
        </button>
      </div>
    </div>
  );
}