'use client';

import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface EditableListProps {
  items: string[];
  onSave: (items: string[]) => Promise<void>;
  label: string;
  placeholder?: string;
  className?: string;
  isEditing: boolean;
  onEditingChange: (isEditing: boolean) => void;
  badgeColor?: 'primary' | 'warning' | 'success' | 'error';
}

export function EditableList({
  items,
  onSave,
  label,
  placeholder = 'Neuen Eintrag hinzufügen',
  className = '',
  isEditing,
  onEditingChange,
  badgeColor = 'primary',
}: EditableListProps) {
  const [localItems, setLocalItems] = useState(items);
  const [newItem, setNewItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddItem = () => {
    if (newItem.trim()) {
      setLocalItems([...localItems, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setLocalItems(localItems.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await onSave(localItems);
      onEditingChange(false);
    } catch (err) {
      setError('Fehler beim Speichern');
      console.error('Error saving list:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setLocalItems(items);
    setNewItem('');
    setError(null);
    onEditingChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditing) {
    return (
      <div className={`mt-4 ${className}`}>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
        <div 
          className="mt-2 flex flex-wrap gap-2 cursor-pointer group"
          onClick={() => onEditingChange(true)}
        >
          {items.length > 0 ? (
            items.map((item, index) => (
              <span key={index} className={badgeColor === 'primary' ? 'badge badge-primary' : badgeColor === 'success' ? 'badge badge-success' : badgeColor === 'warning' ? 'badge badge-warning' : badgeColor === 'error' ? 'badge badge-error' : 'badge badge-primary'}>
                {item}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400 dark:text-gray-500 italic group-hover:text-primary-600 dark:group-hover:text-primary-400">
              Klicken zum Hinzufügen
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`mt-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 disabled:opacity-50"
          >
            Speichern
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50"
          >
            Abbrechen
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {localItems.map((item, index) => (
            <span key={index} className={`${badgeColor === 'primary' ? 'badge badge-primary' : badgeColor === 'success' ? 'badge badge-success' : badgeColor === 'warning' ? 'badge badge-warning' : badgeColor === 'error' ? 'badge badge-error' : 'badge badge-primary'} flex items-center gap-1`}>
              {item}
              <button
                onClick={() => handleRemoveItem(index)}
                className="ml-1 hover:text-red-600 dark:hover:text-red-400"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            disabled={isLoading}
          />
          <button
            onClick={handleAddItem}
            disabled={isLoading || !newItem.trim()}
            className="p-1 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/20 rounded transition-colors disabled:opacity-50"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}