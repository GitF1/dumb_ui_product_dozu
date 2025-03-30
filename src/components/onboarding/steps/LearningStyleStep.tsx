import React from "react";
import { Lightbulb } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { OnboardingData } from "../OnboardingFlow";

interface LearningStyleStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const LearningStyleStep: React.FC<LearningStyleStepProps> = ({
  data,
  updateData,
}) => {
  const learningStyles = [
    {
      id: "visual",
      label: "Visual",
      description: "Learn best through images, diagrams, and visual content",
      icon: "👁️",
    },
    {
      id: "auditory",
      label: "Auditory",
      description:
        "Prefer listening to lectures, discussions, and audio content",
      icon: "👂",
    },
    {
      id: "reading",
      label: "Reading/Writing",
      description: "Learn effectively through reading texts and writing notes",
      icon: "📝",
    },
    {
      id: "kinesthetic",
      label: "Kinesthetic",
      description:
        "Learn by doing, hands-on activities, and practical exercises",
      icon: "👐",
    },
    {
      id: "tactile",
      label: "Tactile",
      description:
        "Learn through touch and physical interaction with materials",
      icon: "✋",
    },
    {
      id: "verbal",
      label: "Verbal",
      description:
        "Learn through speaking and hearing words, discussions and debates",
      icon: "🗣️",
    },
    {
      id: "logical",
      label: "Logical",
      description:
        "Learn through reasoning, systems, patterns and relationships",
      icon: "🧩",
    },
    {
      id: "social",
      label: "Social",
      description:
        "Prefer learning in groups and through discussion with others",
      icon: "👥",
    },
    {
      id: "solitary",
      label: "Solitary",
      description: "Learn best through self-study and independent work",
      icon: "🧘",
    },
  ];

  const handleStyleToggle = (styleId: string, checked: boolean) => {
    let updatedStyles = [...data.learningStyle];

    if (checked) {
      updatedStyles.push(styleId);
    } else {
      updatedStyles = updatedStyles.filter((style) => style !== styleId);
    }

    updateData("learningStyle", updatedStyles);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-6 w-6 text-[#495057]" />
        <h2 className="text-xl font-medium text-[#212529]">
          How do you prefer to learn?
        </h2>
      </div>

      <p className="text-[#6c757d]">
        Select all learning styles that apply to you. This helps us recommend
        content formats that match your preferences.
      </p>

      <div className="space-y-3">
        {learningStyles.map((style) => (
          <div
            key={style.id}
            className="flex items-start space-x-3 border border-[#dee2e6] rounded-md p-4 hover:bg-[#f8f9fa] transition-colors"
          >
            <Checkbox
              id={`style-${style.id}`}
              checked={data.learningStyle.includes(style.id)}
              onCheckedChange={(checked) =>
                handleStyleToggle(style.id, checked as boolean)
              }
              className="mt-1 text-[#343a40]"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">
                  {style.icon}
                </span>
                <Label
                  htmlFor={`style-${style.id}`}
                  className="font-medium text-[#343a40] cursor-pointer"
                >
                  {style.label}
                </Label>
              </div>
              <p className="text-sm text-[#6c757d] mt-1">{style.description}</p>
            </div>
          </div>
        ))}
      </div>

      {data.learningStyle.length === 0 && (
        <p className="text-sm text-[#dc3545] italic">
          Please select at least one learning style to continue.
        </p>
      )}
    </div>
  );
};

export default LearningStyleStep;
