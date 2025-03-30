import React from "react";
import { Target } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { OnboardingData } from "../OnboardingFlow";

interface GoalsStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const GoalsStep: React.FC<GoalsStepProps> = ({ data, updateData }) => {
  const commonGoals = [
    "Build professional skills for my career",
    "Learn a new subject from scratch",
    "Deepen knowledge in my field of expertise",
    "Prepare for an exam or certification",
    "Personal enrichment and curiosity",
    "Other (please specify)",
  ];

  const handleGoalSelect = (value: string) => {
    updateData("goals", value);
  };

  const handleCustomGoal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData("goals", e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Target className="h-6 w-6 text-[#495057]" />
        <h2 className="text-xl font-medium text-[#212529]">
          What are your learning goals?
        </h2>
      </div>

      <p className="text-[#6c757d]">
        Understanding your goals helps us tailor content to your specific needs
        and aspirations.
      </p>

      <RadioGroup
        value={
          commonGoals.includes(data.goals)
            ? data.goals
            : "Other (please specify)"
        }
        onValueChange={handleGoalSelect}
        className="space-y-3"
      >
        {commonGoals.map((goal) => (
          <div
            key={goal}
            className="flex items-start space-x-3 border border-[#dee2e6] rounded-md p-4 hover:bg-[#f8f9fa] transition-colors"
          >
            <RadioGroupItem
              value={goal}
              id={`goal-${goal}`}
              className="mt-1 text-[#343a40]"
            />
            <Label
              htmlFor={`goal-${goal}`}
              className="flex-1 cursor-pointer text-[#343a40]"
            >
              {goal}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {data.goals === "Other (please specify)" && (
        <div className="mt-4">
          <Label htmlFor="custom-goal" className="text-[#495057] mb-2 block">
            Please describe your learning goals:
          </Label>
          <Textarea
            id="custom-goal"
            placeholder="I want to learn this subject because..."
            value={data.goals === "Other (please specify)" ? "" : data.goals}
            onChange={handleCustomGoal}
            className="min-h-[100px] border-[#ced4da] focus-visible:ring-[#495057]"
          />
        </div>
      )}
    </div>
  );
};

export default GoalsStep;
