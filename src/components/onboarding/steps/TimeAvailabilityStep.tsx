import React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OnboardingData } from "../OnboardingFlow";

interface TimeAvailabilityStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const TimeAvailabilityStep: React.FC<TimeAvailabilityStepProps> = ({
  data,
  updateData,
}) => {
  const timeOptions = [
    {
      value: "<15min",
      label: "Less than 15 minutes per day",
      description: "Quick, bite-sized learning sessions",
    },
    {
      value: "15-30min",
      label: "15-30 minutes per day",
      description: "Short, focused learning periods",
    },
    {
      value: "30-60min",
      label: "30-60 minutes per day",
      description: "Moderate study sessions",
    },
    {
      value: ">60min",
      label: "More than 60 minutes per day",
      description: "Deep, immersive learning",
    },
    {
      value: "weekends",
      label: "Mostly weekends",
      description: "Concentrated weekend study",
    },
    {
      value: "irregular",
      label: "Irregular schedule",
      description: "Flexible, when time permits",
    },
  ];

  const handleTimeSelect = (value: string) => {
    updateData("timeAvailability", value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Clock className="h-6 w-6 text-[#495057]" />
        <h2 className="text-xl font-medium text-[#212529]">
          How much time can you dedicate to learning?
        </h2>
      </div>

      <p className="text-[#6c757d]">
        This helps us recommend appropriate content length and learning
        schedules.
      </p>

      <RadioGroup
        value={data.timeAvailability}
        onValueChange={handleTimeSelect}
        className="space-y-3"
      >
        {timeOptions.map((option) => (
          <div
            key={option.value}
            className="flex items-start space-x-3 border border-[#dee2e6] rounded-md p-4 hover:bg-[#f8f9fa] transition-colors"
          >
            <RadioGroupItem
              value={option.value}
              id={`time-${option.value}`}
              className="mt-1 text-[#343a40]"
            />
            <div className="flex-1">
              <Label
                htmlFor={`time-${option.value}`}
                className="font-medium text-[#343a40] cursor-pointer"
              >
                {option.label}
              </Label>
              <p className="text-sm text-[#6c757d] mt-1">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TimeAvailabilityStep;
