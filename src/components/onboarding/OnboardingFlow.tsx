import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WelcomeStep from "./steps/WelcomeStep";
import OccupationStep from "./steps/OccupationStep";
import TopicStep from "./steps/TopicStep";
import TimeAvailabilityStep from "./steps/TimeAvailabilityStep";
import LearningStyleStep from "./steps/LearningStyleStep";
import LearningPreferencesStep from "./steps/LearningPreferencesStep";
import LearningEnvironmentStep from "./steps/LearningEnvironmentStep";
import GoalsStep from "./steps/GoalsStep";
import SummaryStep from "./steps/SummaryStep";

export interface OnboardingData {
  occupation: string;
  topic: string;
  timeAvailability: string;
  learningStyle: string[];
  learningPreferences: string[];
  learningEnvironment: string;
  goals: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
  onSkip,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    occupation: "",
    topic: "",
    timeAvailability: "",
    learningStyle: [],
    learningPreferences: [],
    learningEnvironment: "",
    goals: "",
  });

  const steps = [
    { name: "Welcome", component: WelcomeStep },
    { name: "Occupation", component: OccupationStep },
    { name: "Topic", component: TopicStep },
    { name: "Time", component: TimeAvailabilityStep },
    { name: "Style", component: LearningStyleStep },
    { name: "Preferences", component: LearningPreferencesStep },
    { name: "Environment", component: LearningEnvironmentStep },
    { name: "Goals", component: GoalsStep },
    { name: "Summary", component: SummaryStep },
  ];

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData({ ...data, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = Math.round((currentStep / (steps.length - 1)) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-[#e9ecef]">
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full">
        <div className="w-full bg-white rounded-xl shadow-sm p-8 border border-[#dee2e6]">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2 text-sm text-[#6c757d]">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span>{steps[currentStep].name}</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>

          <CurrentStepComponent data={data} updateData={updateData} />

          <div className="flex justify-between mt-8 pt-4 border-t border-[#dee2e6]">
            {currentStep > 0 ? (
              <Button
                variant="outline"
                onClick={handleBack}
                className="text-[#495057] border-[#ced4da] hover:bg-[#f8f9fa] hover:text-[#343a40]"
              >
                Back
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={onSkip}
                className="text-[#6c757d] border-[#ced4da] hover:bg-[#f8f9fa]"
              >
                Skip for now
              </Button>
            )}

            <Button
              onClick={handleNext}
              className="bg-[#343a40] hover:bg-[#212529] text-white"
            >
              {currentStep === steps.length - 1 ? "Complete" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
