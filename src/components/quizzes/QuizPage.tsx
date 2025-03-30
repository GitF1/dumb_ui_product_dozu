import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

const QuizPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [quizContent, setQuizContent] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Get the quiz content from location state
    if (location.state?.content) {
      setQuizContent(location.state.content);
      // Initialize answers array with nulls
      if (location.state.content.questions) {
        setAnswers(
          new Array(location.state.content.questions.length).fill(null),
        );
      }
    } else {
      // If no content is provided, redirect back to home
      navigate("/home");
    }
  }, [location.state, navigate]);

  const handleBack = () => {
    navigate("/home");
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      // Save the answer
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(newAnswers);

      // Move to next question or show results
      if (currentQuestionIndex < (quizContent?.questions?.length || 0) - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        // Calculate score
        let correctAnswers = 0;
        newAnswers.forEach((answer, index) => {
          if (answer === quizContent.questions[index].answer) {
            correctAnswers++;
          }
        });
        setScore(correctAnswers);
        setShowResults(true);
      }
    }
  };

  const handleComplete = () => {
    // Navigate back to home after completing the quiz
    navigate("/home", {
      state: {
        completedStudy: true,
        studyType: "quizzes",
        contentTitle: quizContent?.title,
        score: score,
        totalQuestions: quizContent?.questions?.length || 0,
      },
    });
  };

  if (!quizContent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t("quizzes.loading")}</p>
          <Button onClick={handleBack}>{t("common.back")}</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizContent.questions?.[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / (quizContent.questions?.length || 1)) * 100;

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

      <Card className="w-full max-w-[800px] mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">
            {quizContent.title || t("quizzes.defaultTitle")}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {showResults
              ? t("quizzes.resultsDescription")
              : t("quizzes.questionProgress", {
                  current: currentQuestionIndex + 1,
                  total: quizContent.questions?.length || 0,
                })}
          </CardDescription>
          {!showResults && <Progress value={progress} className="h-2 mt-2" />}
        </CardHeader>

        <CardContent>
          {showResults ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {t("quizzes.quizComplete")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("quizzes.scoreResult", {
                  score,
                  total: quizContent.questions?.length || 0,
                })}
              </p>
              <div className="text-left p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                <h4 className="font-medium text-gray-800 mb-3">
                  {t("quizzes.summary")}
                </h4>
                {quizContent.questions?.map(
                  (question: QuizQuestion, index: number) => (
                    <div key={index} className="mb-3 last:mb-0">
                      <p className="text-sm font-medium text-gray-700">
                        {question.question}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-600 mr-2">
                          {t("quizzes.yourAnswer")}:
                        </span>
                        <span
                          className={`text-sm font-medium ${answers[index] === question.answer ? "text-green-600" : "text-red-600"}`}
                        >
                          {answers[index] !== null
                            ? question.options[answers[index]]
                            : t("quizzes.noAnswer")}
                        </span>
                      </div>
                      {answers[index] !== question.answer && (
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-600 mr-2">
                            {t("quizzes.correctAnswer")}:
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            {question.options[question.answer]}
                          </span>
                        </div>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          ) : currentQuestion ? (
            <div className="py-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                {currentQuestion.question}
              </h3>

              <RadioGroup
                value={selectedAnswer?.toString()}
                className="space-y-3"
              >
                {currentQuestion.options.map(
                  (option: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                        onClick={() => handleAnswerSelect(index)}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="text-gray-700"
                      >
                        {option}
                      </Label>
                    </div>
                  ),
                )}
              </RadioGroup>
            </div>
          ) : (
            <p className="py-4 text-gray-600">{t("quizzes.noQuestions")}</p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {showResults ? (
            <Button
              onClick={handleComplete}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
            >
              {t("common.finish")}
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="ml-auto flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white"
            >
              {currentQuestionIndex < (quizContent.questions?.length || 0) - 1
                ? t("common.next")
                : t("quizzes.seeResults")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizPage;
