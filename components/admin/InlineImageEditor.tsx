'use client';

import { useState, useRef } from 'react';
import { useAdmin } from '@/lib/adminContext';
import { Edit2, Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface InlineImageEditorProps {
  src: string;
  alt: string;
  onSave: (newImage: File) => Promise<void>;
  className?: string;
  width?: number;
  height?: number;
  fieldName?: string;
  aspectRatio?: string;
}

export default function InlineImageEditor({
  src,
  alt,
  onSave,
  className = '',
  width = 400,
  height = 300,
  fieldName = 'afbeelding',
  aspectRatio = 'aspect-video'
}: InlineImageEditorProps) {
  const { isAdmin, isEditing } = useAdmin();
  const [isEditingField, setIsEditingField] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartEdit = () => {
    if (isAdmin && isEditing) {
      setIsEditingField(true);
      setError(null);
    }
  };

  const handleCancel = () => {
    setIsEditingField(false);
    setError(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validatie
      if (!file.type.startsWith('image/')) {
        setError('Selecteer een geldige afbeelding');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Afbeelding mag maximaal 5MB zijn');
        return;
      }

      // Preview maken
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError('Selecteer een afbeelding');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      await onSave(file);
      setIsEditingField(false);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is een fout opgetreden bij het uploaden');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAdmin || !isEditing) {
    return (
      <div className={`${className} ${aspectRatio} relative overflow-hidden rounded-lg`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (isEditingField) {
    return (
      <div className="relative group">
        <div className={`${className} ${aspectRatio} relative overflow-hidden rounded-lg border-2 border-yannova-primary`}>
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={width}
              height={height}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-1">{error}</div>
        )}

        <div className="mt-4 space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yannova-primary file:text-white hover:file:bg-yannova-primary/80"
            aria-label={`${fieldName} uploaden`}
            title={`Selecteer een ${fieldName} om te uploaden`}
          />
          
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isUploading || !preview}
              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {isUploading ? 'Uploaden...' : 'Uploaden'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isUploading}
              className="flex items-center gap-1 px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              Annuleren
            </button>
          </div>
        </div>

        <div className="absolute -top-10 right-0 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          {fieldName} bewerken
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className={`${className} ${aspectRatio} relative overflow-hidden rounded-lg`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
        />
      </div>
      
      <button
        onClick={handleStartEdit}
        className="absolute top-2 right-2 bg-yannova-primary text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yannova-primary/80"
        title={`${fieldName} bewerken`}
      >
        <Edit2 className="w-4 h-4" />
      </button>
    </div>
  );
}
