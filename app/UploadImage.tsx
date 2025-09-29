// components/MemeUploader.tsx
"use client";
import { useRouter } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";
import { MemeService, MemeUploadResponse } from "@/app/meme";
import imageCompression from "browser-image-compression";

interface MemeUploaderProps {
  onUploadSuccess?: (meme: MemeUploadResponse) => void;
  onUploadError?: (error: string) => void;
}

export const MemeUploader = ({
  onUploadSuccess,
  onUploadError,
}: MemeUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [keywords, setKeywords] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle clipboard paste
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            handleFileSelect(file);
            // Also set the file to the input for upload
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            if (fileInputRef.current) {
              fileInputRef.current.files = dataTransfer.files;
            }
          }
          break;
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      const errorMsg = "Only JPEG, PNG, GIF, and WebP images are allowed";
      alert(errorMsg);
      onUploadError?.(errorMsg);
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      const errorMsg = "Image size cannot exceed 10MB";
      alert(errorMsg);
      onUploadError?.(errorMsg);
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
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
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
      const errorMsg = "Please select an image file";
      alert(errorMsg);
      onUploadError?.(errorMsg);
      return;
    }

    setIsUploading(true);
    try {
      const file = fileInputRef.current.files[0];
      console.log("originalFile instanceof Blob", file instanceof Blob); // true
      console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob,
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`,
      ); // smaller than maxSizeMB

      const result = await MemeService.uploadMeme(compressedFile, keywords);
      onUploadSuccess?.(result);

      // Reset form
      setPreviewUrl(null);
      setKeywords("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      router.push(`/${result.id}`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Upload failed";
      alert(errorMsg);
      onUploadError?.(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const clearPreview = () => {
    setPreviewUrl(null);
    setKeywords("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-20 ">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Meme</h2>

        {/* File Drop Zone */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${previewUrl ? "hidden" : "block"}
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
              <svg
                className="mx-auto h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <div>PNG, JPG, GIF, WebP up to 10MB</div>
              <div className="flex items-center justify-center space-x-1">
                <span>Or press</span>
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                  Ctrl+V
                </kbd>
                <span>to paste from clipboard</span>
              </div>
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
              <label
                htmlFor="keywords"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Keywords (optional)
              </label>
              <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="funny, cat, meme (comma-separated, max 10)"
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                "Upload Meme"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
