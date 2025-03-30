import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "./layout/Header";
import ImportPanel from "./dashboard/ImportPanel";
import ContentLibrary from "./dashboard/ContentLibrary";
import ImportDialog from "./import/ImportDialog";
import FlashcardView from "./flashcards/FlashcardView";
import ScheduleManager from "./schedule/ScheduleManager";
import LearningSuggestion, {
  LearningMethod,
} from "./dashboard/LearningSuggestion";
import ContentGeneration from "./dashboard/ContentGeneration";
import ScheduleSetup from "./schedule/ScheduleSetup";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  FileQuestion,
  Gamepad2,
  MessageSquare,
  PlusCircle,
} from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const [currentStudySet, setCurrentStudySet] = useState<string | null>(null);
  const [isProcessingImport, setIsProcessingImport] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showSchedule, setShowSchedule] = useState(false);

  // New states for the learning workflow
  const [importedContent, setImportedContent] = useState<{
    title: string;
    type: string;
  } | null>(null);
  const [workflowStep, setWorkflowStep] = useState<
    "import" | "suggest" | "generate" | "schedule" | "complete"
  >("import");
  const [suggestedMethods, setSuggestedMethods] = useState<LearningMethod[]>([
    {
      id: "flashcards",
      name: t("learning.method.flashcards"),
      description: t("learning.method.flashcardsDescription"),
      icon: <BookOpen className="h-5 w-5 text-gray-700" />,
      benefits: [
        t("learning.benefit.memorization"),
        t("learning.benefit.quickReview"),
        t("learning.benefit.spaced"),
      ],
    },
    {
      id: "quizzes",
      name: t("learning.method.quizzes"),
      description: t("learning.method.quizzesDescription"),
      icon: <FileQuestion className="h-5 w-5 text-gray-700" />,
      benefits: [
        t("learning.benefit.testing"),
        t("learning.benefit.retention"),
        t("learning.benefit.feedback"),
      ],
    },
    {
      id: "gamification",
      name: t("learning.method.gamification"),
      description: t("learning.method.gamificationDescription"),
      icon: <Gamepad2 className="h-5 w-5 text-gray-700" />,
      benefits: [
        t("learning.benefit.engagement"),
        t("learning.benefit.motivation"),
        t("learning.benefit.rewards"),
      ],
    },
    {
      id: "chatting",
      name: t("learning.method.chatting"),
      description: t("learning.method.chattingDescription"),
      icon: <MessageSquare className="h-5 w-5 text-gray-700" />,
      benefits: [
        t("learning.benefit.interactive"),
        t("learning.benefit.personalized"),
        t("learning.benefit.clarification"),
      ],
    },
  ]);
  const [selectedMethod, setSelectedMethod] = useState<LearningMethod | null>(
    null,
  );
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [scheduleData, setScheduleData] = useState<any>(null);

  // Mock content sets are already defined in ContentLibrary component

  const handleCreateContent = () => {
    setShowImportDialog(true);
  };

  const handleCreateFlashcardsQuizzes = () => {
    navigate("/create-flashcards-quizzes");
  };

  const handleStudyContent = (id: string) => {
    setCurrentStudySet(id);
    setIsStudying(true);
  };

  const handleBackFromStudy = () => {
    setIsStudying(false);
    setCurrentStudySet(null);
  };

  const handleImportComplete = (data: any) => {
    // Set imported content and move to suggestion step
    setImportedContent({
      title: data.title || "Imported Content",
      type: data.method || "content",
    });
    setWorkflowStep("suggest");
    setShowImportDialog(false);
  };

  const handleFileSelect = (files: File[]) => {
    // Simulate processing
    setIsProcessingImport(true);
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessingImport(false);
          setProcessingProgress(0);

          // Move to suggestion step after processing
          setImportedContent({
            title: files[0]?.name.split(".")[0] || "Imported Content",
            type: "document",
          });
          setWorkflowStep("suggest");

          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleTextImport = (text: string) => {
    // Simulate processing
    setIsProcessingImport(true);
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessingImport(false);
          setProcessingProgress(0);

          // Move to suggestion step after processing
          setImportedContent({
            title: "Text Content",
            type: "text",
          });
          setWorkflowStep("suggest");

          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleMethodSelect = (method: LearningMethod) => {
    setSelectedMethod(method);
  };

  const handleContinueToGeneration = () => {
    if (selectedMethod) {
      setWorkflowStep("generate");
    }
  };

  const handleBackToSuggestion = () => {
    setWorkflowStep("suggest");
  };

  const handleContentGenerated = (content: any) => {
    setGeneratedContent(content);

    // Redirect to the appropriate page based on the content type
    if (content.type === "flashcards") {
      navigate("/flashcards", { state: { content } });
    } else if (content.type === "quizzes") {
      navigate("/quizzes", { state: { content } });
    } else if (content.type === "gamification") {
      navigate("/game", { state: { content } });
    } else if (content.type === "chatting") {
      navigate("/chat", { state: { content } });
    } else {
      // If no specific type or unknown type, continue with scheduling
      setWorkflowStep("schedule");
    }
  };

  const handleBackToGeneration = () => {
    setWorkflowStep("generate");
  };

  const handleScheduleComplete = (schedule: any) => {
    setScheduleData(schedule);
    setWorkflowStep("complete");

    // Reset workflow after a delay to show success message
    setTimeout(() => {
      setWorkflowStep("import");
      setImportedContent(null);
      setSelectedMethod(null);
      setGeneratedContent(null);
      setScheduleData(null);
    }, 3000);
  };

  const renderWorkflowContent = () => {
    switch (workflowStep) {
      case "suggest":
        return (
          <LearningSuggestion
            contentTitle={importedContent?.title}
            suggestedMethods={suggestedMethods}
            onMethodSelect={handleMethodSelect}
            selectedMethodId={selectedMethod?.id}
            onContinue={handleContinueToGeneration}
          />
        );
      case "generate":
        return (
          <ContentGeneration
            contentTitle={importedContent?.title}
            selectedMethod={selectedMethod!}
            onComplete={handleContentGenerated}
            onBack={handleBackToSuggestion}
          />
        );
      case "schedule":
        return (
          <ScheduleSetup
            contentTitle={generatedContent.title}
            contentType={generatedContent.type}
            estimatedTime={generatedContent.estimatedTime}
            onComplete={handleScheduleComplete}
            onBack={handleBackToGeneration}
          />
        );
      case "complete":
        return (
          <div className="w-full max-w-[1200px] mx-auto bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {t("learning.setupComplete")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("learning.setupCompleteDescription")}
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowSchedule(true)}
                className="border-gray-300 text-gray-700"
              >
                {t("schedule.viewSchedule")}
              </Button>
              <Button
                onClick={() => {
                  setWorkflowStep("import");
                  setImportedContent(null);
                  setSelectedMethod(null);
                  setGeneratedContent(null);
                  setScheduleData(null);
                }}
                className="bg-gray-800 hover:bg-gray-900 text-white"
              >
                {t("common.done")}
              </Button>
            </div>
          </div>
        );
      case "import":
      default:
        return (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <Button
                  onClick={handleCreateFlashcardsQuizzes}
                  className="bg-gray-700 hover:bg-gray-800 text-white"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Flashcards & Quizzes
                </Button>
              </div>
              <ImportPanel
                onFileSelect={handleFileSelect}
                onTextImport={handleTextImport}
                isProcessing={isProcessingImport}
                processingProgress={processingProgress}
              />
            </div>

            <ContentLibrary
              onCreateContent={handleCreateContent}
              onStudyContent={handleStudyContent}
              onEditContent={(id) => {}}
              onDeleteContent={(id) => {}}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header
        userName="John Doe"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
        onOpenSettings={() => {}}
        onOpenSearch={() => {}}
      />

      <div className="bg-white dark:bg-gray-800 border-b border-[#dee2e6] dark:border-gray-700 p-2">
        <div className="flex gap-4">
          <Button
            variant={!showSchedule ? "default" : "outline"}
            onClick={() => {
              setShowSchedule(false);
              setWorkflowStep("import");
            }}
            className={
              !showSchedule
                ? "bg-[#343a40] text-white"
                : "text-[#495057] border-[#ced4da]"
            }
          >
            {t("app.dashboard")}
          </Button>
          <Button
            variant={showSchedule ? "default" : "outline"}
            onClick={() => setShowSchedule(true)}
            className={
              showSchedule
                ? "bg-[#343a40] text-white"
                : "text-[#495057] border-[#ced4da]"
            }
          >
            {t("library.title")}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/progress")}
            className="text-[#495057] border-[#ced4da]"
          >
            {t("flashcards.studyProgress")}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/recommendations")}
            className="text-[#495057] border-[#ced4da]"
          >
            {t("common.next")}
          </Button>
        </div>
      </div>

      {isStudying ? (
        <div className="flex-1 p-4">
          <FlashcardView
            title={`Study Set: ${currentStudySet}`}
            onBack={handleBackFromStudy}
            onComplete={() => {}}
          />
        </div>
      ) : showSchedule ? (
        <div className="flex-1">
          <ScheduleManager />
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-8 p-4 md:p-8">
          {renderWorkflowContent()}
        </div>
      )}

      <ImportDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onComplete={handleImportComplete}
      />
    </div>
  );
};

export default Home;
