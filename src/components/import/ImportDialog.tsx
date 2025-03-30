import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FileText,
  Upload,
  File,
  Mic,
  Video,
  X,
  Check,
  ArrowRight,
  Sparkles,
  Lightbulb,
  BookOpen,
} from "lucide-react";

interface ImportDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onComplete?: (data: any) => void;
}

const ImportDialog: React.FC<ImportDialogProps> = ({
  open = true,
  onOpenChange = () => {},
  onComplete = () => {},
}) => {
  const [step, setStep] = useState<number>(1);
  const [importMethod, setImportMethod] = useState<string>("file");
  const [files, setFiles] = useState<File[]>([]);
  const [textContent, setTextContent] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [suggestedMethods, setSuggestedMethods] = useState<string[]>([
    "flashcards",
    "notes",
    "quiz",
  ]);
  const [selectedMethod, setSelectedMethod] = useState<string>("flashcards");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(droppedFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
  };

  const handleContinue = () => {
    if (step === 1) {
      // Simulate processing
      setIsProcessing(true);
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            setStep(2);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Complete the import process
      onComplete({
        method: selectedMethod,
        content: importMethod === "text" ? textContent : files,
      });
      onOpenChange(false);
      // Reset state for next time
      setStep(1);
      setFiles([]);
      setTextContent("");
      setProcessingProgress(0);
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      if (importMethod === "file") return files.length > 0;
      if (importMethod === "text") return textContent.trim().length > 0;
      return false;
    }
    return true;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Tabs
              defaultValue="file"
              value={importMethod}
              onValueChange={setImportMethod}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="file" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Files</span>
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Text</span>
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  <span>Media</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="file" className="mt-4">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-700 font-medium mb-1">
                    Drag & drop files here
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    or click to browse your files
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports PDF, Word, and text files
                  </p>

                  {files.length > 0 && (
                    <div className="mt-4 text-left">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Selected files:
                      </h4>
                      <ul className="space-y-1">
                        {files.map((file, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 flex items-center"
                          >
                            <File className="h-4 w-4 mr-2" />
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="text" className="mt-4">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Paste or type your content here..."
                    className="min-h-[200px] text-gray-700"
                    value={textContent}
                    onChange={handleTextChange}
                  />
                  <p className="text-xs text-gray-400">
                    Tip: You can paste text from any source, including websites,
                    documents, or notes.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="media" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() =>
                      document.getElementById("audio-upload")?.click()
                    }
                  >
                    <input
                      id="audio-upload"
                      type="file"
                      className="hidden"
                      accept="audio/*"
                    />
                    <Mic className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-gray-700 font-medium text-sm mb-1">
                      Upload Audio
                    </h3>
                    <p className="text-xs text-gray-400">MP3, WAV, M4A files</p>
                  </div>

                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() =>
                      document.getElementById("video-upload")?.click()
                    }
                  >
                    <input
                      id="video-upload"
                      type="file"
                      className="hidden"
                      accept="video/*"
                    />
                    <Video className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-gray-700 font-medium text-sm mb-1">
                      Upload Video
                    </h3>
                    <p className="text-xs text-gray-400">MP4, MOV, AVI files</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4">
                  Note: Audio and video content will be processed to extract
                  learning material.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    AI Content Analysis
                  </h3>
                  <p className="text-sm text-gray-600">
                    We've analyzed your content and identified the following
                    learning methods that would work best:
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {suggestedMethods.map((method) => (
                <div
                  key={method}
                  className={`p-4 rounded-lg border ${selectedMethod === method ? "border-gray-800 bg-gray-50" : "border-gray-200"} cursor-pointer transition-all`}
                  onClick={() => setSelectedMethod(method)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {method === "flashcards" && (
                        <BookOpen className="h-5 w-5 text-gray-700" />
                      )}
                      {method === "notes" && (
                        <FileText className="h-5 w-5 text-gray-700" />
                      )}
                      {method === "quiz" && (
                        <Lightbulb className="h-5 w-5 text-gray-700" />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-800 capitalize">
                          {method}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {method === "flashcards" &&
                            "Perfect for memorization and quick review"}
                          {method === "notes" &&
                            "Ideal for detailed study and reference"}
                          {method === "quiz" &&
                            "Great for testing your knowledge"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border ${selectedMethod === method ? "bg-gray-800 border-gray-800" : "border-gray-300"} flex items-center justify-center`}
                    >
                      {selectedMethod === method && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-3">
                Content Preview
              </h3>
              <div className="bg-white border border-gray-200 rounded-md p-3 max-h-[200px] overflow-y-auto">
                {importMethod === "text" ? (
                  <p className="text-sm text-gray-700">{textContent}</p>
                ) : (
                  <ul className="space-y-1">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 flex items-center"
                      >
                        <File className="h-4 w-4 mr-2" />
                        {file.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-800">
                Learning Method:{" "}
                <span className="capitalize">{selectedMethod}</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Input
                    placeholder="Enter a title for your content"
                    defaultValue={
                      files.length > 0
                        ? files[0].name.split(".")[0]
                        : "New Learning Content"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <Input placeholder="Optional category" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  placeholder="Add a description (optional)"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            {step === 1 && "Import Learning Content"}
            {step === 2 && "Suggested Learning Methods"}
            {step === 3 && "Customize Learning Content"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {step === 1 &&
              "Upload or paste content to create learning materials."}
            {step === 2 && "Choose the best learning method for your content."}
            {step === 3 && "Customize your learning content before finalizing."}
          </DialogDescription>
        </DialogHeader>

        {isProcessing ? (
          <div className="py-10 space-y-4">
            <div className="text-center">
              <Sparkles className="h-10 w-10 text-gray-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                Processing your content
              </h3>
              <p className="text-sm text-gray-500">
                Our AI is analyzing your content to suggest the best learning
                methods.
              </p>
            </div>
            <Progress value={processingProgress} className="w-full h-2" />
            <p className="text-xs text-center text-gray-400">
              This may take a moment depending on the size of your content.
            </p>
          </div>
        ) : (
          renderStepContent()
        )}

        <DialogFooter className="flex justify-between items-center sm:justify-between">
          {step > 1 && !isProcessing && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="text-gray-600"
            >
              Back
            </Button>
          )}
          <div className="flex-1 sm:flex-none"></div>
          <Button
            onClick={handleContinue}
            disabled={!isStepValid() || isProcessing}
            className={`${isStepValid() ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-300"} gap-2`}
          >
            {step === 3 ? "Create Learning Content" : "Continue"}
            {step !== 3 && <ArrowRight className="h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;
