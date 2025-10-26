import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import ContextSection from "./context/ContextSection";
import { ResumeService } from "./services/resumeService";
import type { UploadResponse } from "./services/types";
import { UserTypeSelector } from "./components/UserTypeSelector/UserTypeSelector";
import { ResumeUpload } from "./components/ResumeUpload/ResumeUpload";
import { QuestionSection } from "./components/QuestionSection/QuestionSection";
import { HealthStatus } from "./components/HealthStatus/HealthStatus";

const App: React.FC = () => {
  const resumeService = ResumeService.getInstance();
  const [siteUp, setSiteUp] = useState<boolean>(false);
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(null);
  const [userType, setUserType] = useState<string>("candidate");
  const [showUploadSection, setShowUploadSection] = useState<boolean>(true);

  const checkHealth = useCallback(async () => {
    const isUp = await resumeService.checkHealth();
    setSiteUp(isUp);
  }, [resumeService]);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [checkHealth]);

return (
    <div className="container">
      <UserTypeSelector
        userType={userType}
        onUserTypeChange={setUserType}
      />

      <h1 className="title">Personal Resume Expert</h1>

      <ContextSection />

      <ResumeUpload
        onUploadSuccess={setUploadResponse}
        showUploadSection={showUploadSection}
        setShowUploadSection={setShowUploadSection}
      />

      {uploadResponse && (
        <QuestionSection
          uploadResponse={uploadResponse}
          userType={userType}
        />
      )}

      <HealthStatus isUp={siteUp} />
    </div>
  );
};

export default App;
