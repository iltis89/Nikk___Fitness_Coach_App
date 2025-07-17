'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface EditableSelectProps {
  value: string;
  options: { value: string; label: string }[];
  onSave: (value: string) => Promise<void>;
  label?: string;
  placeholder?: string;
  className?: string;
  isEditing: boolean;
  onEditingChange: (isEditing: boolean) => void;
}

export function EditableSelect({
  value,
  options,
  onSave,
  label,
  placeholder,
  className = '',
  isEditing,
  onEditingChange,
}: EditableSelectProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (isEditing && selectRef.current) {
      selectRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await onSave(localValue);
      onEditingChange(false);
    } catch (err) {
      setError('Fehler beim Speichern');
      console.error('Error saving field:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setLocalValue(value);
    setError(null);
    onEditingChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const displayValue = options.find(opt => opt.value === value)?.label || value;

  if (!isEditing) {
    return (
      <div className={`group ${className}`}>
        {label && <dt className="text-sm text-gray-600 dark:text-gray-400">{label}</dt>}
        <dd
          className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          onClick={() => onEditingChange(true)}
        >
          {displayValue || <span className="text-gray-400 dark:text-gray-500 italic">{placeholder || 'Klicken zum Bearbeiten'}</span>}
        </dd>
      </div>
    );
  }

  return (
    <div className={className}>
      {label && <dt className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</dt>}
      <dd className="flex items-center gap-2">
        <select
          ref={selectRef}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`flex-1 px-2 py-1 text-sm border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 ${
            error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
          }`}
          disabled={isLoading}
        >
          <option value="">-- Bitte wählen --</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="flex gap-1">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="p-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors disabled:opacity-50"
            aria-label="Speichern"
          >
            <CheckIcon className="h-4 w-4" />
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
            aria-label="Abbrechen"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </dd>
    </div>
  );
}