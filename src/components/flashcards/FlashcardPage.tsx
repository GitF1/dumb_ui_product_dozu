import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlashcardView from "./FlashcardView";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const FlashcardPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [flashcardContent, setFlashcardContent] = useState<any>(null);

  useEffect(() => {
    // Get the flashcard content from location state
    if (location.state?.content) {
      setFlashcardContent(location.state.content);
    } else {
      // If no content is provided, redirect back to home
      navigate("/home");
    }
  }, [location.state, navigate]);

  const handleBack = () => {
    navigate("/home");
  };

  const handleComplete = () => {
    // Navigate back to home after completing the study session
    navigate("/home", {
      state: {
        completedStudy: true,
        studyType: "flashcards",
        contentTitle: flashcardContent?.title,
      },
    });
  };

  if (!flashcardContent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t("flashcards.loading")}</p>
          <Button onClick={handleBack}>{t("common.back")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-700 border-gray-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("common.back")}
        </Button>
      </div>

      <FlashcardView
        title={flashcardContent.title || t("flashcards.defaultTitle")}
        cards={flashcardContent.cards || []}
        onBack={handleBack}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default FlashcardPage;
