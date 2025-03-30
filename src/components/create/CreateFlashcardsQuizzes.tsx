import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Mic, Upload, Plus, Save, FileText, X } from "lucide-react";

interface FlashcardItem {
  front: string;
  back: string;
}

interface QuizItem {
  question: string;
  options: string[];
  correctAnswer: number;
}

const CreateFlashcardsQuizzes: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"manual" | "import" | "voice">(
    "manual",
  );
  const [contentType, setContentType] = useState<"flashcards" | "quizzes">(
    "flashcards",
  );
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>([
    { front: "", back: "" },
  ]);
  const [quizItems, setQuizItems] = useState<QuizItem[]>([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate voice recording
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate transcription result
      setTimeout(() => {
        setTranscribedText("Front: What is the capital of France? Back: Paris");
      }, 1500);
    } else {
      setIsRecording(true);
      setTranscribedText("");
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop()?.toLowerCase();

      if (fileExt !== "csv" && fileExt !== "txt") {
        setError("Please upload a CSV or TXT file");
        return;
      }

      setUploadedFile(file);
      simulateFileProcessing();
    }
  };

  // Simulate file processing
  const simulateFileProcessing = () => {
    setIsProcessing(true);
    setProcessingProgress(0);

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Add new flashcard
  const addFlashcard = () => {
    setFlashcards([...flashcards, { front: "", back: "" }]);
  };

  // Update flashcard
  const updateFlashcard = (
    index: number,
    field: "front" | "back",
    value: string,
  ) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  // Remove flashcard
  const removeFlashcard = (index: number) => {
    if (flashcards.length > 1) {
      const updatedFlashcards = [...flashcards];
      updatedFlashcards.splice(index, 1);
      setFlashcards(updatedFlashcards);
    }
  };

  // Add new quiz item
  const addQuizItem = () => {
    setQuizItems([
      ...quizItems,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  // Update quiz item
  const updateQuizItem = (
    index: number,
    field: "question" | "correctAnswer",
    value: string | number,
  ) => {
    const updatedQuizItems = [...quizItems];
    updatedQuizItems[index][field] = value;
    setQuizItems(updatedQuizItems);
  };

  // Update quiz option
  const updateQuizOption = (
    itemIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    const updatedQuizItems = [...quizItems];
    updatedQuizItems[itemIndex].options[optionIndex] = value;
    setQuizItems(updatedQuizItems);
  };

  // Remove quiz item
  const removeQuizItem = (index: number) => {
    if (quizItems.length > 1) {
      const updatedQuizItems = [...quizItems];
      updatedQuizItems.splice(index, 1);
      setQuizItems(updatedQuizItems);
    }
  };

  // Process transcribed text
  const processTranscribedText = () => {
    if (!transcribedText) return;

    // Simple parsing for "Front: X, Back: Y" format
    const frontMatch = transcribedText.match(/Front:\s*([^,]+),?\s*Back:/i);
    const backMatch = transcribedText.match(/Back:\s*(.+)$/i);

    if (frontMatch && backMatch) {
      const front = frontMatch[1].trim();
      const back = backMatch[1].trim();

      setFlashcards([...flashcards, { front, back }]);
      setTranscribedText("");
    } else {
      setError(
        "Could not parse the voice input. Please use the format 'Front: [question], Back: [answer]'",
      );
    }
  };

  // Save content
  const saveContent = () => {
    // Simulate saving
    setIsProcessing(true);
    setProcessingProgress(0);

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);

          // Navigate back to home after saving
          navigate("/");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            className="mr-4 p-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Create {contentType === "flashcards" ? "Flashcards" : "Quizzes"}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-1">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Content Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={contentType}
                  onValueChange={(value) =>
                    setContentType(value as "flashcards" | "quizzes")
                  }
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flashcards" id="flashcards" />
                    <Label htmlFor="flashcards">Flashcards</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quizzes" id="quizzes" />
                    <Label htmlFor="quizzes">Quizzes</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Creation Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={(value) =>
                    setActiveTab(value as "manual" | "import" | "voice")
                  }
                >
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="manual">Manual</TabsTrigger>
                    <TabsTrigger value="import">Import</TabsTrigger>
                    <TabsTrigger value="voice">Voice</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl">
                  {activeTab === "manual"
                    ? "Manual Creation"
                    : activeTab === "import"
                      ? "Import from File"
                      : "Voice Input"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm flex items-start">
                    <span>{error}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto p-0 h-5 w-5 text-red-500 hover:bg-red-100"
                      onClick={() => setError(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {activeTab === "manual" && (
                  <div className="space-y-6">
                    {contentType === "flashcards" ? (
                      // Flashcards manual creation
                      <div className="space-y-4">
                        {flashcards.map((flashcard, index) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg relative"
                          >
                            <div className="absolute top-2 right-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                                onClick={() => removeFlashcard(index)}
                                disabled={flashcards.length <= 1}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`front-${index}`}>
                                  Front (Question)
                                </Label>
                                <Textarea
                                  id={`front-${index}`}
                                  placeholder="Enter question or term"
                                  value={flashcard.front}
                                  onChange={(e) =>
                                    updateFlashcard(
                                      index,
                                      "front",
                                      e.target.value,
                                    )
                                  }
                                  className="min-h-[100px]"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`back-${index}`}>
                                  Back (Answer)
                                </Label>
                                <Textarea
                                  id={`back-${index}`}
                                  placeholder="Enter answer or definition"
                                  value={flashcard.back}
                                  onChange={(e) =>
                                    updateFlashcard(
                                      index,
                                      "back",
                                      e.target.value,
                                    )
                                  }
                                  className="min-h-[100px]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={addFlashcard}
                          className="w-full border-dashed border-2"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Another Flashcard
                        </Button>
                      </div>
                    ) : (
                      // Quizzes manual creation
                      <div className="space-y-4">
                        {quizItems.map((quizItem, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="p-4 border border-gray-200 rounded-lg relative"
                          >
                            <div className="absolute top-2 right-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                                onClick={() => removeQuizItem(itemIndex)}
                                disabled={quizItems.length <= 1}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor={`question-${itemIndex}`}>
                                  Question
                                </Label>
                                <Textarea
                                  id={`question-${itemIndex}`}
                                  placeholder="Enter quiz question"
                                  value={quizItem.question}
                                  onChange={(e) =>
                                    updateQuizItem(
                                      itemIndex,
                                      "question",
                                      e.target.value,
                                    )
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div className="space-y-3">
                                <Label>Options</Label>
                                {quizItem.options.map((option, optionIndex) => (
                                  <div
                                    key={optionIndex}
                                    className="flex items-center gap-2"
                                  >
                                    <RadioGroupItem
                                      value={optionIndex.toString()}
                                      id={`option-${itemIndex}-${optionIndex}`}
                                      checked={
                                        quizItem.correctAnswer === optionIndex
                                      }
                                      onClick={() =>
                                        updateQuizItem(
                                          itemIndex,
                                          "correctAnswer",
                                          optionIndex,
                                        )
                                      }
                                    />
                                    <Input
                                      placeholder={`Option ${optionIndex + 1}`}
                                      value={option}
                                      onChange={(e) =>
                                        updateQuizOption(
                                          itemIndex,
                                          optionIndex,
                                          e.target.value,
                                        )
                                      }
                                      className="flex-1"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={addQuizItem}
                          className="w-full border-dashed border-2"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Another Question
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "import" && (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-1">
                        Drag and drop your file here
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        or click to browse from your computer
                      </p>
                      <Button
                        variant="outline"
                        className="bg-white hover:bg-gray-100"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isProcessing}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Browse Files
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".csv,.txt"
                        onChange={handleFileUpload}
                        disabled={isProcessing}
                      />
                      <p className="mt-4 text-xs text-gray-500">
                        {contentType === "flashcards" ? (
                          <>
                            Supported formats: CSV (Front, Back), TXT
                            (Front||Back)
                          </>
                        ) : (
                          <>
                            Supported formats: CSV (Question, Option1, Option2,
                            Option3, Option4, CorrectAnswer)
                          </>
                        )}
                      </p>
                    </div>

                    {uploadedFile && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700">
                              {uploadedFile.name}
                            </span>
                          </div>
                          {!isProcessing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                              onClick={() => setUploadedFile(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        {isProcessing && (
                          <div className="mt-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Processing file...</span>
                              <span>{processingProgress}%</span>
                            </div>
                            <Progress
                              value={processingProgress}
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "voice" && (
                  <div className="space-y-6">
                    <div className="p-6 border border-gray-200 rounded-lg text-center">
                      <Button
                        variant={isRecording ? "destructive" : "default"}
                        size="lg"
                        className={`rounded-full h-16 w-16 ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-800"}`}
                        onClick={toggleRecording}
                      >
                        <Mic className="h-6 w-6" />
                      </Button>
                      <p className="mt-4 text-sm text-gray-600">
                        {isRecording
                          ? "Recording... Click to stop"
                          : "Click to start recording"}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        Speak clearly using the format: "Front: [question],
                        Back: [answer]"
                      </p>
                    </div>

                    {transcribedText && (
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-700 mb-2">
                            Transcribed Text:
                          </h4>
                          <p className="text-gray-600">{transcribedText}</p>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setTranscribedText("")}
                          >
                            Clear
                          </Button>
                          <Button onClick={processTranscribedText}>
                            Add to Flashcards
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={saveContent}
            disabled={isProcessing}
            className="bg-gray-700 hover:bg-gray-800"
          >
            <Save className="mr-2 h-4 w-4" />
            Save {contentType === "flashcards" ? "Flashcards" : "Quizzes"}
            {isProcessing && ` (${processingProgress}%)`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateFlashcardsQuizzes;
