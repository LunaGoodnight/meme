// components/MemeUploader.tsx
'use client';

import React, { useState, useRef } from 'react';
import {MemeService, MemeUploadResponse} from "@/app/meme";


interface MemeUploaderProps {
    onUploadSuccess?: (meme: MemeUploadResponse) => void;
    onUploadError?: (error: string) => void;
}

export const MemeUploader =({ onUploadSuccess, onUploadError }: MemeUploaderProps)=> {
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [keywords, setKeywords] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (file: File) => {
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            onUploadError?.('Only JPEG, PNG, GIF, and WebP images are allowed');
            return;
        }

        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            onUploadError?.('Image size cannot exceed 10MB');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleUpload = async () => {
        if (!fileInputRef.current?.files?.[0]) {
            onUploadError?.('Please select an image file');
            return;
        }

        setIsUploading(true);
        try {
            const file = fileInputRef.current.files[0];
            const result = await MemeService.uploadMeme(file, keywords);
            onUploadSuccess?.(result);

            // Reset form
            setPreviewUrl(null);
            setKeywords('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            onUploadError?.(error instanceof Error ? error.message : 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const clearPreview = () => {
        setPreviewUrl(null);
        setKeywords('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Upload Meme</h2>

            {/* File Drop Zone */}
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${previewUrl ? 'hidden' : 'block'}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2">
                    <div className="text-gray-500">
                        <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </div>
                    <div className="text-xs text-gray-500">
                        PNG, JPG, GIF, WebP up to 10MB
                    </div>
                </div>
            </div>

            {/* Image Preview */}
            {previewUrl && (
                <div className="space-y-4">
                    <div className="relative">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                            onClick={clearPreview}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                            ×
                        </button>
                    </div>

                    {/* Keywords Input */}
                    <div>
                        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
                            Keywords (optional)
                        </label>
                        <input
                            id="keywords"
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="funny, cat, meme (comma-separated, max 10)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Separate keywords with commas (maximum 10)
                        </p>
                    </div>

                    {/* Upload Button */}
                    <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Uploading...
                            </div>
                        ) : (
                            'Upload Meme'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}