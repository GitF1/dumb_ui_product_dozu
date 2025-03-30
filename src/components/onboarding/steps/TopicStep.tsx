import React, { useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { OnboardingData } from "../OnboardingFlow";

interface TopicStepProps {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: any) => void;
}

const TopicStep: React.FC<TopicStepProps> = ({ data, updateData }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const popularTopics = [
    "Web Development",
    "Data Science",
    "UX/UI Design",
    "Digital Marketing",
    "Machine Learning",
    "Language Learning",
    "Business Strategy",
    "Personal Finance",
  ];

  const handleTopicSelect = (topic: string) => {
    updateData("topic", topic);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      updateData("topic", e.target.value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-[#495057]" />
        <h2 className="text-xl font-medium text-[#212529]">
          What do you want to learn?
        </h2>
      </div>

      <p className="text-[#6c757d]">
        Choose a topic you're interested in or search for something specific.
      </p>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#adb5bd] h-4 w-4" />
        <Input
          placeholder="Search for a topic..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 border-[#ced4da] focus-visible:ring-[#495057]"
        />
      </div>

      <div>
        <Label className="text-sm text-[#6c757d] mb-2 block">
          Popular topics:
        </Label>
        <div className="flex flex-wrap gap-2">
          {popularTopics.map((topic) => (
            <Button
              key={topic}
              variant="outline"
              onClick={() => handleTopicSelect(topic)}
              className={`border-[#ced4da] hover:bg-[#f8f9fa] ${data.topic === topic ? "bg-[#f8f9fa] border-[#adb5bd]" : ""}`}
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>

      {data.topic && (
        <div className="bg-[#f8f9fa] p-4 rounded-lg border border-[#dee2e6]">
          <p className="text-[#495057] font-medium">Selected topic:</p>
          <p className="text-[#212529]">{data.topic}</p>
        </div>
      )}
    </div>
  );
};

export default TopicStep;
