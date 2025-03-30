import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileQuestion,
  Gamepad2,
  MessageSquare,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export interface LearningMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

interface LearningSuggestionProps {
  contentTitle?: string;
  suggestedMethods: LearningMethod[];
  onMethodSelect: (method: LearningMethod) => void;
  selectedMethodId?: string;
  onContinue?: () => void;
}

const LearningSuggestion: React.FC<LearningSuggestionProps> = ({
  contentTitle = "Your Content",
  suggestedMethods = [],
  onMethodSelect,
  selectedMethodId,
  onContinue,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-[1200px] mx-auto bg-gray-50">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-gray-700" />
          {t("learning.suggestedMethods")}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {t("learning.suggestedMethodsDescription", { contentTitle })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestedMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${selectedMethodId === method.id ? "border-gray-800 bg-gray-100" : "border-gray-200 hover:border-gray-400"}`}
              onClick={() => onMethodSelect(method)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full border border-gray-200 mt-1">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 text-lg mb-1 flex items-center gap-2">
                      {method.name}
                      {selectedMethodId === method.id && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </h3>
                    <p className="text-gray-600 mb-3">{method.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {method.benefits.map((benefit, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-white text-gray-700 font-normal"
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedMethodId === method.id ? "bg-gray-800 border-gray-800" : "border-gray-300"}`}
                >
                  {selectedMethodId === method.id && (
                    <CheckCircle className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={onContinue}
            disabled={!selectedMethodId}
            className={`${selectedMethodId ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-300"} text-white px-6 flex items-center gap-2`}
          >
            {t("common.continue")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningSuggestion;
