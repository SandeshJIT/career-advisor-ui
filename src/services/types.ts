export interface UploadResponse {
    status: string;
    chunks: number;
    candidate_id: string;
}

export interface AskResponse {
    answer: string;
}

export interface AskRequest {
    query: string;
    user_type: string;
    candidate_id: string;
}