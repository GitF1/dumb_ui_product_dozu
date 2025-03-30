import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Flashcard from "./Flashcard";
import StudyControls from "./StudyControls";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface FlashcardData {
  id: string;
  front: string;
  back: string;
  status?: "new" | "learning" | "known";
}

interface FlashcardViewProps {
  title?: string;
  flashcards?: FlashcardData[];
  onBack?: () => void;
  onComplete?: (results: { known: string[]; unknown: string[] }) => void;
}

const FlashcardView: React.FC<FlashcardViewProps> = ({
  title = "Introduction to React",
  flashcards = [
    {
      id: "1",
      front: "What is React?",
      back: "A JavaScript library for building user interfaces",
    },
    {
      id: "2",
      front: "What is JSX?",
      back: "A syntax extension for JavaScript that looks similar to HTML",
    },
    {
      id: "3",
      front: "What is a component?",
      back: "An independent, reusable piece of UI",
    },
    {
      id: "4",
      front: "What is state?",
      back: "An object that stores data that may change over time",
    },
    {
      id: "5",
      front: "What are props?",
      back: "Properties passed from parent to child components",
    },
  ],
  onBack = () => {},
  onComplete = () => {},
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [unknownCards, setUnknownCards] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(5);
  const [volume, setVolume] = useState(70);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [completionStats, setCompletionStats] = useState({
    known: 0,
    unknown: 0,
    total: 0,
  });

  const currentCard = flashcards[currentIndex];
  const progress = Math.round((currentIndex / flashcards.length) * 100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && autoPlayEnabled) {
      timer = setTimeout(() => {
        handleNext();
      }, autoPlaySpeed * 1000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, autoPlayEnabled, autoPlaySpeed, currentIndex]);

  useEffect(() => {
    if (currentIndex >= flashcards.length && flashcards.length > 0) {
      handleCompletion();
    }
  }, [currentIndex, flashcards.length]);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex === flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1); // This will trigger the completion dialog
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleMarkLearned = () => {
    if (currentCard) {
      setKnownCards([...knownCards, currentCard.id]);
      handleNext();
    }
  };

  const handleMarkReview = () => {
    if (currentCard) {
      setUnknownCards([...unknownCards, currentCard.id]);
      handleNext();
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setKnownCards([]);
    setUnknownCards([]);
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCompletion = () => {
    setShowCompletionDialog(true);
    setIsPlaying(false);
    setCompletionStats({
      known: knownCards.length,
      unknown: unknownCards.length,
      total: flashcards.length,
    });
    onComplete({ known: knownCards, unknown: unknownCards });
  };

  const handleCloseCompletionDialog = () => {
    setShowCompletionDialog(false);
    handleReset();
  };

  return (
    <div className="w-full h-full min-h-[700px] flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-medium text-gray-800">{title}</h1>
        </div>
        <div className="text-sm text-gray-500">
          {currentIndex < flashcards.length
            ? `${currentIndex + 1}/${flashcards.length} cards`
            : `${flashcards.length}/${flashcards.length} cards`}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row p-4 gap-6">
        {/* Flashcard area */}
        <div className="flex-1 min-h-[500px] flex items-center justify-center relative">
          {currentIndex < flashcards.length ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Flashcard
                  front={currentCard.front}
                  back={currentCard.back}
                  onMarkLearned={handleMarkLearned}
                  onMarkReview={handleMarkReview}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl border border-gray-200 shadow-sm">
              <Award className="h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-medium text-gray-800 mb-2">
                Session Complete!
              </h2>
              <p className="text-gray-600 mb-6">
                You've reviewed all the flashcards in this set.
              </p>
              <Button
                onClick={handleReset}
                className="bg-gray-700 hover:bg-gray-800"
              >
                Start Over
              </Button>
            </div>
          )}
        </div>

        {/* Controls area */}
        <div className="w-full md:w-[400px] flex flex-col gap-4">
          <StudyControls
            currentCard={currentIndex + 1}
            totalCards={flashcards.length}
            progress={progress}
            isPlaying={isPlaying}
            autoPlayEnabled={autoPlayEnabled}
            autoPlaySpeed={autoPlaySpeed}
            volume={volume}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onReset={handleReset}
            onKnown={handleMarkLearned}
            onUnknown={handleMarkReview}
            onTogglePlay={handleTogglePlay}
            onToggleAutoPlay={setAutoPlayEnabled}
            onChangeAutoPlaySpeed={setAutoPlaySpeed}
            onChangeVolume={setVolume}
            onOpenSettings={() => {}}
          />

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Study Progress
            </h3>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Known</span>
              <span className="text-xs font-medium text-gray-700">
                {knownCards.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
              <div
                className="bg-green-500 h-1.5 rounded-full"
                style={{
                  width: `${(knownCards.length / flashcards.length) * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">To Review</span>
              <span className="text-xs font-medium text-gray-700">
                {unknownCards.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
              <div
                className="bg-red-500 h-1.5 rounded-full"
                style={{
                  width: `${(unknownCards.length / flashcards.length) * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Remaining</span>
              <span className="text-xs font-medium text-gray-700">
                {flashcards.length - knownCards.length - unknownCards.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{
                  width: `${((flashcards.length - knownCards.length - unknownCards.length) / flashcards.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Dialog */}
      <Dialog
        open={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Study Session Complete</DialogTitle>
            <DialogDescription>
              You've completed your study session. Here's how you did:
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-center mb-4">
                <Award className="h-16 w-16 text-yellow-500" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {completionStats.known}
                  </div>
                  <div className="text-sm text-gray-600">Known</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {completionStats.unknown}
                  </div>
                  <div className="text-sm text-gray-600">To Review</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {completionStats.total}
                  </div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={onBack}>
                  Back to Library
                </Button>
                <Button
                  onClick={handleCloseCompletionDialog}
                  className="bg-gray-700 hover:bg-gray-800"
                >
                  Study Again
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlashcardView;
