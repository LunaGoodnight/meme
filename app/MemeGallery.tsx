"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import MemeCard from "@/app/MemeCard";
import { Meme, MemeService } from "@/app/meme";

const PAGE_SIZE = 20;

export default function MemeGallery() {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const loadMemes = useCallback(async (pageNum: number) => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await MemeService.getMemesPaginated(pageNum, PAGE_SIZE);
            setMemes(prev => pageNum === 1 ? response.data : [...prev, ...response.data]);
            setHasMore(response.hasMore);
            setPage(pageNum);
        } catch (error) {
            console.error("Failed to load memes:", error);
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    }, [loading]);

    useEffect(() => {
        loadMemes(1);
    }, []);

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMemes(page + 1);
                }
            },
            { threshold: 0.1, rootMargin: "100px" }
        );

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, loading, page]);

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-4 p-6">
            {memes.map((item: Meme, index: number) => (
                <div className="break-inside-avoid mb-4" key={`${item.id}-${index}`}>
                    <MemeCard meme={item} />
                </div>
            ))}

            <div ref={loadMoreRef} className="col-span-full flex justify-center py-8">
                {loading && (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                )}
                {!hasMore && memes.length > 0 && (
                    <p className="text-gray-500">No more memes to load</p>
                )}
            </div>
        </div>
    );
}
