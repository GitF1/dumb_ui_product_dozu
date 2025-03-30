import React from "react";
import { Lightbulb } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { OnboardingData } from "../OnboardingFlow";

interface LearningPreferencesStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const LearningPreferencesStep: React.FC<LearningPreferencesStepProps> = ({
  data,
  updateData,
}) => {
  const learningPreferences = [
    {
      id: "short-sessions",
      label: "Short, frequent sessions",
      description: "I prefer studying in brief, focused bursts",
    },
    {
      id: "long-sessions",
      label: "Longer, deeper sessions",
      description: "I prefer extended periods of concentrated study",
    },
    {
      id: "structured",
      label: "Structured learning",
      description: "I prefer clear, organized learning paths",
    },
    {
      id: "exploratory",
      label: "Exploratory learning",
      description: "I prefer discovering connections on my own",
    },
    {
      id: "practical",
      label: "Practical applications",
      description: "I learn best when I can apply concepts immediately",
    },
    {
      id: "theoretical",
      label: "Theoretical understanding",
      description: "I prefer understanding the underlying principles first",
    },
  ];

  const handlePreferenceToggle = (preferenceId: string, checked: boolean) => {
    let updatedPreferences = [...data.learningPreferences];

    if (checked) {
      updatedPreferences.push(preferenceId);
    } else {
      updatedPreferences = updatedPreferences.filter(
        (preference) => preference !== preferenceId,
      );
    }

    updateData("learningPreferences", updatedPreferences);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-6 w-6 text-[#495057]" />
        <h2 className="text-xl font-medium text-[#212529]">
          What are your learning preferences?
        </h2>
      </div>

      <p className="text-[#6c757d]">
        Select all preferences that apply to you. This helps us tailor your
        learning experience.
      </p>

      <div className="space-y-3">
        {learningPreferences.map((preference) => (
          <div
            key={preference.id}
            className="flex items-start space-x-3 border border-[#dee2e6] rounded-md p-4 hover:bg-[#f8f9fa] transition-colors"
          >
            <Checkbox
              id={`preference-${preference.id}`}
              checked={data.learningPreferences.includes(preference.id)}
              onCheckedChange={(checked) =>
                handlePreferenceToggle(preference.id, checked as boolean)
              }
              className="mt-1 text-[#343a40]"
            />
            <div className="flex-1">
              <Label
                htmlFor={`preference-${preference.id}`}
                className="font-medium text-[#343a40] cursor-pointer"
              >
                {preference.label}
              </Label>
              <p className="text-sm text-[#6c757d] mt-1">
                {preference.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPreferencesStep;
