import { API_CONFIG } from '../config/api.config';
import type { UploadResponse, AskResponse, AskRequest } from './types';

export class ResumeService {
    private static instance: ResumeService;
    private baseUrl: string;

    private constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
    }

    public static getInstance(): ResumeService {
        if (!ResumeService.instance) {
            ResumeService.instance = new ResumeService();
        }
        return ResumeService.instance;
    }

    async checkHealth(): Promise<boolean> {
        try {
            const res = await fetch(`${this.baseUrl}/health`);
            return res.ok;
        } catch {
            return false;
        }
    }

    async uploadResume(file: File): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${this.baseUrl}/upload-resume`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            throw new Error('Failed to upload resume');
        }

        return await res.json();
    }

    async askQuestion(request: AskRequest): Promise<AskResponse> {
        const res = await fetch(`${this.baseUrl}/ask`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request),
        });

        if (!res.ok) {
            throw new Error('Failed to get answer');
        }

        return await res.json();
    }
}