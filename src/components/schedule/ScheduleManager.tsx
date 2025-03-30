import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface ScheduleEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  status: "Pending" | "Completed" | "Cancelled";
  description?: string;
  learningMethod?: "flashcards" | "quizzes" | "game" | "chat";
  content?: any;
}

interface ScheduleManagerProps {
  events?: ScheduleEvent[];
  onAddEvent?: (event: Omit<ScheduleEvent, "id">) => void;
  onUpdateEvent?: (event: ScheduleEvent) => void;
  onDeleteEvent?: (eventId: string) => void;
}

const ScheduleManager: React.FC<ScheduleManagerProps> = ({
  events = [
    {
      id: "1",
      title: "React Fundamentals",
      date: new Date(2025, 0, 1),
      time: "9:00 AM",
      status: "Pending" as const,
      description: "Learn React basics",
      learningMethod: "flashcards",
      content: {
        title: "React Fundamentals",
        cards: [
          {
            front: "What is JSX?",
            back: "JavaScript XML - A syntax extension for JavaScript that looks similar to HTML",
          },
          {
            front: "What is a React component?",
            back: "A reusable piece of code that returns React elements describing what should appear on the screen",
          },
          {
            front: "What is state in React?",
            back: "An object that determines how a component renders and behaves",
          },
        ],
      },
    },
    {
      id: "2",
      title: "JavaScript Advanced Concepts",
      date: new Date(2025, 0, 3),
      time: "2:00 PM",
      status: "Pending" as const,
      description: "Deep dive into JavaScript",
      learningMethod: "quizzes",
      content: {
        title: "JavaScript Advanced Concepts",
        questions: [
          {
            question: "What is a Promise in JavaScript?",
            options: [
              "An object representing the eventual completion or failure of an asynchronous operation",
              "A guarantee that a function will execute",
              "A type of variable declaration",
              "A special type of loop",
            ],
            answer: 0,
          },
          {
            question: "What does the 'this' keyword refer to in JavaScript?",
            options: [
              "The current function",
              "The global object",
              "The object the method is called on",
              "It depends on how the function is called",
            ],
            answer: 3,
          },
        ],
      },
    },
  ],
  onAddEvent = () => {},
  onUpdateEvent = () => {},
  onDeleteEvent = () => {},
}) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"Month" | "Week" | "Day">("Month");
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(
    null,
  );
  const [newEvent, setNewEvent] = useState<Omit<ScheduleEvent, "id">>({
    title: "",
    date: new Date(),
    time: "",
    status: "Pending",
    description: "",
    learningMethod: "flashcards",
    content: null,
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setCurrentDate(date);
    }
  };

  const handleAddEvent = () => {
    onAddEvent(newEvent);
    resetNewEvent();
    setShowTaskDetails(false);
  };

  const handleUpdateEvent = () => {
    if (selectedEvent) {
      onUpdateEvent(selectedEvent);
      setShowTaskDetails(false);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      onDeleteEvent(selectedEvent.id);
      setShowTaskDetails(false);
    }
  };

  const handleStartLearning = () => {
    if (
      selectedEvent &&
      selectedEvent.learningMethod &&
      selectedEvent.content
    ) {
      // Navigate to the appropriate learning page based on the learning method
      navigate(`/${selectedEvent.learningMethod}`, {
        state: { content: selectedEvent.content },
      });
      setShowTaskDetails(false);
    }
  };

  const resetNewEvent = () => {
    setNewEvent({
      title: "",
      date: new Date(),
      time: "",
      status: "Pending",
      description: "",
      learningMethod: "flashcards",
      content: null,
    });
  };

  const openNewTaskDialog = () => {
    setSelectedEvent(null);
    resetNewEvent();
    setShowTaskDetails(true);
  };

  const openTaskDetails = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    setShowTaskDetails(true);
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const getDayEvents = (day: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    );
  };

  // Generate days for the month view
  const generateMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Previous month's days to show
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = [];
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // Current month's days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month's days to fill the grid
    const totalDaysShown = 42; // 6 rows of 7 days
    const nextMonthDays = [];
    const daysToAdd =
      totalDaysShown - (prevMonthDays.length + currentMonthDays.length);
    for (let i = 1; i <= daysToAdd; i++) {
      nextMonthDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const days = generateMonthDays();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full bg-white">
      <div className="border-b border-[#dee2e6] p-4 flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#e9ecef] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#495057]"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </div>
          <h1 className="text-xl font-medium text-[#212529]">
            Schedule Manager
          </h1>
        </div>
      </div>

      <div className="p-4 border-b border-[#dee2e6] flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={viewMode === "Month" ? "default" : "outline"}
            onClick={() => setViewMode("Month")}
            className={
              viewMode === "Month"
                ? "bg-[#343a40] text-white"
                : "text-[#495057] border-[#ced4da]"
            }
          >
            Month
          </Button>
          <Button
            variant={viewMode === "Week" ? "default" : "outline"}
            onClick={() => setViewMode("Week")}
            className={
              viewMode === "Week"
                ? "bg-[#343a40] text-white"
                : "text-[#495057] border-[#ced4da]"
            }
          >
            Week
          </Button>
          <Button
            variant={viewMode === "Day" ? "default" : "outline"}
            onClick={() => setViewMode("Day")}
            className={
              viewMode === "Day"
                ? "bg-[#343a40] text-white"
                : "text-[#495057] border-[#ced4da]"
            }
          >
            Day
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="text-[#495057] border-[#ced4da]"
            onClick={() => {
              const prevMonth = new Date(currentMonth);
              prevMonth.setMonth(prevMonth.getMonth() - 1);
              setCurrentMonth(prevMonth);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <div className="flex items-center gap-2 min-w-[180px] justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span className="text-[#495057]">{formatMonth(currentMonth)}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <Button
            variant="outline"
            className="text-[#495057] border-[#ced4da]"
            onClick={() => {
              const nextMonth = new Date(currentMonth);
              nextMonth.setMonth(nextMonth.getMonth() + 1);
              setCurrentMonth(nextMonth);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 bg-white">
        {weekdays.map((day) => (
          <div
            key={day}
            className="p-4 text-center font-medium text-[#495057] border-b border-[#dee2e6]"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          const dayEvents = getDayEvents(day.date);
          const isToday =
            day.date.getDate() === new Date().getDate() &&
            day.date.getMonth() === new Date().getMonth() &&
            day.date.getFullYear() === new Date().getFullYear();

          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border border-[#dee2e6] ${day.isCurrentMonth ? "bg-white" : "bg-[#f8f9fa]"} ${isToday ? "bg-[#e9ecef]" : ""}`}
              onClick={() => {
                setCurrentDate(day.date);
                if (!day.isCurrentMonth) {
                  setCurrentMonth(day.date);
                }
              }}
            >
              <div className="text-right mb-1">
                <span
                  className={`inline-block w-6 h-6 rounded-full text-center leading-6 ${isToday ? "bg-[#343a40] text-white" : day.isCurrentMonth ? "text-[#212529]" : "text-[#adb5bd]"}`}
                >
                  {day.date.getDate()}
                </span>
              </div>
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-[#e9ecef] p-1 rounded text-xs cursor-pointer hover:bg-[#dee2e6] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openTaskDetails(event);
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#343a40]"></div>
                      <span className="font-medium">{event.title}</span>
                      {event.learningMethod && (
                        <span className="text-[#4c6ef5] text-[10px] ml-1">
                          {event.learningMethod.charAt(0).toUpperCase() +
                            event.learningMethod.slice(1)}
                        </span>
                      )}
                    </div>
                    <div className="text-[#6c757d] ml-3">{event.time}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={showTaskDetails} onOpenChange={setShowTaskDetails}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-xl text-[#212529]">
              {selectedEvent ? "Task Details" : "New Task"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTaskDetails(false)}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[#495057]">
                Title
              </Label>
              <Input
                id="title"
                value={selectedEvent ? selectedEvent.title : newEvent.title}
                onChange={(e) =>
                  selectedEvent
                    ? setSelectedEvent({
                        ...selectedEvent,
                        title: e.target.value,
                      })
                    : setNewEvent({
                        ...newEvent,
                        title: e.target.value,
                      })
                }
                placeholder="e.g., Team Meeting"
                className="border-[#ced4da] focus-visible:ring-[#495057]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-[#495057]">
                Date & Time
              </Label>
              <div className="flex gap-2">
                <Input
                  id="date"
                  type="date"
                  value={
                    selectedEvent
                      ? selectedEvent.date.toISOString().split("T")[0]
                      : newEvent.date.toISOString().split("T")[0]
                  }
                  onChange={(e) =>
                    selectedEvent
                      ? setSelectedEvent({
                          ...selectedEvent,
                          date: new Date(e.target.value),
                        })
                      : setNewEvent({
                          ...newEvent,
                          date: new Date(e.target.value),
                        })
                  }
                  className="border-[#ced4da] focus-visible:ring-[#495057]"
                />
                <Input
                  id="time"
                  type="time"
                  value={
                    selectedEvent
                      ? selectedEvent.time.split(" ")[0]
                      : newEvent.time
                  }
                  onChange={(e) => {
                    const timeValue = e.target.value;
                    const hours = parseInt(timeValue.split(":")[0]);
                    const minutes = timeValue.split(":")[1];
                    const ampm = hours >= 12 ? "PM" : "AM";
                    const formattedHours = hours % 12 || 12;
                    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

                    selectedEvent
                      ? setSelectedEvent({
                          ...selectedEvent,
                          time: formattedTime,
                        })
                      : setNewEvent({
                          ...newEvent,
                          time: formattedTime,
                        });
                  }}
                  className="border-[#ced4da] focus-visible:ring-[#495057]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-[#495057]">
                Status
              </Label>
              <Select
                value={selectedEvent ? selectedEvent.status : newEvent.status}
                onValueChange={(value) =>
                  selectedEvent
                    ? setSelectedEvent({
                        ...selectedEvent,
                        status: value as "Pending" | "Completed" | "Cancelled",
                      })
                    : setNewEvent({
                        ...newEvent,
                        status: value as "Pending" | "Completed" | "Cancelled",
                      })
                }
              >
                <SelectTrigger className="border-[#ced4da] focus:ring-[#495057]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningMethod" className="text-[#495057]">
                Learning Method
              </Label>
              <Select
                value={
                  selectedEvent?.learningMethod ||
                  newEvent.learningMethod ||
                  "flashcards"
                }
                onValueChange={(value) => {
                  const learningMethod = value as
                    | "flashcards"
                    | "quizzes"
                    | "game"
                    | "chat";
                  const defaultContent =
                    learningMethod === "flashcards"
                      ? {
                          title:
                            selectedEvent?.title ||
                            newEvent.title ||
                            "New Flashcard Set",
                          cards: [
                            { front: "Sample question", back: "Sample answer" },
                          ],
                        }
                      : learningMethod === "quizzes"
                        ? {
                            title:
                              selectedEvent?.title ||
                              newEvent.title ||
                              "New Quiz",
                            questions: [
                              {
                                question: "Sample question",
                                options: [
                                  "Option 1",
                                  "Option 2",
                                  "Option 3",
                                  "Option 4",
                                ],
                                answer: 0,
                              },
                            ],
                          }
                        : learningMethod === "game"
                          ? {
                              title:
                                selectedEvent?.title ||
                                newEvent.title ||
                                "New Game",
                              description: "Learn through gamification",
                              levels: [
                                { name: "Beginner", points: 0, challenges: 1 },
                              ],
                              challenges: [
                                {
                                  name: "Challenge 1",
                                  description: "Complete this challenge",
                                },
                              ],
                            }
                          : {
                              title:
                                selectedEvent?.title ||
                                newEvent.title ||
                                "New Chat Session",
                              description: "Learn through conversation",
                              topics: ["Sample topic"],
                              sampleQuestions: ["What is this topic about?"],
                            };

                  selectedEvent
                    ? setSelectedEvent({
                        ...selectedEvent,
                        learningMethod,
                        content: selectedEvent.content || defaultContent,
                      })
                    : setNewEvent({
                        ...newEvent,
                        learningMethod,
                        content: defaultContent,
                      });
                }}
              >
                <SelectTrigger className="border-[#ced4da] focus:ring-[#495057]">
                  <SelectValue placeholder="Select learning method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flashcards">Flashcards</SelectItem>
                  <SelectItem value="quizzes">Quizzes</SelectItem>
                  <SelectItem value="game">Game</SelectItem>
                  <SelectItem value="chat">Chat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-[#495057]">
                Description
              </Label>
              <Textarea
                id="description"
                value={
                  selectedEvent
                    ? selectedEvent.description || ""
                    : newEvent.description || ""
                }
                onChange={(e) =>
                  selectedEvent
                    ? setSelectedEvent({
                        ...selectedEvent,
                        description: e.target.value,
                      })
                    : setNewEvent({
                        ...newEvent,
                        description: e.target.value,
                      })
                }
                placeholder="Add details about this task..."
                className="min-h-[100px] border-[#ced4da] focus-visible:ring-[#495057]"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            {selectedEvent ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleDeleteEvent}
                  className="text-[#dc3545] border-[#ced4da] hover:bg-[#f8f9fa] hover:text-[#dc3545]"
                >
                  Delete
                </Button>
                {selectedEvent.learningMethod && selectedEvent.content && (
                  <Button
                    onClick={handleStartLearning}
                    className="bg-[#4c6ef5] hover:bg-[#364fc7] text-white"
                  >
                    Start Learning
                  </Button>
                )}
                <Button
                  onClick={handleUpdateEvent}
                  className="bg-[#343a40] hover:bg-[#212529] text-white"
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                onClick={handleAddEvent}
                className="bg-[#343a40] hover:bg-[#212529] text-white ml-auto"
              >
                Save
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-6 right-6">
        <Button
          onClick={openNewTaskDialog}
          className="rounded-full h-14 w-14 bg-[#343a40] hover:bg-[#212529] text-white shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ScheduleManager;
