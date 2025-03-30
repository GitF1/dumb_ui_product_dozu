import React from "react";
import { Home } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { OnboardingData } from "../OnboardingFlow";

interface LearningEnvironmentStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const LearningEnvironmentStep: React.FC<LearningEnvironmentStepProps> = ({
  data,
  updateData,
}) => {
  const environments = [
    {
      id: "quiet",
      label: "Quiet environment",
      description: "I prefer studying in a silent, distraction-free space",
      icon: "🤫",
    },
    {
      id: "ambient",
      label: "Ambient background",
      description: "I prefer some background noise or music while studying",
      icon: "🎵",
    },
    {
      id: "outdoors",
      label: "Outdoors or nature",
      description: "I prefer studying in natural settings when possible",
      icon: "🌳",
    },
    {
      id: "public",
      label: "Public spaces",
      description:
        "I prefer studying in cafes, libraries, or other public areas",
      icon: "☕",
    },
    {
      id: "flexible",
      label: "Flexible environments",
      description:
        "I can adapt to different environments based on availability",
      icon: "🔄",
    },
  ];

  const handleEnvironmentSelect = (value: string) => {
    updateData("learningEnvironment", value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Home className="h-6 w-6 text-[#495057]" />
        <h2 className="text-xl font-medium text-[#212529]">
          Where do you learn best?
        </h2>
      </div>

      <p className="text-[#6c757d]">
        Your preferred learning environment helps us suggest optimal study
        conditions and content formats.
      </p>

      <RadioGroup
        value={data.learningEnvironment}
        onValueChange={handleEnvironmentSelect}
        className="space-y-3"
      >
        {environments.map((environment) => (
          <div
            key={environment.id}
            className="flex items-start space-x-3 border border-[#dee2e6] rounded-md p-4 hover:bg-[#f8f9fa] transition-colors"
          >
            <RadioGroupItem
              value={environment.id}
              id={`environment-${environment.id}`}
              className="mt-1 text-[#343a40]"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">
                  {environment.icon}
                </span>
                <Label
                  htmlFor={`environment-${environment.id}`}
                  className="font-medium text-[#343a40] cursor-pointer"
                >
                  {environment.label}
                </Label>
              </div>
              <p className="text-sm text-[#6c757d] mt-1">
                {environment.description}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default LearningEnvironmentStep;
