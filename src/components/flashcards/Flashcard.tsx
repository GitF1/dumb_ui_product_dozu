import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface FlashcardProps {
  front?: string;
  back?: string;
  onMarkLearned?: () => void;
  onMarkReview?: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({
  front = "What is the capital of France?",
  back = "Paris",
  onMarkLearned = () => {},
  onMarkReview = () => {},
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [exitX, setExitX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleFlip = () => {
    if (!isDragging) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false);
    if (info.offset.x > 100) {
      setExitX(1000);
      onMarkLearned();
    } else if (info.offset.x < -100) {
      setExitX(-1000);
      onMarkReview();
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
      <motion.div
        className="relative w-full max-w-[600px] h-[400px] cursor-pointer"
        onClick={handleFlip}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={{
          x: exitX,
        }}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 w-full h-full">
          <motion.div
            className={cn(
              "absolute inset-0 w-full h-full rounded-xl p-8 flex flex-col justify-center items-center",
              "bg-white border border-gray-200 shadow-lg",
            )}
            initial={false}
            animate={{
              rotateY: isFlipped ? 180 : 0,
              zIndex: isFlipped ? 0 : 1,
            }}
            transition={{ duration: 0.6, type: "spring" }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-2xl font-medium text-gray-800 text-center">
              {front}
            </div>
            <div className="absolute bottom-4 text-sm text-gray-400">
              Tap to flip
            </div>
          </motion.div>

          <motion.div
            className={cn(
              "absolute inset-0 w-full h-full rounded-xl p-8 flex flex-col justify-center items-center",
              "bg-gray-50 border border-gray-200 shadow-lg",
            )}
            initial={{ rotateY: 180 }}
            animate={{
              rotateY: isFlipped ? 0 : -180,
              zIndex: isFlipped ? 1 : 0,
            }}
            transition={{ duration: 0.6, type: "spring" }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-2xl font-medium text-gray-800 text-center">
              {back}
            </div>
            <div className="absolute bottom-4 text-sm text-gray-400">
              Tap to flip
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 flex gap-8">
        <motion.button
          className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 border border-red-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setExitX(-1000);
            onMarkReview();
          }}
        >
          <X size={20} />
        </motion.button>
        <motion.button
          className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500 border border-green-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setExitX(1000);
            onMarkLearned();
          }}
        >
          <Check size={20} />
        </motion.button>
      </div>

      <div className="absolute top-4 left-4 right-4 flex justify-between text-sm text-gray-500">
        <div>Swipe left to review again</div>
        <div>Swipe right if learned</div>
      </div>
    </div>
  );
};

export default Flashcard;
