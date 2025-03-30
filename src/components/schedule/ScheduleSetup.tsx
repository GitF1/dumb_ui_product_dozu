import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  Sparkles,
  Loader2,
  BookOpen,
  FileQuestion,
  Gamepad2,
  MessageSquare,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

interface ScheduleSetupProps {
  contentTitle: string;
  contentType: string;
  estimatedTime?: number;
  onComplete: (scheduleData: any) => void;
  onBack: () => void;
}

const ScheduleSetup: React.FC<ScheduleSetupProps> = ({
  contentTitle,
  contentType,
  estimatedTime = 15,
  onComplete,
  onBack,
}) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [frequency, setFrequency] = useState("daily");
  const [preferredTime, setPreferredTime] = useState("18:00");
  const [sessionsPerWeek, setSessionsPerWeek] = useState("3");
  const [sessionDuration, setSessionDuration] = useState(
    estimatedTime.toString(),
  );
  const [selectedDays, setSelectedDays] = useState({
    monday: true,
    tuesday: false,
    wednesday: true,
    thursday: false,
    friday: true,
    saturday: false,
    sunday: false,
  });

  const handleDayToggle = (day: keyof typeof selectedDays) => {
    setSelectedDays({
      ...selectedDays,
      [day]: !selectedDays[day],
    });
  };

  const handleGenerateSchedule = () => {
    setIsGenerating(true);

    // Simulate schedule generation with progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);

          // Generate schedule data
          const scheduleData = {
            contentTitle,
            contentType,
            startDate,
            frequency,
            preferredTime,
            sessionsPerWeek: parseInt(sessionsPerWeek),
            sessionDuration: parseInt(sessionDuration),
            selectedDays,
            schedule: generateMockSchedule(),
          };

          onComplete(scheduleData);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateMockSchedule = () => {
    const schedule = [];
    const currentDate = startDate ? new Date(startDate) : new Date();

    // Generate 2 weeks of schedule
    for (let i = 0; i < 14; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);

      const dayName = date.toLocaleDateString("en-US", {
        weekday: "lowercase",
      }) as keyof typeof selectedDays;

      // Check if this day is selected for study
      if (
        frequency === "daily" ||
        (frequency === "custom" && selectedDays[dayName]) ||
        (frequency === "weekly" && i % 7 === 0)
      ) {
        schedule.push({
          id: `session-${i}`,
          title: contentTitle,
          date: new Date(date),
          startTime: preferredTime,
          endTime: addMinutesToTime(preferredTime, parseInt(sessionDuration)),
          completed: false,
        });
      }
    }

    return schedule;
  };

  const addMinutesToTime = (time: string, minutes: number) => {
    const [hours, mins] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMins.toString().padStart(2, "0")}`;
  };

  const getContentTypeIcon = () => {
    switch (contentType) {
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
          <CalendarIcon className="h-5 w-5 text-gray-700" />
          {t("schedule.setupTitle")}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {t("schedule.setupDescription", { contentTitle })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="py-10 space-y-6">
            <div className="text-center">
              <Loader2 className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {t("schedule.generating")}
              </h3>
              <p className="text-gray-500">
                {t("schedule.generatingDescription")}
              </p>
            </div>
            <Progress value={generationProgress} className="w-full h-2" />
            <p className="text-center text-gray-400 text-sm">
              {t("schedule.generatingProgress", {
                progress: generationProgress,
              })}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  {getContentTypeIcon()}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    {contentTitle}
                  </h3>
                  <p className="text-gray-600 text-sm capitalize">
                    {t(`learning.method.${contentType}`)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-gray-700">
                    {t("schedule.startDate")}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-gray-300"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>{t("schedule.pickDate")}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency" className="text-gray-700">
                    {t("schedule.frequency")}
                  </Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue
                        placeholder={t("schedule.selectFrequency")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">
                        {t("schedule.frequency.daily")}
                      </SelectItem>
                      <SelectItem value="weekly">
                        {t("schedule.frequency.weekly")}
                      </SelectItem>
                      <SelectItem value="custom">
                        {t("schedule.frequency.custom")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {frequency === "custom" && (
                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      {t("schedule.selectDays")}
                    </Label>
                    <div className="grid grid-cols-7 gap-2">
                      {Object.entries(selectedDays).map(([day, isSelected]) => (
                        <div
                          key={day}
                          className={`flex flex-col items-center justify-center p-2 rounded-md cursor-pointer border ${isSelected ? "bg-gray-800 text-white border-gray-800" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                          onClick={() =>
                            handleDayToggle(day as keyof typeof selectedDays)
                          }
                        >
                          <span className="text-xs uppercase">
                            {t(`schedule.days.${day.substring(0, 3)}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="preferredTime" className="text-gray-700">
                    {t("schedule.preferredTime")}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="preferredTime"
                      type="time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="border-gray-300 focus-visible:ring-gray-500"
                    />
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {frequency !== "daily" && frequency !== "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="sessionsPerWeek" className="text-gray-700">
                      {t("schedule.sessionsPerWeek")}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="sessionsPerWeek"
                        type="number"
                        min="1"
                        max="7"
                        value={sessionsPerWeek}
                        onChange={(e) => setSessionsPerWeek(e.target.value)}
                        className="border-gray-300 focus-visible:ring-gray-500"
                      />
                      <span className="text-gray-600">
                        {t("schedule.sessions")}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="sessionDuration" className="text-gray-700">
                    {t("schedule.sessionDuration")}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="sessionDuration"
                      type="number"
                      min="5"
                      max="120"
                      value={sessionDuration}
                      onChange={(e) => setSessionDuration(e.target.value)}
                      className="border-gray-300 focus-visible:ring-gray-500"
                    />
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{t("learning.minutes")}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mt-4">
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-gray-700" />
                    {t("schedule.recommendations")}
                  </h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>{t("schedule.recommendation1")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>{t("schedule.recommendation2")}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>{t("schedule.recommendation3")}</span>
                    </li>
                  </ul>
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
                onClick={handleGenerateSchedule}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6"
              >
                {t("schedule.generate")}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduleSetup;
