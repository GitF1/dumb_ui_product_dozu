import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import NextLearningContent from "./recommendations/NextLearningContent";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  FileQuestion,
  Gamepad2,
  MessageSquare,
  PlusCircle,
  Calendar,
  Library,
  Sparkles,
  Clock,
  Target,
  TrendingUp,
  Play,
  ArrowRight,
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

  // Mock data for current learning
  const currentLearning = {
    topic: "Advanced JavaScript Concepts",
    module: "Closures and Scope",
    progress: 65,
    timeRemaining: "25 min",
    nextSession: "Today, 3:00 PM",
    difficulty: "Advanced",
  };

  const renderMainDashboard = () => {
    return (
      <div className="space-y-8">
        {/* Component 1: Header with 3 Core Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-800">
                View Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Manage your learning timeline and track progress across all
                topics.
              </p>
              <Button
                onClick={() => setShowSchedule(true)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                Open Schedule
              </Button>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                  <Library className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Manage Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Organize your learning materials, flashcards, and study content.
              </p>
              <Button
                onClick={() => navigate("/library")}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                Open Library
              </Button>
            </CardContent>
          </Card>

          <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Generate Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Create new learning materials with AI-powered content
                generation.
              </p>
              <Button
                onClick={handleCreateFlashcardsQuizzes}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                Create Content
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Component 2: Current Learning Topic */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-700 text-white border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Current Learning
                  </CardTitle>
                  <p className="text-gray-300">
                    Based on your timeline schedule
                  </p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                {currentLearning.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {currentLearning.topic}
                  </h3>
                  <p className="text-gray-300">
                    Module: {currentLearning.module}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{currentLearning.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ width: `${currentLearning.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{currentLearning.timeRemaining} remaining</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{currentLearning.nextSession}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-end">
                <Button
                  onClick={() => handleStudyContent("current")}
                  size="lg"
                  className="bg-white text-gray-800 hover:bg-gray-100 font-semibold px-8"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Continue Learning
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component 3: Recommended Topics */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-800 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Recommended for You
              </h2>
              <p className="text-gray-600">
                Personalized learning suggestions based on your progress
              </p>
            </div>
          </div>
          <NextLearningContent
            onSelectContent={(contentId) => {
              console.log("Selected content:", contentId);
              // Handle content selection
            }}
          />
        </div>
      </div>
    );
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
        return renderMainDashboard();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header
        userName="John Doe"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
        onOpenSettings={() => {}}
        onOpenSearch={() => {}}
      />

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
        <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
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
