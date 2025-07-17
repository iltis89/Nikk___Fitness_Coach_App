'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => Promise<void>;
  type?: 'text' | 'email' | 'tel' | 'date';
  label?: string;
  placeholder?: string;
  className?: string;
  isEditing: boolean;
  onEditingChange: (isEditing: boolean) => void;
  multiline?: boolean;
  required?: boolean;
}

export function EditableField({
  value,
  onSave,
  type = 'text',
  label,
  placeholder,
  className = '',
  isEditing,
  onEditingChange,
  multiline = false,
  required = false,
}: EditableFieldProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSave = async () => {
    if (required && !localValue.trim()) {
      setError('Dieses Feld ist erforderlich');
      return;
    }

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
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditing) {
    return (
      <div className={`group ${className}`}>
        {label && <dt className="text-sm text-gray-600 dark:text-gray-400">{label}</dt>}
        <dd
          className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          onClick={() => onEditingChange(true)}
        >
          {value || <span className="text-gray-400 dark:text-gray-500 italic">{placeholder || 'Klicken zum Bearbeiten'}</span>}
        </dd>
      </div>
    );
  }

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={className}>
      {label && <dt className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</dt>}
      <dd className="flex items-start gap-2">
        <div className="flex-1">
          <InputComponent
            ref={inputRef as any}
            type={type}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full px-2 py-1 text-sm border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 ${
              error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
            } ${multiline ? 'min-h-[80px]' : ''}`}
            placeholder={placeholder}
            disabled={isLoading}
          />
          {error && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>}
        </div>
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