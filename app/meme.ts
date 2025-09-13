// services/memeService.ts

// types/meme.ts
export interface Meme {
    id: number;
    imageUrl: string;
    createdAt: string;
    keywords: string[];
}

export interface MemeUploadResponse {
    id: number;
    imageUrl: string;
    createdAt: string;
    keywords: string[];
}

export interface ApiError {
    error: string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.meme.vividcats.org/api';

export class MemeService {
    static async uploadMeme(imageFile: File, keywords: string = ''): Promise<MemeUploadResponse> {
        const formData = new FormData();
        formData.append('imageFile', imageFile);
        if (keywords.trim()) {
            formData.append('keywords', keywords.trim());
        }

        const response = await fetch(`${API_BASE_URL}/memes/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    static async getAllMemes(): Promise<Meme[]> {
        const response = await fetch(`${API_BASE_URL}/memes`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    static async deleteMeme(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/memes/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
}