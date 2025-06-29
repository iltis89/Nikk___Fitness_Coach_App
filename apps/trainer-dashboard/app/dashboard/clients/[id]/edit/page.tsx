'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Input, Card } from '@/components/ui';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id;

  // TODO: Fetch client data from API
  const [formData, setFormData] = useState({
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max@example.com',
    phone: '+49 170 1234567',
    birthDate: '1985-06-15',
    address: 'Musterstraße 123',
    city: 'München',
    postalCode: '80331',
    notes: 'Rückenprobleme, Ziel: Muskelaufbau',
  });

  const [supplementInput, setSupplementInput] = useState('');
  const [supplementDate, setSupplementDate] = useState('');
  const [supplements, setSupplements] = useState<Array<{ name: string; date: string }>>([
    { name: 'Protein Pulver', date: '2024-01-01' },
    { name: 'Kreatin', date: '2024-01-15' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to update client
    console.log('Updating client:', clientId, formData);
    router.push(`/dashboard/clients/${clientId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSupplement = () => {
    if (supplementInput && supplementDate) {
      setSupplements([...supplements, { name: supplementInput, date: supplementDate }]);
      setSupplementInput('');
      setSupplementDate('');
    }
  };

  const removeSupplement = (index: number) => {
    setSupplements(supplements.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Zurück
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Kunde bearbeiten</h1>
        <p className="mt-2 text-sm text-gray-600">
          Aktualisieren Sie die Kundendaten
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Persönliche Daten</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Vorname"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Nachname"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            
            <Input
              label="E-Mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Telefon"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Geburtsdatum"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Adresse</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Straße und Hausnummer"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            
            <Input
              label="Stadt"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            
            <Input
              label="PLZ"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Supplements</h2>
          
          <div className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Input
                  label="Supplement Name"
                  placeholder="z.B. Protein Pulver, Kreatin, etc."
                  value={supplementInput}
                  onChange={(e) => setSupplementInput(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Startdatum"
                  type="date"
                  value={supplementDate}
                  onChange={(e) => setSupplementDate(e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={addSupplement}
                disabled={!supplementInput || !supplementDate}
              >
                Hinzufügen
              </Button>
            </div>
            
            {supplements.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Aktuelle Supplements:</p>
                {supplements.map((supplement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{supplement.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        seit {new Date(supplement.date).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSupplement(index)}
                      className="text-error-600 hover:text-error-700"
                    >
                      Entfernen
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Notizen</h2>
          
          <div className="space-y-1">
            <label className="label">Zusätzliche Informationen</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="input"
              placeholder="Gesundheitliche Einschränkungen, Ziele, etc."
            />
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Abbrechen
          </Button>
          <Button type="submit" variant="primary">
            Änderungen speichern
          </Button>
        </div>
      </form>
    </div>
  );
}