import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, HelpCircle } from "lucide-react";

interface TutorialStep {
  title: string;
  description: string;
  targetElement: string;
  position: "top" | "right" | "bottom" | "left";
}

interface TutorialOverlayProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  open,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps: TutorialStep[] = [
    {
      title: "Welcome to Your Learning Platform",
      description:
        "This quick tutorial will help you get familiar with the key features of the platform.",
      targetElement: "body",
      position: "top",
    },
    {
      title: "Import Learning Content",
      description:
        "Use this panel to import content from various sources like text, PDF, or media files.",
      targetElement: ".import-panel",
      position: "bottom",
    },
    {
      title: "Your Content Library",
      description:
        "All your learning materials will appear here. You can filter, sort, and organize them.",
      targetElement: ".content-library",
      position: "top",
    },
    {
      title: "Study with Flashcards",
      description:
        "Click on any content card to start studying with our interactive flashcard system.",
      targetElement: ".content-card",
      position: "right",
    },
    {
      title: "Track Your Progress",
      description:
        "Monitor your learning journey and see how you're improving over time.",
      targetElement: ".header-profile",
      position: "bottom",
    },
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!open) return null;

  const currentTutorialStep = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full bg-white text-[#495057] hover:bg-[#f8f9fa] hover:text-[#343a40]"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#f8f9fa] p-2 rounded-full">
            <HelpCircle className="h-6 w-6 text-[#495057]" />
          </div>
          <h2 className="text-xl font-medium text-[#212529]">
            {currentTutorialStep.title}
          </h2>
        </div>

        <p className="text-[#495057] mb-6">{currentTutorialStep.description}</p>

        <div className="flex justify-between">
          <div>
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="text-[#495057] border-[#ced4da] hover:bg-[#f8f9fa]"
              >
                Previous
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-[#343a40]" : "bg-[#dee2e6]"}`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="bg-[#343a40] hover:bg-[#212529] text-white ml-4"
            >
              {currentStep === tutorialSteps.length - 1 ? "Finish" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
