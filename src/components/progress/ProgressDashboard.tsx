import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  BookOpen,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";

interface ProgressStats {
  totalLearningTime: number;
  sessionsCompleted: number;
  streakDays: number;
  masteryLevel: number;
  nextMilestone: string;
}

interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  lastStudied: string;
  totalItems: number;
  completedItems: number;
}

interface ProgressDashboardProps {
  stats?: ProgressStats;
  courseProgress?: CourseProgress[];
  onViewCourse?: (courseId: string) => void;
  onViewAllProgress?: () => void;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  stats = {
    totalLearningTime: 24.5,
    sessionsCompleted: 18,
    streakDays: 7,
    masteryLevel: 65,
    nextMilestone: "Advanced Learner",
  },
  courseProgress = [
    {
      id: "1",
      title: "Web Development Fundamentals",
      progress: 75,
      lastStudied: "Today",
      totalItems: 40,
      completedItems: 30,
    },
    {
      id: "2",
      title: "UX/UI Design Principles",
      progress: 45,
      lastStudied: "2 days ago",
      totalItems: 32,
      completedItems: 14,
    },
    {
      id: "3",
      title: "Data Science Basics",
      progress: 20,
      lastStudied: "1 week ago",
      totalItems: 50,
      completedItems: 10,
    },
  ],
  onViewCourse = () => {},
  onViewAllProgress = () => {},
}) => {
  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-[#6c757d]";
    if (progress < 70) return "bg-[#495057]";
    return "bg-[#343a40]";
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-white rounded-xl border border-[#dee2e6] shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#212529]">
            Learning Progress
          </h2>
          <p className="text-[#6c757d]">
            Track your achievements and learning journey
          </p>
        </div>
        <Button
          onClick={onViewAllProgress}
          variant="outline"
          className="text-[#495057] border-[#ced4da] hover:bg-[#f8f9fa]"
        >
          View detailed analytics
          <BarChart className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border border-[#dee2e6] bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#6c757d]">
              Total Learning Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-[#212529]">
                  {stats.totalLearningTime}
                </span>
                <span className="text-[#6c757d] ml-1">hours</span>
              </div>
              <Clock className="h-8 w-8 text-[#adb5bd]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#dee2e6] bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#6c757d]">
              Sessions Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-[#212529]">
                  {stats.sessionsCompleted}
                </span>
                <span className="text-[#6c757d] ml-1">sessions</span>
              </div>
              <CheckCircle className="h-8 w-8 text-[#adb5bd]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#dee2e6] bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#6c757d]">
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-[#212529]">
                  {stats.streakDays}
                </span>
                <span className="text-[#6c757d] ml-1">days</span>
              </div>
              <Calendar className="h-8 w-8 text-[#adb5bd]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#dee2e6] bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#6c757d]">
              Mastery Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between mb-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-[#212529]">
                  {stats.masteryLevel}%
                </span>
              </div>
              <Award className="h-8 w-8 text-[#adb5bd]" />
            </div>
            <div className="space-y-1">
              <Progress value={stats.masteryLevel} className="h-2" />
              <div className="flex justify-between text-xs text-[#6c757d]">
                <span>Next: {stats.nextMilestone}</span>
                <span className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+5% this week</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-medium text-[#343a40] mb-4">
        Course Progress
      </h3>

      <div className="space-y-4">
        {courseProgress.map((course) => (
          <div
            key={course.id}
            className="p-4 border border-[#dee2e6] rounded-lg bg-white hover:shadow-sm transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-[#212529]">{course.title}</h4>
                  <Badge
                    variant="outline"
                    className="bg-[#f8f9fa] text-[#6c757d] border-[#dee2e6] font-normal"
                  >
                    Last studied: {course.lastStudied}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6c757d]">
                      {course.completedItems} of {course.totalItems} items
                      completed
                    </span>
                    <span className="font-medium text-[#343a40]">
                      {course.progress}%
                    </span>
                  </div>
                  <Progress
                    value={course.progress}
                    className={`h-2 ${getProgressColor(course.progress)}`}
                  />
                </div>
              </div>

              <Button
                onClick={() => onViewCourse(course.id)}
                variant="outline"
                className="text-[#495057] border-[#ced4da] hover:bg-[#f8f9fa] whitespace-nowrap"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Continue Learning
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-6">
          <Button
            onClick={onViewAllProgress}
            variant="link"
            className="text-[#495057] hover:text-[#343a40]"
          >
            View all courses
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
