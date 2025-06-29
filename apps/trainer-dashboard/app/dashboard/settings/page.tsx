'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  UserIcon,
  BuildingOfficeIcon,
  BellIcon,
  KeyIcon,
  CreditCardIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const tabs = [
  { name: 'Profil', icon: UserIcon },
  { name: 'Studio', icon: BuildingOfficeIcon },
  { name: 'Benachrichtigungen', icon: BellIcon },
  { name: 'Sicherheit', icon: KeyIcon },
  { name: 'Abrechnung', icon: CreditCardIcon },
  { name: 'Datenschutz', icon: ShieldCheckIcon },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profil');
  const [profileData, setProfileData] = useState({
    name: 'Nikk Viererbl',
    email: 'nikk@nv-coaching.de',
    phone: '+49 123 456789',
    bio: 'Personal Trainer mit Fokus auf wissenschaftlich fundiertes Training und individuelle Betreuung.',
    specializations: ['Muskelaufbau', 'Körperfettreduktion', 'Athletiktraining', 'YPSI Hautfaltenmessung'],
  });

  const [studioData, setStudioData] = useState({
    name: 'NV Coaching Studio',
    address: 'Musterstraße 123',
    city: 'München',
    zip: '80331',
    openingHours: {
      monday: { open: '07:00', close: '21:00' },
      tuesday: { open: '07:00', close: '21:00' },
      wednesday: { open: '07:00', close: '21:00' },
      thursday: { open: '07:00', close: '21:00' },
      friday: { open: '07:00', close: '20:00' },
      saturday: { open: '09:00', close: '18:00' },
      sunday: { open: 'Geschlossen', close: 'Geschlossen' },
    },
  });

  const [notifications, setNotifications] = useState({
    newAppointment: true,
    appointmentCancellation: true,
    newMessage: true,
    measurementReminder: true,
    weeklyReport: true,
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Einstellungen</h1>
        <p className="mt-1 text-sm text-gray-500">
          Verwalte dein Profil und deine Präferenzen
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.name
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          {activeTab === 'Profil' && (
            <div className="card">
              <div className="card-body">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Profil Informationen</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="label">Name</label>
                      <input
                        type="text"
                        className="input"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">E-Mail</label>
                      <input
                        type="email"
                        className="input"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">Telefon</label>
                      <input
                        type="tel"
                        className="input"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Über mich</label>
                    <textarea
                      className="input"
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">Spezialisierungen</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profileData.specializations.map((spec, index) => (
                        <span key={index} className="badge badge-primary">
                          {spec}
                        </span>
                      ))}
                      <button type="button" className="badge border-dashed border-gray-300 text-gray-600 hover:border-gray-400">
                        + Hinzufügen
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary">
                      Änderungen speichern
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'Studio' && (
            <div className="card">
              <div className="card-body">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Studio Informationen</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="label">Studio Name</label>
                      <input
                        type="text"
                        className="input"
                        value={studioData.name}
                        onChange={(e) => setStudioData({ ...studioData, name: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Adresse</label>
                      <input
                        type="text"
                        className="input"
                        value={studioData.address}
                        onChange={(e) => setStudioData({ ...studioData, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">Stadt</label>
                      <input
                        type="text"
                        className="input"
                        value={studioData.city}
                        onChange={(e) => setStudioData({ ...studioData, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">PLZ</label>
                      <input
                        type="text"
                        className="input"
                        value={studioData.zip}
                        onChange={(e) => setStudioData({ ...studioData, zip: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Öffnungszeiten</h3>
                    <div className="space-y-3">
                      {Object.entries(studioData.openingHours).map(([day, hours]) => (
                        <div key={day} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 capitalize w-32">
                            {day === 'monday' ? 'Montag' :
                             day === 'tuesday' ? 'Dienstag' :
                             day === 'wednesday' ? 'Mittwoch' :
                             day === 'thursday' ? 'Donnerstag' :
                             day === 'friday' ? 'Freitag' :
                             day === 'saturday' ? 'Samstag' : 'Sonntag'}
                          </span>
                          <div className="flex items-center space-x-2">
                            <input
                              type="time"
                              className="input w-32"
                              value={hours.open}
                              disabled={hours.open === 'Geschlossen'}
                            />
                            <span className="text-gray-500">-</span>
                            <input
                              type="time"
                              className="input w-32"
                              value={hours.close}
                              disabled={hours.close === 'Geschlossen'}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary">
                      Änderungen speichern
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'Benachrichtigungen' && (
            <div className="card">
              <div className="card-body">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Benachrichtigungseinstellungen</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Benachrichtigungstypen</h3>
                    <div className="space-y-3">
                      {Object.entries({
                        newAppointment: 'Neue Terminbuchung',
                        appointmentCancellation: 'Terminabsage',
                        newMessage: 'Neue Nachricht',
                        measurementReminder: 'Messung fällig',
                        weeklyReport: 'Wöchentlicher Bericht',
                      }).map(([key, label]) => (
                        <label key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{label}</span>
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            checked={notifications[key as keyof typeof notifications]}
                            onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Benachrichtigungskanäle</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">E-Mail Benachrichtigungen</span>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={notifications.emailNotifications}
                          onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Push-Benachrichtigungen</span>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          checked={notifications.pushNotifications}
                          onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary">
                      Einstellungen speichern
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Sicherheit' && (
            <div className="card">
              <div className="card-body">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Sicherheitseinstellungen</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Passwort ändern</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="label">Aktuelles Passwort</label>
                        <input type="password" className="input" />
                      </div>
                      <div>
                        <label className="label">Neues Passwort</label>
                        <input type="password" className="input" />
                      </div>
                      <div>
                        <label className="label">Neues Passwort bestätigen</label>
                        <input type="password" className="input" />
                      </div>
                      <Button type="submit" variant="primary">
                        Passwort ändern
                      </Button>
                    </form>
                  </div>
                  <div className="border-t pt-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Zwei-Faktor-Authentifizierung</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Erhöhe die Sicherheit deines Kontos mit Zwei-Faktor-Authentifizierung.
                    </p>
                    <Button variant="secondary">
                      2FA aktivieren
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}