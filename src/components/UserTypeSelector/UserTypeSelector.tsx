import React from 'react';
import './UserTypeSelector.css';

interface UserTypeSelectorProps {
    userType: string;
    onUserTypeChange: (type: string) => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, onUserTypeChange }) => {
    return (
        <div className="user-type-selector">
            <label>
                User Type:{" "}
                <select
                    value={userType}
                    onChange={(e) => onUserTypeChange(e.target.value)}
                    className="select"
                >
                    <option value="candidate">Candidate</option>
                    <option value="hr">HR</option>
                </select>
            </label>
        </div>
    );
};