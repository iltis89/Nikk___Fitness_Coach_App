'use client';

import React, { useState } from 'react';
import { PlusIcon, XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/utils/dateFormatters';

interface Supplement {
  name: string;
  startDate: string;
}

interface EditableSupplementsProps {
  supplements: Supplement[];
  onSave: (supplements: Supplement[]) => Promise<void>;
  className?: string;
  isEditing: boolean;
  onEditingChange: (isEditing: boolean) => void;
}

export function EditableSupplements({
  supplements,
  onSave,
  className = '',
  isEditing,
  onEditingChange,
}: EditableSupplementsProps) {
  const [localSupplements, setLocalSupplements] = useState(supplements);
  const [newSupplement, setNewSupplement] = useState({ name: '', startDate: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddSupplement = () => {
    if (newSupplement.name.trim() && newSupplement.startDate) {
      setLocalSupplements([...localSupplements, { ...newSupplement }]);
      setNewSupplement({ name: '', startDate: '' });
    }
  };

  const handleRemoveSupplement = (index: number) => {
    setLocalSupplements(localSupplements.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await onSave(localSupplements);
      onEditingChange(false);
    } catch (err) {
      setError('Fehler beim Speichern');
      console.error('Error saving supplements:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setLocalSupplements(supplements);
    setNewSupplement({ name: '', startDate: '' });
    setError(null);
    onEditingChange(false);
  };

  if (!isEditing) {
    return (
      <div className={`mt-4 ${className}`}>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Supplements</h3>
        <div 
          className="space-y-2 cursor-pointer group"
          onClick={() => onEditingChange(true)}
        >
          {supplements.length > 0 ? (
            supplements.map((supplement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-gray-700 rounded-md">
                    <svg className="h-4 w-4 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{supplement.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>Seit {formatDate(supplement.startDate, 'long')}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg group-hover:border-primary-400 dark:group-hover:border-primary-500">
              <p className="text-sm text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                Klicken zum Hinzufügen von Supplements
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`mt-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Supplements</h3>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium disabled:opacity-50"
          >
            Speichern
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium disabled:opacity-50"
          >
            Abbrechen
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-2">
          {localSupplements.map((supplement, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-md">
                  <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">{supplement.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>{formatDate(supplement.startDate, 'long')}</span>
                </div>
                <button
                  onClick={() => handleRemoveSupplement(index)}
                  className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-colors"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-primary-50 dark:bg-primary-950/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={newSupplement.name}
              onChange={(e) => setNewSupplement({ ...newSupplement, name: e.target.value })}
              placeholder="Supplement Name"
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
              disabled={isLoading}
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={newSupplement.startDate}
                onChange={(e) => setNewSupplement({ ...newSupplement, startDate: e.target.value })}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                disabled={isLoading}
              />
              <button
                onClick={handleAddSupplement}
                disabled={isLoading || !newSupplement.name.trim() || !newSupplement.startDate}
                className="px-3 py-2 bg-primary-600 dark:bg-primary-500 text-white dark:text-gray-900 rounded-md hover:bg-primary-700 dark:hover:bg-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}