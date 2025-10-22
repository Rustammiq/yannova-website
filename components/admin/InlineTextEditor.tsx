'use client';

import { useState, useRef, useEffect } from 'react';
import { useAdmin } from '@/lib/adminContext';
import { Edit2, Save, X, Loader2 } from 'lucide-react';

interface InlineTextEditorProps {
  value: string;
  onSave: (newValue: string) => Promise<void>;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
  fieldName?: string;
}

export default function InlineTextEditor({
  value,
  onSave,
  className = '',
  placeholder = 'Tekst bewerken...',
  multiline = false,
  maxLength,
  fieldName = 'tekst'
}: InlineTextEditorProps) {
  const { isAdmin, isEditing } = useAdmin();
  const [isEditingField, setIsEditingField] = useState(false);
  const [editValue, setEditValue] = useState(value || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditingField && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingField]);

  const handleStartEdit = () => {
    if (isAdmin && isEditing) {
      setIsEditingField(true);
      setError(null);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditingField(false);
    setError(null);
  };

  const handleSave = async () => {
    if (editValue.trim() === value.trim()) {
      setIsEditingField(false);
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await onSave(editValue.trim());
      setIsEditingField(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een fout opgetreden');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isAdmin || !isEditing) {
    return <span className={className}>{value || placeholder}</span>;
  }

  if (isEditingField) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} border-2 border-yannova-primary rounded-lg p-2 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-yannova-primary/20`}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} border-2 border-yannova-primary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yannova-primary/20`}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        )}
        
        {error && (
          <div className="text-red-500 text-sm mt-1">{error}</div>
        )}

        <div className="absolute -top-10 right-0 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          {fieldName} bewerken
        </div>

        <div className="flex gap-1 mt-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Save className="w-3 h-3" />
            )}
            Opslaan
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 disabled:opacity-50"
          >
            <X className="w-3 h-3" />
            Annuleren
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <span className={`${className} ${isEditing ? 'hover:bg-yannova-primary/10 rounded px-1 py-0.5 cursor-pointer' : ''}`}>
        {value}
      </span>
      
      {isEditing && (
        <button
          onClick={handleStartEdit}
          className="absolute -top-1 -right-1 bg-yannova-primary text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yannova-primary/80"
          title={`${fieldName} bewerken`}
        >
          <Edit2 className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
