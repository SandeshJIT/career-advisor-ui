import React, { useState, useEffect, useRef } from "react";
import "./ContextSection.css";

const ContextSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`context-section fade-in ${isOpen ? "open" : "closed"}`}
    >
      <div
        className="context-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
      >
        <strong>How Career Advisor Works</strong>
        <span className="toggle-icon">{isOpen ? "▲" : "▼"}</span>
      </div>
      <div className="context-body">
        <p>Welcome to the Career Advisor! Here's how it works:</p>
        <ul>
          <li><strong>Upload Resume:</strong> Upload your resume to let the AI analyze your profile.</li>
          <li><strong>Ask Questions:</strong> Once your resume is uploaded, you can ask questions about your skills, experience, and career guidance.</li>
          <li><strong>AI Response:</strong> Get answers displayed in a structured and easy-to-read format.</li>
          <li><strong>Site Status:</strong> The tick in the corner indicates that the site is running smoothly.</li>
        </ul>
      </div>
    </section>
  );
};

export default ContextSection;
