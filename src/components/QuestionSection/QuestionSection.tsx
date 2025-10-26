import React from 'react';
import './QuestionSection.css';
import type { UploadResponse } from '../../services/types';
import { ResumeService } from '../../services/resumeService';

interface QuestionSectionProps {
    uploadResponse: UploadResponse;
    userType: string;
}

export const QuestionSection: React.FC<QuestionSectionProps> = ({ uploadResponse, userType }) => {
    const [query, setQuery] = React.useState<string>("");
    const [answer, setAnswer] = React.useState<string>("");
    const [thinking, setThinking] = React.useState<boolean>(false);

    const resumeService = ResumeService.getInstance();

    const askQuestion = async () => {
        if (!uploadResponse?.candidate_id) return;
        setThinking(true);
        try {
            const data = await resumeService.askQuestion({
                query,
                user_type: userType,
                candidate_id: uploadResponse.candidate_id,
            });
            setAnswer(data.answer);
        } catch (err) {
            setAnswer("Error getting answer. " + err);
        } finally {
            setThinking(false);
        }
    };

    const parseAnswer = (text: string) => {
        const lines = text.split("\n");
        return lines.map((line, index) => {
            line = line.trim();
            if (!line) return <br key={index} />;
            const boldParts = line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                }
                return part;
            });
            if (/^\d+\./.test(line)) {
                return (
                    <div key={index} className="answer-list-item">
                        {boldParts}
                    </div>
                );
            }
            return <div key={index}>{boldParts}</div>;
        });
    };

    return (
        <section className="section fade-in">
            <h2>Ask a Question</h2>
            <textarea
                placeholder="Type your question about the resume..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={4}
                className="textarea"
            />
            <button className="button" onClick={askQuestion}>
                Ask
            </button>

            {answer && (
                <div className="answer-container">
                    <strong>Answer:</strong>
                    <div className="answer">{parseAnswer(answer)}</div>
                </div>
            )}

            {thinking && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="spinner"></div>
                        <p>Thinking...</p>
                    </div>
                </div>
            )}
        </section>
    );
};