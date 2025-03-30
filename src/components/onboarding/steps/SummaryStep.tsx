import React from "react";
import { CheckCircle, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OnboardingData } from "../OnboardingFlow";

interface SummaryStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ data }) => {
  const formatLearningStyles = (styles: string[]) => {
    if (styles.length === 0) return "Not specified";

    const styleMap: Record<string, string> = {
      visual: "Visual",
      auditory: "Auditory",
      reading: "Reading/Writing",
      kinesthetic: "Kinesthetic",
      tactile: "Tactile",
      verbal: "Verbal",
      logical: "Logical",
      social: "Social",
      solitary: "Solitary",
    };

    return styles.map((style) => styleMap[style] || style).join(", ");
  };

  const formatLearningPreferences = (preferences: string[]) => {
    if (preferences.length === 0) return "Not specified";

    const preferenceMap: Record<string, string> = {
      "short-sessions": "Short, frequent sessions",
      "long-sessions": "Longer, deeper sessions",
      structured: "Structured learning",
      exploratory: "Exploratory learning",
      practical: "Practical applications",
      theoretical: "Theoretical understanding",
    };

    return preferences.map((pref) => preferenceMap[pref] || pref).join(", ");
  };

  const formatLearningEnvironment = (environment: string) => {
    if (!environment) return "Not specified";

    const environmentMap: Record<string, string> = {
      quiet: "Quiet environment",
      ambient: "Ambient background",
      outdoors: "Outdoors or nature",
      public: "Public spaces",
      flexible: "Flexible environments",
    };

    return environmentMap[environment] || environment;
  };

  const formatTimeAvailability = (time: string) => {
    const timeMap: Record<string, string> = {
      "<15min": "Less than 15 minutes per day",
      "15-30min": "15-30 minutes per day",
      "30-60min": "30-60 minutes per day",
      ">60min": "More than 60 minutes per day",
      weekends: "Mostly weekends",
      irregular: "Irregular schedule",
    };

    return timeMap[time] || time;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CheckCircle className="h-6 w-6 text-[#495057]" />
        <h2 className="text-xl font-medium text-[#212529]">
          Your Learning Profile Summary
        </h2>
      </div>

      <p className="text-[#6c757d]">
        Here's a summary of your learning preferences. You can always update
        these in your profile settings later.
      </p>

      <div className="space-y-4 bg-[#f8f9fa] p-5 rounded-lg border border-[#dee2e6]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-[#6c757d]">Occupation</h3>
            <p className="text-[#212529]">
              {data.occupation || "Not specified"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#6c757d]">
              Learning Topic
            </h3>
            <p className="text-[#212529]">{data.topic || "Not specified"}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#6c757d]">
              Time Availability
            </h3>
            <p className="text-[#212529]">
              {data.timeAvailability
                ? formatTimeAvailability(data.timeAvailability)
                : "Not specified"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#6c757d]">
              Learning Styles
            </h3>
            <p className="text-[#212529]">
              {formatLearningStyles(data.learningStyle)}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#6c757d]">
              Learning Preferences
            </h3>
            <p className="text-[#212529]">
              {formatLearningPreferences(data.learningPreferences)}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-[#6c757d]">
              Learning Environment
            </h3>
            <p className="text-[#212529]">
              {formatLearningEnvironment(data.learningEnvironment)}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-[#6c757d]">Learning Goals</h3>
          <p className="text-[#212529]">{data.goals || "Not specified"}</p>
        </div>
      </div>

      <div className="bg-[#e9ecef] p-4 rounded-lg border border-[#dee2e6] flex items-start gap-3">
        <div className="text-[#495057] bg-white p-2 rounded-full">
          <Edit2 className="h-4 w-4" />
        </div>
        <p className="text-sm text-[#495057]">
          Based on your detailed profile, we'll suggest highly personalized
          learning content and methods tailored to your unique learning style.
          You're almost ready to start your learning journey!
        </p>
      </div>
    </div>
  );
};

export default SummaryStep;
