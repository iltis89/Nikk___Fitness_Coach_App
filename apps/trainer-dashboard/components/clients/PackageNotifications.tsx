import React, { useEffect, useState } from 'react';
import {
  XMarkIcon,
  ExclamationTriangleIcon,
  BellIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'expiring' | 'expired' | 'high_usage' | 'renewal';
  title: string;
  message: string;
  clientName: string;
  packageName: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'expiring',
    title: 'Paket läuft bald ab',
    message: 'Das Paket "10er Karte Personal Training" läuft in 7 Tagen ab.',
    clientName: 'Max Mustermann',
    packageName: '10er Karte Personal Training',
    timestamp: new Date(),
    read: false,
    actionUrl: '/clients/1',
  },
  {
    id: '2',
    type: 'high_usage',
    title: 'Hohe Paketnutzung',
    message: '90% des Pakets wurden bereits genutzt.',
    clientName: 'Anna Schmidt',
    packageName: 'Online Coaching Premium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    actionUrl: '/clients/2',
  },
  {
    id: '3',
    type: 'renewal',
    title: 'Paket erneuert',
    message: 'Das Paket wurde erfolgreich verlängert.',
    clientName: 'Tom Weber',
    packageName: 'Trainingsberatung Basic',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    actionUrl: '/clients/3',
  },
];

export default function PackageNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  useEffect(() => {
    // Simulate checking for new notifications every minute
    const interval = setInterval(() => {
      checkForExpiringPackages();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const checkForExpiringPackages = () => {
    // This would be replaced with an actual API call
    console.log('Checking for expiring packages...');
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'expiring':
      case 'expired':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />;
      case 'high_usage':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 dark:text-orange-400" />;
      case 'renewal':
        return <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />;
    }
  };
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `vor ${minutes} Minuten`;
    if (hours < 24) return `vor ${hours} Stunden`;
    return `vor ${days} Tagen`;
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      {showNotifications && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setShowNotifications(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-40">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Benachrichtigungen</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-2"
                >
                  Alle als gelesen markieren
                </button>
              )}
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  Keine Benachrichtigungen
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-primary-50/50 dark:bg-primary-900/20' : ''
                      }`}
                      onClick={() => {
                        markAsRead(notification.id);
                        if (notification.actionUrl) {
                          window.location.href = notification.actionUrl;
                        }
                      }}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.clientName} - {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="flex-shrink-0">
                            <div className="h-2 w-2 bg-primary-500 rounded-full" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowNotifications(false);
                  window.location.href = '/settings/notifications';
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Benachrichtigungseinstellungen →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}