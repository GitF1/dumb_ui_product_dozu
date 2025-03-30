import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
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
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  BookOpen,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ScheduleEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  description?: string;
  courseId?: string;
  completed: boolean;
  learningMethod?: "flashcards" | "quizzes" | "game" | "chat";
  content?: any;
}

interface LearningScheduleProps {
  events?: ScheduleEvent[];
  onAddEvent?: (event: Omit<ScheduleEvent, "id">) => void;
  onUpdateEvent?: (event: ScheduleEvent) => void;
  onDeleteEvent?: (eventId: string) => void;
}

const LearningSchedule: React.FC<LearningScheduleProps> = ({
  events = [
    {
      id: "1",
      title: "Web Development Basics",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime: "09:00",
      endTime: "10:30",
      description: "Introduction to HTML and CSS fundamentals",
      courseId: "1",
      completed: false,
      learningMethod: "flashcards",
      content: {
        title: "Web Development Basics",
        cards: [
          {
            front: "What is HTML?",
            back: "HyperText Markup Language, the standard language for creating web pages",
          },
          {
            front: "What is CSS?",
            back: "Cascading Style Sheets, used for styling web pages",
          },
          {
            front: "What is the DOM?",
            back: "Document Object Model, a programming interface for web documents",
          },
        ],
      },
    },
    {
      id: "2",
      title: "JavaScript Practice",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      startTime: "14:00",
      endTime: "15:30",
      description: "Working through JavaScript exercises",
      courseId: "1",
      completed: false,
      learningMethod: "quizzes",
      content: {
        title: "JavaScript Practice",
        questions: [
          {
            question: "What is a closure in JavaScript?",
            options: [
              "A function that has access to variables in its outer scope",
              "A way to close a browser window",
              "A method to end a loop",
              "A type of JavaScript error",
            ],
            answer: 0,
          },
          {
            question: "Which of these is not a JavaScript data type?",
            options: ["String", "Boolean", "Float", "Symbol"],
            answer: 2,
          },
        ],
      },
    },
    {
      id: "3",
      title: "UX Design Principles",
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      startTime: "10:00",
      endTime: "11:30",
      description: "Learning about user experience design principles",
      courseId: "2",
      completed: true,
      learningMethod: "game",
      content: {
        title: "UX Design Principles",
        description:
          "Learn UX design principles through interactive challenges",
        levels: [
          { name: "Beginner", points: 0, challenges: 2 },
          { name: "Intermediate", points: 100, challenges: 3 },
          { name: "Advanced", points: 250, challenges: 2 },
        ],
        challenges: [
          {
            name: "Color Theory",
            description: "Complete the color wheel challenge",
          },
          {
            name: "Typography",
            description: "Match the right fonts to the right contexts",
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const [showEventDetailsDialog, setShowEventDetailsDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(
    null,
  );
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    startTime: "09:00",
    endTime: "10:00",
    description: "",
    courseId: "",
    completed: false,
    learningMethod: "flashcards" as "flashcards" | "quizzes" | "game" | "chat",
    content: null,
  });

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
  };

  const handleAddEvent = () => {
    onAddEvent({
      title: newEvent.title,
      date: newEvent.date,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      description: newEvent.description,
      courseId: newEvent.courseId || undefined,
      completed: false,
      learningMethod: newEvent.learningMethod,
      content: newEvent.content,
    });
    setShowAddEventDialog(false);
    resetNewEvent();
  };

  const handleEventClick = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    setShowEventDetailsDialog(true);
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
      setShowEventDetailsDialog(false);
    }
  };

  const handleToggleComplete = (event: ScheduleEvent) => {
    onUpdateEvent({ ...event, completed: !event.completed });
    setShowEventDetailsDialog(false);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      onDeleteEvent(selectedEvent.id);
      setShowEventDetailsDialog(false);
    }
  };

  const resetNewEvent = () => {
    setNewEvent({
      title: "",
      date: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      description: "",
      courseId: "",
      completed: false,
      learningMethod: "flashcards",
      content: null,
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

  const currentDayEvents = date ? getDayEvents(date) : [];

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-white rounded-xl border border-[#dee2e6] shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#212529]">
            Learning Schedule
          </h2>
          <p className="text-[#6c757d]">
            Plan and track your learning sessions
          </p>
        </div>
        <Button
          onClick={() => setShowAddEventDialog(true)}
          className="bg-[#343a40] hover:bg-[#212529] text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Study Session
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-[#dee2e6] bg-white col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#343a40]">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                <span>Calendar</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border border-[#dee2e6]"
            />
          </CardContent>
        </Card>

        <Card className="border border-[#dee2e6] bg-white col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#343a40]">
              {date ? (
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  <span>
                    {date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ) : (
                "Select a date"
              )}
            </CardTitle>
            <CardDescription className="text-[#6c757d]">
              {currentDayEvents.length > 0
                ? `${currentDayEvents.length} study ${currentDayEvents.length === 1 ? "session" : "sessions"} scheduled`
                : "No study sessions scheduled"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentDayEvents.length > 0 ? (
              <div className="space-y-4">
                {currentDayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border ${event.completed ? "bg-[#f8f9fa] border-[#ced4da]" : "bg-white border-[#dee2e6]"} cursor-pointer hover:shadow-sm transition-shadow`}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-[#212529] flex items-center">
                          {event.completed && (
                            <CheckCircle2 className="h-4 w-4 text-[#198754] mr-2" />
                          )}
                          {!event.completed && new Date() > event.date && (
                            <AlertCircle className="h-4 w-4 text-[#dc3545] mr-2" />
                          )}
                          {event.title}
                        </h3>
                        <div className="flex items-center text-[#6c757d] text-sm mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {event.learningMethod && (
                          <Badge
                            variant="outline"
                            className="bg-[#f0f4ff] text-[#3b82f6] font-normal"
                          >
                            {event.learningMethod.charAt(0).toUpperCase() +
                              event.learningMethod.slice(1)}
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className={`${event.completed ? "bg-[#e9ecef] text-[#198754]" : "bg-[#f8f9fa] text-[#6c757d]"} font-normal`}
                        >
                          {event.completed ? "Completed" : "Scheduled"}
                        </Badge>
                      </div>
                    </div>
                    {event.description && (
                      <p className="text-[#6c757d] text-sm mt-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-[#dee2e6] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#495057] mb-2">
                  No study sessions scheduled
                </h3>
                <p className="text-[#6c757d] mb-4">
                  Plan your learning by adding study sessions to your calendar
                </p>
                <Button
                  onClick={() => setShowAddEventDialog(true)}
                  variant="outline"
                  className="text-[#495057] border-[#ced4da] hover:bg-[#f8f9fa]"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Study Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-[#212529]">
              Add Study Session
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[#495057]">
                Session Title
              </Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="e.g., JavaScript Basics"
                className="border-[#ced4da] focus-visible:ring-[#495057]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-[#495057]">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      date: new Date(e.target.value),
                    })
                  }
                  className="border-[#ced4da] focus-visible:ring-[#495057]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course" className="text-[#495057]">
                  Related Course (Optional)
                </Label>
                <Select
                  value={newEvent.courseId}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, courseId: value })
                  }
                >
                  <SelectTrigger className="border-[#ced4da] focus:ring-[#495057]">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Web Development</SelectItem>
                    <SelectItem value="2">UX/UI Design</SelectItem>
                    <SelectItem value="3">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-[#495057]">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, startTime: e.target.value })
                  }
                  className="border-[#ced4da] focus-visible:ring-[#495057]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-[#495057]">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, endTime: e.target.value })
                  }
                  className="border-[#ced4da] focus-visible:ring-[#495057]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningMethod" className="text-[#495057]">
                Learning Method
              </Label>
              <Select
                value={newEvent.learningMethod}
                onValueChange={(value) =>
                  setNewEvent({
                    ...newEvent,
                    learningMethod: value as
                      | "flashcards"
                      | "quizzes"
                      | "game"
                      | "chat",
                    // Set a default content based on the learning method
                    content:
                      value === "flashcards"
                        ? {
                            title: newEvent.title || "New Flashcard Set",
                            cards: [
                              {
                                front: "Sample question",
                                back: "Sample answer",
                              },
                            ],
                          }
                        : value === "quizzes"
                          ? {
                              title: newEvent.title || "New Quiz",
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
                          : value === "game"
                            ? {
                                title: newEvent.title || "New Game",
                                description: "Learn through gamification",
                                levels: [
                                  {
                                    name: "Beginner",
                                    points: 0,
                                    challenges: 1,
                                  },
                                ],
                                challenges: [
                                  {
                                    name: "Challenge 1",
                                    description: "Complete this challenge",
                                  },
                                ],
                              }
                            : {
                                title: newEvent.title || "New Chat Session",
                                description: "Learn through conversation",
                                topics: ["Sample topic"],
                                sampleQuestions: ["What is this topic about?"],
                              },
                  })
                }
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
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                placeholder="What will you study in this session?"
                className="min-h-[80px] border-[#ced4da] focus-visible:ring-[#495057]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddEventDialog(false);
                resetNewEvent();
              }}
              className="text-[#495057] border-[#ced4da] hover:bg-[#f8f9fa]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddEvent}
              disabled={!newEvent.title}
              className="bg-[#343a40] hover:bg-[#212529] text-white"
            >
              Add to Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Details Dialog */}
      <Dialog
        open={showEventDetailsDialog}
        onOpenChange={setShowEventDetailsDialog}
      >
        {selectedEvent && (
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-[#212529] flex items-center">
                {selectedEvent.completed && (
                  <CheckCircle2 className="h-5 w-5 text-[#198754] mr-2" />
                )}
                {selectedEvent.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center text-[#6c757d]">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>
                  {selectedEvent.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center text-[#6c757d]">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {selectedEvent.startTime} - {selectedEvent.endTime}
                </span>
              </div>

              {selectedEvent.description && (
                <div className="bg-[#f8f9fa] p-4 rounded-lg border border-[#dee2e6]">
                  <p className="text-[#495057]">{selectedEvent.description}</p>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <Badge
                  variant="outline"
                  className={`${selectedEvent.completed ? "bg-[#e9ecef] text-[#198754]" : "bg-[#f8f9fa] text-[#6c757d]"} font-normal`}
                >
                  {selectedEvent.completed ? "Completed" : "Scheduled"}
                </Badge>

                {selectedEvent.learningMethod && (
                  <Badge
                    variant="outline"
                    className="bg-[#f0f4ff] text-[#3b82f6] font-normal"
                  >
                    {selectedEvent.learningMethod.charAt(0).toUpperCase() +
                      selectedEvent.learningMethod.slice(1)}
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="learningMethod" className="text-[#495057]">
                  Learning Method
                </Label>
                <Select
                  value={selectedEvent.learningMethod || "flashcards"}
                  onValueChange={(value) => {
                    setSelectedEvent({
                      ...selectedEvent,
                      learningMethod: value as
                        | "flashcards"
                        | "quizzes"
                        | "game"
                        | "chat",
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
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => handleToggleComplete(selectedEvent)}
                className="text-[#495057] border-[#ced4da] hover:bg-[#f8f9fa] w-full sm:w-auto"
              >
                {selectedEvent.completed
                  ? "Mark as Incomplete"
                  : "Mark as Complete"}
              </Button>
              <Button
                variant="outline"
                onClick={handleDeleteEvent}
                className="text-[#dc3545] border-[#ced4da] hover:bg-[#f8f9fa] hover:text-[#dc3545] w-full sm:w-auto"
              >
                Delete
              </Button>
              {selectedEvent.learningMethod && selectedEvent.content && (
                <Button
                  onClick={handleStartLearning}
                  className="bg-[#343a40] hover:bg-[#212529] text-white w-full sm:w-auto"
                >
                  Start Learning
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default LearningSchedule;
