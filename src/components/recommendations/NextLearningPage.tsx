import React from "react";
import Header from "@/components/layout/Header";
import NextLearningContent from "./NextLearningContent";

const NextLearningPage: React.FC = () => {
  const handleSelectContent = (contentId: string) => {
    console.log(`Selected content with ID: ${contentId}`);
    // In a real app, this would navigate to the content or start a learning session
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header
        userName="John Doe"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
        onOpenSettings={() => {}}
        onOpenSearch={() => {}}
      />

      <div className="flex-1 p-4 md:p-8">
        <NextLearningContent onSelectContent={handleSelectContent} />
      </div>
    </div>
  );
};

export default NextLearningPage;
