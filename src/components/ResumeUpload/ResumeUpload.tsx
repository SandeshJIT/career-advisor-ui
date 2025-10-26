import React from 'react';
import './ResumeUpload.css';
import type { UploadResponse } from '../../services/types';
import { ResumeService } from '../../services/resumeService';

interface ResumeUploadProps {
    onUploadSuccess: (response: UploadResponse) => void;
    showUploadSection: boolean;
    setShowUploadSection: (show: boolean) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ 
    onUploadSuccess, 
    showUploadSection, 
    setShowUploadSection 
}) => {
    const [resumeFile, setResumeFile] = React.useState<File | null>(null);
    const [uploading, setUploading] = React.useState<boolean>(false);
    const [uploadSuccess, setUploadSuccess] = React.useState<boolean>(false);
    
    const resumeService = ResumeService.getInstance();

    const uploadResume = async () => {
        if (!resumeFile) return alert("Select a resume first.");
        setUploading(true);
        setUploadSuccess(false);

        try {
            const data = await resumeService.uploadResume(resumeFile);
            onUploadSuccess(data);
            setUploadSuccess(true);
            setShowUploadSection(false);
        } catch (err) {
            alert("Error uploading resume. " + err);
        } finally {
            setUploading(false);
        }
    };

    if (!showUploadSection) {
        return (
            <button
                className="button small"
                onClick={() => setShowUploadSection(true)}
            >
                Upload / Change Resume
            </button>
        );
    }

    return (
        <section className="section fade-in">
            <h2>Upload Resume</h2>
            <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            />
            <button className="button" onClick={uploadResume} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {uploading && <div className="loader">Uploading resume, please wait...</div>}
            {uploadSuccess && <div className="success">✓ Upload Successful!</div>}
        </section>
    );
};