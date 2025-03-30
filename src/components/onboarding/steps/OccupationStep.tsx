import React from "react";
import { Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OnboardingData } from "../OnboardingFlow";

interface OccupationStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const OccupationStep: React.FC<OccupationStepProps> = ({
  data,
  updateData,
}) => {
  const commonOccupations = [
    "Student",
    "Software Developer",
    "Designer",
    "Teacher/Educator",
    "Healthcare Professional",
    "Business Professional",
    "Other",
  ];

  const handleOccupationSelect = (value: string) => {
    updateData("occupation", value);
  };

  const handleCustomOccupation = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData("occupation", e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Briefcase className="h-6 w-6 text-[#495057]" />
        <h2 className="text-xl font-medium text-[#212529]">
          What's your occupation?
        </h2>
      </div>

      <p className="text-[#6c757d]">
        This helps us suggest relevant learning content for your professional
        development.
      </p>

      <div className="space-y-4">
        <RadioGroup
          value={data.occupation}
          onValueChange={handleOccupationSelect}
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          {commonOccupations.map((occupation) => (
            <div
              key={occupation}
              className="flex items-center space-x-2 border border-[#dee2e6] rounded-md p-3 hover:bg-[#f8f9fa] transition-colors"
            >
              <RadioGroupItem
                value={occupation}
                id={`occupation-${occupation}`}
                className="text-[#343a40]"
              />
              <Label
                htmlFor={`occupation-${occupation}`}
                className="flex-1 cursor-pointer"
              >
                {occupation}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {data.occupation === "Other" && (
          <div className="mt-4">
            <Label htmlFor="custom-occupation" className="text-[#495057]">
              Please specify:
            </Label>
            <Input
              id="custom-occupation"
              placeholder="Enter your occupation"
              value={data.occupation === "Other" ? "" : data.occupation}
              onChange={handleCustomOccupation}
              className="mt-1 border-[#ced4da] focus-visible:ring-[#495057]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OccupationStep;
