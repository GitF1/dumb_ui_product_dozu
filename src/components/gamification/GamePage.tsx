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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Star, Gamepad2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Challenge {
  name: string;
  description: string;
  completed?: boolean;
}

interface Level {
  name: string;
  points: number;
  challenges: number;
}

const GamePage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [gameContent, setGameContent] = useState<any>(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  useEffect(() => {
    // Get the game content from location state
    if (location.state?.content) {
      setGameContent(location.state.content);
      if (location.state.content.challenges) {
        setChallenges(
          location.state.content.challenges.map((c: Challenge) => ({
            ...c,
            completed: false,
          })),
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

  const handleCompleteChallenge = (index: number) => {
    if (!completedChallenges.includes(index)) {
      // Mark challenge as completed
      const newCompletedChallenges = [...completedChallenges, index];
      setCompletedChallenges(newCompletedChallenges);

      // Update challenges
      const newChallenges = [...challenges];
      newChallenges[index] = { ...newChallenges[index], completed: true };
      setChallenges(newChallenges);

      // Add points
      const pointsPerChallenge = 50;
      const newPoints = currentPoints + pointsPerChallenge;
      setCurrentPoints(newPoints);

      // Check if level up
      const levels = gameContent.levels || [];
      if (
        currentLevel < levels.length - 1 &&
        newPoints >= levels[currentLevel + 1].points
      ) {
        setCurrentLevel(currentLevel + 1);
      }
    }
  };

  const handleComplete = () => {
    // Navigate back to home after completing the game
    navigate("/home", {
      state: {
        completedStudy: true,
        studyType: "gamification",
        contentTitle: gameContent?.title,
        points: currentPoints,
        level: gameContent?.levels?.[currentLevel]?.name || "Beginner",
        completedChallenges: completedChallenges.length,
      },
    });
  };

  if (!gameContent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t("gamification.loading")}</p>
          <Button onClick={handleBack}>{t("common.back")}</Button>
        </div>
      </div>
    );
  }

  const levels = gameContent.levels || [];
  const currentLevelObj = levels[currentLevel] || {
    name: "Beginner",
    points: 100,
  };
  const nextLevelObj = levels[currentLevel + 1];
  const progressToNextLevel = nextLevelObj
    ? Math.min(
        100,
        ((currentPoints - currentLevelObj.points) /
          (nextLevelObj.points - currentLevelObj.points)) *
          100,
      )
    : 100;

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

      <div className="max-w-[1000px] mx-auto">
        <Card className="bg-white mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl text-gray-800">
                  {gameContent.title || t("gamification.defaultTitle")}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {gameContent.description ||
                    t("gamification.defaultDescription")}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1"
                >
                  <Trophy className="h-3 w-3" />
                  {currentPoints} {t("gamification.points")}
                </Badge>
                <Badge className="bg-gray-800 text-white flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {currentLevelObj.name}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">{currentLevelObj.name}</span>
                {nextLevelObj && (
                  <span className="text-gray-600">{nextLevelObj.name}</span>
                )}
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-500">
                  {currentPoints} /{" "}
                  {nextLevelObj?.points || currentLevelObj.points}
                </span>
                <span className="text-gray-500">
                  {nextLevelObj
                    ? t("gamification.pointsToNextLevel", {
                        points: nextLevelObj.points - currentPoints,
                      })
                    : t("gamification.maxLevelReached")}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-gray-700" />
              {t("gamification.challenges")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.map((challenge, index) => (
                <Card
                  key={index}
                  className={`border ${challenge.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {challenge.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {challenge.description}
                        </p>
                      </div>
                      {challenge.completed ? (
                        <Badge className="bg-green-600 text-white">
                          {t("gamification.completed")}
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleCompleteChallenge(index)}
                          className="bg-gray-800 hover:bg-gray-900 text-white text-xs"
                        >
                          {t("gamification.complete")}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              onClick={handleComplete}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
            >
              {t("common.finish")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default GamePage;
