import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  FileQuestion,
  Gamepad2,
  MessageSquare,
  Sparkles,
  Loader2,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { LearningMethod } from "./LearningSuggestion";

interface ContentGenerationProps {
  contentTitle?: string;
  selectedMethod: LearningMethod;
  onComplete: (generatedContent: any) => void;
  onBack: () => void;
}

const ContentGeneration: React.FC<ContentGenerationProps> = ({
  contentTitle = "Your Content",
  selectedMethod,
  onComplete,
  onBack,
}) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [title, setTitle] = useState(contentTitle);
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [estimatedTime, setEstimatedTime] = useState("15");

  // Loading messages for different stages
  const loadingMessages = [
    [
      t("learning.loading.analyzing", "Analyzing your content requirements..."),
      t("learning.loading.preparing", "Preparing your learning materials..."),
      t(
        "learning.loading.structuring",
        "Structuring content for optimal learning...",
      ),
    ],
    [
      t("learning.loading.generating", "Generating personalized content..."),
      t("learning.loading.optimizing", "Optimizing for your learning style..."),
      t("learning.loading.formatting", "Formatting your learning materials..."),
    ],
    [
      t("learning.loading.finalizing", "Finalizing your content..."),
      t("learning.loading.polishing", "Adding finishing touches..."),
      t("learning.loading.almostDone", "Almost done..."),
    ],
    [
      t(
        "learning.loading.tips.1",
        "Tip: Regular review improves retention by 80%",
      ),
      t(
        "learning.loading.tips.2",
        "Tip: Studying in 25-minute blocks maximizes focus",
      ),
      t(
        "learning.loading.tips.3",
        "Tip: Teaching others what you learn boosts your understanding",
      ),
      t(
        "learning.loading.tips.4",
        "Tip: Taking short breaks between study sessions improves memory",
      ),
    ],
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setLoadingStage(0);
    setLoadingMessage(
      loadingMessages[0][Math.floor(Math.random() * loadingMessages[0].length)],
    );

    // Simulate content generation with progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        // Update loading stage and message based on progress
        if (prev === 0) {
          setLoadingStage(0);
          setLoadingMessage(
            loadingMessages[0][
              Math.floor(Math.random() * loadingMessages[0].length)
            ],
          );
        } else if (prev === 30) {
          setLoadingStage(1);
          setLoadingMessage(
            loadingMessages[1][
              Math.floor(Math.random() * loadingMessages[1].length)
            ],
          );
        } else if (prev === 60) {
          setLoadingStage(2);
          setLoadingMessage(
            loadingMessages[2][
              Math.floor(Math.random() * loadingMessages[2].length)
            ],
          );
        } else if (prev === 85) {
          setLoadingStage(3);
          setLoadingMessage(
            loadingMessages[3][
              Math.floor(Math.random() * loadingMessages[3].length)
            ],
          );
        }

        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);

          // Mock generated content based on the selected method
          let generatedContent;

          if (selectedMethod.id === "flashcards") {
            generatedContent = {
              type: "flashcards",
              title,
              description,
              difficulty,
              estimatedTime: parseInt(estimatedTime),
              cards: [
                { front: "What is HTML?", back: "HyperText Markup Language" },
                { front: "What is CSS?", back: "Cascading Style Sheets" },
                {
                  front: "What is JavaScript?",
                  back: "A programming language for the web",
                },
                {
                  front: "What is React?",
                  back: "A JavaScript library for building user interfaces",
                },
                {
                  front: "What is a component?",
                  back: "A reusable piece of code that returns UI elements",
                },
              ],
            };
          } else if (selectedMethod.id === "quizzes") {
            generatedContent = {
              type: "quizzes",
              title,
              description,
              difficulty,
              estimatedTime: parseInt(estimatedTime),
              questions: [
                {
                  question: "Which language is used for styling web pages?",
                  options: ["HTML", "CSS", "JavaScript", "Python"],
                  answer: 1,
                },
                {
                  question:
                    "Which of the following is NOT a JavaScript framework?",
                  options: ["React", "Angular", "Vue", "Django"],
                  answer: 3,
                },
                {
                  question: "What does API stand for?",
                  options: [
                    "Application Programming Interface",
                    "Automated Program Integration",
                    "Advanced Programming Implementation",
                    "Application Process Integration",
                  ],
                  answer: 0,
                },
              ],
            };
          } else if (selectedMethod.id === "gamification") {
            generatedContent = {
              type: "gamification",
              title,
              description,
              difficulty,
              estimatedTime: parseInt(estimatedTime),
              levels: [
                { name: "Beginner", points: 100, challenges: 3 },
                { name: "Intermediate", points: 200, challenges: 5 },
                { name: "Advanced", points: 300, challenges: 7 },
              ],
              challenges: [
                {
                  name: "HTML Basics",
                  description: "Complete the HTML structure",
                },
                { name: "CSS Styling", description: "Style the webpage" },
                { name: "JavaScript Logic", description: "Add interactivity" },
              ],
            };
          } else if (selectedMethod.id === "chatting") {
            generatedContent = {
              type: "chatting",
              title,
              description,
              difficulty,
              estimatedTime: parseInt(estimatedTime),
              topics: [
                "Introduction to Web Development",
                "HTML Structure and Elements",
                "CSS Styling and Layouts",
                "JavaScript Basics",
                "Building Interactive Websites",
              ],
              sampleQuestions: [
                "What is the difference between HTML and CSS?",
                "How do I create a responsive layout?",
                "What are JavaScript event listeners?",
                "How do I debug my code?",
              ],
            };
          }

          onComplete(generatedContent);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const getMethodIcon = () => {
    switch (selectedMethod.id) {
      case "flashcards":
        return <BookOpen className="h-5 w-5 text-gray-700" />;
      case "quizzes":
        return <FileQuestion className="h-5 w-5 text-gray-700" />;
      case "gamification":
        return <Gamepad2 className="h-5 w-5 text-gray-700" />;
      case "chatting":
        return <MessageSquare className="h-5 w-5 text-gray-700" />;
      default:
        return <Sparkles className="h-5 w-5 text-gray-700" />;
    }
  };

  return (
    <Card className="w-full max-w-[1200px] mx-auto bg-gray-50">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
          {getMethodIcon()}
          {t("learning.generateContent", { method: selectedMethod.name })}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {t("learning.generateContentDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="py-10 space-y-6">
            <div className="text-center">
              <div className="relative mx-auto w-24 h-24 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-16 w-16 text-gray-400 animate-spin" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {loadingStage >= 1 && (
                    <CheckCircle className="h-5 w-5 text-gray-500 absolute top-2 right-1" />
                  )}
                  {loadingStage >= 2 && (
                    <CheckCircle className="h-5 w-5 text-gray-500 absolute bottom-2 right-1" />
                  )}
                  {loadingStage >= 3 && (
                    <CheckCircle className="h-5 w-5 text-gray-500 absolute bottom-2 left-1" />
                  )}
                  {generationProgress >= 95 && (
                    <CheckCircle className="h-5 w-5 text-gray-500 absolute top-2 left-1" />
                  )}
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {t("learning.generatingContent")}
              </h3>
              <div className="min-h-[48px] flex items-center justify-center">
                <p className="text-gray-600 max-w-md transition-opacity duration-500">
                  {loadingMessage}
                </p>
              </div>
            </div>

            <div className="max-w-md mx-auto w-full space-y-2">
              <Progress
                value={generationProgress}
                className="w-full h-3 rounded-full transition-all duration-700 ease-in-out"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{t("learning.analyzing")}</span>
                <span>{t("learning.generating")}</span>
                <span>{t("learning.finalizing")}</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 text-gray-400 text-sm mt-4">
              <Clock className="h-4 w-4" />
              <p>
                {t("learning.estimatedTimeRemaining", {
                  time: Math.ceil((100 - generationProgress) / 10),
                })}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  {getMethodIcon()}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    {selectedMethod.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {selectedMethod.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700">
                  {t("learning.contentTitle")}
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-gray-300 focus-visible:ring-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700">
                  {t("learning.contentDescription")}
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("learning.contentDescriptionPlaceholder")}
                  className="min-h-[100px] border-gray-300 focus-visible:ring-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-gray-700">
                    {t("learning.contentDifficulty")}
                  </Label>
                  <div className="flex gap-4">
                    {["easy", "medium", "hard"].map((level) => (
                      <Button
                        key={level}
                        type="button"
                        variant={difficulty === level ? "default" : "outline"}
                        onClick={() => setDifficulty(level)}
                        className={`flex-1 capitalize ${difficulty === level ? "bg-gray-800 hover:bg-gray-900" : "text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                      >
                        {t(`learning.difficulty.${level}`)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedTime" className="text-gray-700">
                    {t("learning.estimatedTime")}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="estimatedTime"
                      type="number"
                      min="5"
                      max="120"
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                      className="border-gray-300 focus-visible:ring-gray-500"
                    />
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{t("learning.minutes")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                onClick={onBack}
                variant="outline"
                className="text-gray-700 border-gray-300"
              >
                {t("common.back")}
              </Button>
              <Button
                onClick={handleGenerate}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6"
              >
                {t("learning.generateContent", { method: "" })}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentGeneration;
