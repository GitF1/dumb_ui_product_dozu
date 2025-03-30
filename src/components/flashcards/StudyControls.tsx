import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Settings,
  Volume2,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  Play,
} from "lucide-react";

interface StudyControlsProps {
  currentCard?: number;
  totalCards?: number;
  progress?: number;
  isPlaying?: boolean;
  autoPlayEnabled?: boolean;
  autoPlaySpeed?: number;
  volume?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onReset?: () => void;
  onKnown?: () => void;
  onUnknown?: () => void;
  onTogglePlay?: () => void;
  onToggleAutoPlay?: (enabled: boolean) => void;
  onChangeAutoPlaySpeed?: (speed: number) => void;
  onChangeVolume?: (volume: number) => void;
  onOpenSettings?: () => void;
}

const StudyControls: React.FC<StudyControlsProps> = ({
  currentCard = 1,
  totalCards = 10,
  progress = 10,
  isPlaying = false,
  autoPlayEnabled = false,
  autoPlaySpeed = 5,
  volume = 70,
  onNext = () => {},
  onPrevious = () => {},
  onReset = () => {},
  onKnown = () => {},
  onUnknown = () => {},
  onTogglePlay = () => {},
  onToggleAutoPlay = () => {},
  onChangeAutoPlaySpeed = () => {},
  onChangeVolume = () => {},
  onOpenSettings = () => {},
}) => {
  return (
    <div className="w-full bg-gray-100 p-6 rounded-lg shadow-sm">
      {/* Progress section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Card {currentCard} of {totalCards}
          </span>
          <span className="text-sm text-gray-600">{progress}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main controls */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onPrevious}
                className="h-10 w-10 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous card</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onUnknown}
                className="h-12 w-12 rounded-full bg-red-50 hover:bg-red-100 border-red-200"
              >
                <XCircle className="h-6 w-6 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as unknown</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onTogglePlay}
                className="h-14 w-14 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                {isPlaying ? (
                  <Pause className="h-7 w-7" />
                ) : (
                  <Play className="h-7 w-7" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? "Pause" : "Play"} study session</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onKnown}
                className="h-12 w-12 rounded-full bg-green-50 hover:bg-green-100 border-green-200"
              >
                <CheckCircle className="h-6 w-6 text-green-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as known</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onNext}
                className="h-10 w-10 rounded-full"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next card</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Additional controls */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <Label htmlFor="auto-play" className="text-sm text-gray-600">
                Auto-play
              </Label>
            </div>
            <Switch
              id="auto-play"
              checked={autoPlayEnabled}
              onCheckedChange={onToggleAutoPlay}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <Label htmlFor="speed-slider" className="text-sm text-gray-600">
                Speed: {autoPlaySpeed}s
              </Label>
            </div>
            <Slider
              id="speed-slider"
              disabled={!autoPlayEnabled}
              min={1}
              max={10}
              step={1}
              value={[autoPlaySpeed]}
              onValueChange={(value) => onChangeAutoPlaySpeed(value[0])}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="h-8 px-2 text-gray-600"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    <span className="text-xs">Reset Progress</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset study session</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onOpenSettings}
                    className="h-8 w-8"
                  >
                    <Settings className="h-4 w-4 text-gray-600" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Study settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-gray-500" />
              <Label htmlFor="volume-slider" className="text-sm text-gray-600">
                Volume
              </Label>
            </div>
            <Slider
              id="volume-slider"
              min={0}
              max={100}
              step={1}
              value={[volume]}
              onValueChange={(value) => onChangeVolume(value[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyControls;
