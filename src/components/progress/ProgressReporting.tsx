import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  BarChart3,
  CalendarDays,
  Clock,
  Download,
  FileText,
  PieChart,
  Printer,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";

interface ProgressReportingProps {
  onExport?: (
    format: string,
    period: string,
    startDate?: Date,
    endDate?: Date,
  ) => void;
  onShare?: () => void;
  onPrint?: () => void;
}

const ProgressReporting: React.FC<ProgressReportingProps> = ({
  onExport = () => {},
  onShare = () => {},
  onPrint = () => {},
}) => {
  const [period, setPeriod] = useState<"week" | "month" | "year">("week");
  const [date, setDate] = useState<Date>(new Date());
  const [exportFormat, setExportFormat] = useState<string>("pdf");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Sample data for charts and statistics
  const learningMethods = [
    { method: "Flashcards", hours: 12, percentage: 40 },
    { method: "Notes", hours: 6, percentage: 20 },
    { method: "Quizzes", hours: 9, percentage: 30 },
    { method: "Videos", hours: 3, percentage: 10 },
  ];

  const completedTopics = [
    { topic: "Web Development", items: 24, progress: 80 },
    { topic: "UX/UI Design", items: 18, progress: 60 },
    { topic: "Data Science", items: 12, progress: 40 },
    { topic: "JavaScript", items: 30, progress: 90 },
  ];

  const weeklyHours = [4.5, 3.2, 5.0, 2.8, 6.1, 3.5, 2.0];
  const totalHours = weeklyHours.reduce((sum, hours) => sum + hours, 0);
  const averageHours = totalHours / weeklyHours.length;

  const reflections = [
    {
      date: "2023-09-15",
      text: "Made significant progress in JavaScript fundamentals. Need to focus more on practical exercises.",
    },
    {
      date: "2023-09-10",
      text: "Struggled with React hooks concepts. Will revisit with additional resources.",
    },
    {
      date: "2023-09-05",
      text: "Completed CSS Grid module with excellent quiz results. Ready to move to advanced topics.",
    },
  ];

  const handleExport = () => {
    onExport(exportFormat, period, date, date);
  };

  const getPeriodLabel = () => {
    switch (period) {
      case "week":
        return `Week of ${format(date, "MMM d, yyyy")}`;
      case "month":
        return format(date, "MMMM yyyy");
      case "year":
        return format(date, "yyyy");
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-white rounded-xl border border-[#dee2e6] shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#212529]">
            Learning Progress Report
          </h2>
          <p className="text-[#6c757d]">
            Track your learning journey and export detailed reports
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Popover open={showCalendar} onOpenChange={setShowCalendar}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-[#495057] border-[#ced4da] hover:bg-[#f8f9fa]"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {getPeriodLabel()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  if (date) {
                    setDate(date);
                    setShowCalendar(false);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select
            value={period}
            onValueChange={(value) =>
              setPeriod(value as "week" | "month" | "year")
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="w-full md:w-auto bg-gray-200">
          <TabsTrigger value="overview" className="flex-1 md:flex-none">
            Overview
          </TabsTrigger>
          <TabsTrigger value="methods" className="flex-1 md:flex-none">
            Learning Methods
          </TabsTrigger>
          <TabsTrigger value="topics" className="flex-1 md:flex-none">
            Completed Topics
          </TabsTrigger>
          <TabsTrigger value="reflections" className="flex-1 md:flex-none">
            Reflections
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border border-[#dee2e6] bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#6c757d]">
                  Total Study Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-[#212529]">
                      {totalHours.toFixed(1)}
                    </span>
                    <span className="text-[#6c757d] ml-1">hours</span>
                  </div>
                  <Clock className="h-8 w-8 text-[#adb5bd]" />
                </div>
                <div className="mt-4 text-xs text-[#6c757d] flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-[#28a745]" />
                  <span>+12% from previous {period}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#dee2e6] bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#6c757d]">
                  Average Daily Study
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-[#212529]">
                      {averageHours.toFixed(1)}
                    </span>
                    <span className="text-[#6c757d] ml-1">hours/day</span>
                  </div>
                  <Users className="h-8 w-8 text-[#adb5bd]" />
                </div>
                <div className="mt-4 text-xs text-[#6c757d] flex items-center">
                  <span>Top 15% of all users</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#dee2e6] bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-[#6c757d]">
                  Completed Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-[#212529]">
                      84
                    </span>
                    <span className="text-[#6c757d] ml-1">items</span>
                  </div>
                  <FileText className="h-8 w-8 text-[#adb5bd]" />
                </div>
                <div className="mt-4 text-xs text-[#6c757d] flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-[#28a745]" />
                  <span>+8 items from previous {period}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-[#dee2e6] bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-[#343a40]">
                  <div className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    <span>Daily Study Hours</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-end justify-between gap-2">
                  {weeklyHours.map((hours, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-[#4c6ef5] rounded-t-sm"
                        style={{
                          height: `${(hours / Math.max(...weeklyHours)) * 200}px`,
                        }}
                      ></div>
                      <div className="text-xs text-[#6c757d] mt-2">
                        {
                          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                            index
                          ]
                        }
                      </div>
                      <div className="text-xs font-medium text-[#495057]">
                        {hours}h
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#dee2e6] bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-[#343a40]">
                  <div className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    <span>Learning Methods Distribution</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[150px] h-[150px] rounded-full bg-white"></div>
                    </div>
                    {learningMethods.map((method, index) => {
                      const rotation =
                        index > 0
                          ? learningMethods
                              .slice(0, index)
                              .reduce((sum, m) => sum + m.percentage, 0)
                          : 0;
                      return (
                        <div
                          key={method.method}
                          className="absolute inset-0"
                          style={{
                            clipPath: `conic-gradient(from ${rotation}deg, transparent ${method.percentage}%, transparent 0)`,
                            background: [
                              "#4c6ef5",
                              "#51cf66",
                              "#fa5252",
                              "#fab005",
                            ][index % 4],
                            transform: `rotate(${rotation}deg)`,
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {learningMethods.map((method, index) => (
                    <div key={method.method} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: [
                            "#4c6ef5",
                            "#51cf66",
                            "#fa5252",
                            "#fab005",
                          ][index % 4],
                        }}
                      ></div>
                      <span className="text-sm text-[#495057]">
                        {method.method}
                      </span>
                      <span className="text-sm font-medium text-[#343a40] ml-auto">
                        {method.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Learning Methods Tab */}
        <TabsContent value="methods" className="mt-6">
          <Card className="border border-[#dee2e6] bg-white mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-[#343a40]">
                Learning Methods Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningMethods.map((method) => (
                  <div key={method.method} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-medium text-[#343a40]">
                          {method.method}
                        </span>
                        <Badge className="ml-2 bg-[#e9ecef] text-[#495057]">
                          {method.hours} hours
                        </Badge>
                      </div>
                      <span className="text-[#495057]">
                        {method.percentage}%
                      </span>
                    </div>
                    <Progress value={method.percentage} className="h-2" />
                    <div className="text-sm text-[#6c757d]">
                      {method.method === "Flashcards" &&
                        "Most effective for memorization and quick recall"}
                      {method.method === "Notes" &&
                        "Helps with organizing concepts and deeper understanding"}
                      {method.method === "Quizzes" &&
                        "Great for testing knowledge and identifying gaps"}
                      {method.method === "Videos" &&
                        "Visual learning helps with complex concepts"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-[#dee2e6] bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-[#343a40]">
                  Effectiveness Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#495057]">Flashcards</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={star <= 4 ? "#fab005" : "none"}
                          stroke={star <= 4 ? "#fab005" : "#adb5bd"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#495057]">Notes</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={star <= 3 ? "#fab005" : "none"}
                          stroke={star <= 3 ? "#fab005" : "#adb5bd"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#495057]">Quizzes</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={star <= 5 ? "#fab005" : "none"}
                          stroke={star <= 5 ? "#fab005" : "#adb5bd"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#495057]">Videos</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={star <= 3 ? "#fab005" : "none"}
                          stroke={star <= 3 ? "#fab005" : "#adb5bd"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#dee2e6] bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-[#343a40]">
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-[#e9ecef] rounded-md">
                    <h4 className="font-medium text-[#343a40] mb-1">
                      Increase Quiz Usage
                    </h4>
                    <p className="text-sm text-[#495057]">
                      Based on your learning patterns, quizzes are your most
                      effective method. Consider increasing quiz-based learning
                      by 15%.
                    </p>
                  </div>
                  <div className="p-3 bg-[#e9ecef] rounded-md">
                    <h4 className="font-medium text-[#343a40] mb-1">
                      Combine Methods
                    </h4>
                    <p className="text-sm text-[#495057]">
                      Try combining flashcards with note-taking for better
                      retention. Create flashcards from your notes for key
                      concepts.
                    </p>
                  </div>
                  <div className="p-3 bg-[#e9ecef] rounded-md">
                    <h4 className="font-medium text-[#343a40] mb-1">
                      Explore New Methods
                    </h4>
                    <p className="text-sm text-[#495057]">
                      Consider trying mind mapping or the Feynman technique to
                      diversify your learning approaches.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Completed Topics Tab */}
        <TabsContent value="topics" className="mt-6">
          <Card className="border border-[#dee2e6] bg-white mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-[#343a40]">
                Completed Topics Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {completedTopics.map((topic) => (
                  <div key={topic.topic} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-medium text-[#343a40]">
                          {topic.topic}
                        </span>
                        <Badge className="ml-2 bg-[#e9ecef] text-[#495057]">
                          {topic.items} items
                        </Badge>
                      </div>
                      <span className="text-[#495057]">{topic.progress}%</span>
                    </div>
                    <Progress value={topic.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-[#6c757d]">
                      <span>Started: Sep 1, 2023</span>
                      <span>Last studied: Sep 15, 2023</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-[#dee2e6] bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-[#343a40]">
                  Topic Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-[#f8f9fa] rounded-md">
                  <h4 className="font-medium text-[#343a40] mb-2">
                    Related Topics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#495057]">Web Development</span>
                      <div className="flex space-x-1">
                        <Badge className="bg-[#e9ecef] text-[#495057]">
                          JavaScript
                        </Badge>
                        <Badge className="bg-[#e9ecef] text-[#495057]">
                          UX/UI
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#495057]">UX/UI Design</span>
                      <div className="flex space-x-1">
                        <Badge className="bg-[#e9ecef] text-[#495057]">
                          Web Dev
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#495057]">Data Science</span>
                      <div className="flex space-x-1">
                        <Badge className="bg-[#e9ecef] text-[#495057]">
                          JavaScript
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-[#f8f9fa] rounded-md">
                  <h4 className="font-medium text-[#343a40] mb-2">
                    Suggested Next Topics
                  </h4>
                  <ul className="space-y-2 text-[#495057]">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#4c6ef5] mr-2"></div>
                      React Framework
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#4c6ef5] mr-2"></div>
                      Advanced CSS Animations
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#4c6ef5] mr-2"></div>
                      Data Visualization
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#dee2e6] bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-[#343a40]">
                  Mastery Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-[#343a40] mb-2">
                      Strengths
                    </h4>
                    <div className="p-3 bg-[#d4edda] text-[#155724] rounded-md">
                      <ul className="space-y-1 list-disc list-inside text-sm">
                        <li>Strong understanding of JavaScript fundamentals</li>
                        <li>Excellent progress in CSS Grid and Flexbox</li>
                        <li>Good grasp of UX principles and user testing</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#343a40] mb-2">
                      Areas for Improvement
                    </h4>
                    <div className="p-3 bg-[#f8d7da] text-[#721c24] rounded-md">
                      <ul className="space-y-1 list-disc list-inside text-sm">
                        <li>React hooks concepts need reinforcement</li>
                        <li>
                          Data visualization techniques require more practice
                        </li>
                        <li>Backend integration knowledge is limited</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#343a40] mb-2">
                      Overall Mastery
                    </h4>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <Progress value={68} className="h-2" />
                      </div>
                      <span className="ml-2 font-medium text-[#343a40]">
                        68%
                      </span>
                    </div>
                    <p className="text-xs text-[#6c757d] mt-1">
                      Based on quiz scores, completion rates, and study
                      consistency
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reflections Tab */}
        <TabsContent value="reflections" className="mt-6">
          <Card className="border border-[#dee2e6] bg-white mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-[#343a40]">
                Learning Reflections & Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reflections.map((reflection, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#f8f9fa] rounded-md border border-[#dee2e6]"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[#495057]">
                        {new Date(reflection.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <Badge className="bg-[#e9ecef] text-[#495057]">
                        Reflection
                      </Badge>
                    </div>
                    <p className="text-[#212529]">{reflection.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-[#343a40] mb-2">
                  Add New Reflection
                </h4>
                <Textarea
                  placeholder="What did you learn today? What worked well? What could be improved?"
                  className="min-h-[100px] border-[#ced4da] focus-visible:ring-[#495057]"
                />
                <div className="flex justify-end mt-2">
                  <Button className="bg-[#343a40] hover:bg-[#212529] text-white">
                    Save Reflection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#dee2e6] bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-[#343a40]">
                Improvement Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-[#f8f9fa] rounded-md border border-[#dee2e6]">
                  <h4 className="font-medium text-[#343a40] mb-2">
                    Short-term Goals (Next 2 Weeks)
                  </h4>
                  <ul className="space-y-2 text-[#495057]">
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded border border-[#ced4da] mt-0.5 mr-2 flex-shrink-0"></div>
                      <span>
                        Complete React Hooks module with 90% quiz score
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded border border-[#ced4da] mt-0.5 mr-2 flex-shrink-0"></div>
                      <span>
                        Build a small project using CSS Grid and Flexbox
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded border border-[#ced4da] mt-0.5 mr-2 flex-shrink-0"></div>
                      <span>Increase daily study time to 2 hours minimum</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#f8f9fa] rounded-md border border-[#dee2e6]">
                  <h4 className="font-medium text-[#343a40] mb-2">
                    Long-term Goals (Next 3 Months)
                  </h4>
                  <ul className="space-y-2 text-[#495057]">
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded border border-[#ced4da] mt-0.5 mr-2 flex-shrink-0"></div>
                      <span>
                        Complete full-stack web development curriculum
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded border border-[#ced4da] mt-0.5 mr-2 flex-shrink-0"></div>
                      <span>Build portfolio with 3 comprehensive projects</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded border border-[#ced4da] mt-0.5 mr-2 flex-shrink-0"></div>
                      <span>
                        Achieve 80% overall mastery score across all topics
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#f8f9fa] rounded-md border border-[#dee2e6]">
                  <h4 className="font-medium text-[#343a40] mb-2">
                    Study Habit Improvements
                  </h4>
                  <ul className="space-y-2 text-[#495057]">
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded border border-[#ced4da] mt-0.5 mr-2 flex-shrink-0"></div>
                      <span>
                        Implement Pomodoro technique (25 min work, 5 min break)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded border border-[#ced4da] mt-0.5 mr-2 flex-shrink-0"></div>
                      <span>Create distraction-free study environment</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded border border-[#ced4da] mt-0.5 mr-2 flex-shrink-0"></div>
                      <span>Review material within 24 hours of learning</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#dee2e6]">
        <div className="text-sm text-[#6c757d]">
          Report generated on {format(new Date(), "MMMM d, yyyy")}
        </div>

        <div className="flex items-center gap-2">
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xlsx">Excel</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="text-[#495057] border-[#ced4da] hover:bg-[#f8f9fa]"
            onClick={onPrint}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>

          <Button
            variant="outline"
            className="text-[#495057] border-[#ced4da] hover:bg-[#f8f9fa]"
            onClick={onShare}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>

          <Button
            className="bg-[#343a40] hover:bg-[#212529] text-white"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressReporting;
