import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingFlow, { OnboardingData } from "./OnboardingFlow";

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleOnboardingComplete = (data: OnboardingData) => {
    // In a real app, you would save this data to the user's profile
    console.log("Onboarding data:", data);

    // Navigate to the home page after onboarding
    navigate("/home");
  };

  const handleSkip = () => {
    // Navigate to the home page if the user skips onboarding
    navigate("/home");
  };

  return (
    <OnboardingFlow onComplete={handleOnboardingComplete} onSkip={handleSkip} />
  );
};

export default OnboardingPage;
