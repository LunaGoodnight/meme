// components/MemeCard.tsx
"use client";

import React, {useEffect, useState} from "react";
import { Meme, MemeService } from "@/app/meme";
import { useRouter } from "next/navigation";

interface MemeCardProps {
  meme: Meme;
  onDelete?: (id: number) => void;
}

export default function MemeCard({ meme, onDelete }: MemeCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [imageSize, setImageSize] = useState(null);
  const router = useRouter();
  const handleOpenTab = ({ id }: { id: number }) => {
    router.push(`/${id}`);
  };
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this meme?")) return;

    setIsDeleting(true);
    try {
      await MemeService.deleteMeme(meme.id);
      onDelete?.(meme.id);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete meme");
    } finally {
      setIsDeleting(false);
    }
  };

  const copyImageUrl = () => {
    navigator.clipboard.writeText(meme.imageUrl);
    alert("Image URL copied to clipboard!");
  };

  useEffect(() => {
    function getImageDimensions(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = url;
      });
    }


    getImageDimensions(meme.imageUrl).then(res => {
      setImageHeight(res.height);
      console.log({ res})
      setImageSize(res);
    });


  }, [meme.imageUrl]);

  return (
    <div
      onClick={() => handleOpenTab({ id: meme.id })}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative">
        {!imageError ? (
          <img
            loading="lazy"
            src={meme.imageUrl}
            alt="Meme"
            className="w-full h-auto object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Image failed to load</span>
          </div>
        )}

        {/* Action buttons overlay */}
        <div className="absolute top-2 right-2 space-x-1">
          {/*<button*/}
          {/*  onClick={copyImageUrl}*/}
          {/*  className="bg-black bg-opacity-50 text-white p-1 rounded hover:bg-opacity-70"*/}
          {/*  title="Copy image URL"*/}
          {/*>*/}
          {/*  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">*/}
          {/*    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>*/}
          {/*    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>*/}
          {/*  </svg>*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  onClick={()=>handleOpenTab({ id: meme.id })}*/}
          {/*  className="bg-indigo-500 hover:bg-fuchsia-500 text-white p-1 rounded disabled:opacity-50"*/}
          {/*>*/}
          {/*  <svg width="24" height="24" fill="none" stroke="currentColor"  viewBox="0 0 24 24">*/}
          {/*    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" fill="none"/>*/}
          {/*    <path d="M9 15L21 3M15 3h6v6" stroke="currentColor" fill="none"/>*/}
          {/*  </svg>*/}
          {/*</button>*/}
          {isAdmin && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600 disabled:opacity-50"
              title="Delete meme"
            >
              {isDeleting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Keywords */}
        {meme.keywords && meme.keywords.length > 0 && (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1">
              {meme.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Created date */}
        <p className="text-sm text-gray-500">
          {new Date(meme.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
