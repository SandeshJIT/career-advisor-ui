import React from 'react';
import './HealthStatus.css';

interface HealthStatusProps {
    isUp: boolean;
}

export const HealthStatus: React.FC<HealthStatusProps> = ({ isUp }) => {
    if (!isUp) return null;
    
    return <div className="site-up-tick">✓</div>;
};