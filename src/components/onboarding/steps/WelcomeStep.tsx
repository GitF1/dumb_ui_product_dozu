import React from "react";
import { BookOpen } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface WelcomeStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ data, updateData }) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="bg-[#f8f9fa] p-4 rounded-full">
          <BookOpen className="h-12 w-12 text-[#343a40]" />
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-[#212529]">
        Welcome to Your Learning Journey
      </h1>

      <p className="text-[#495057] max-w-md mx-auto">
        Let's personalize your experience to help you learn more effectively.
        We'll ask a few questions to understand your learning preferences.
      </p>

      <div className="bg-[#f8f9fa] p-4 rounded-lg border border-[#dee2e6] text-[#6c757d] text-sm">
        <p>
          This information helps us suggest content and learning methods that
          match your unique style and goals. You can always change these
          preferences later.
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;
