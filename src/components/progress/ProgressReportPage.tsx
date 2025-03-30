import React from "react";
import Header from "@/components/layout/Header";
import ProgressReporting from "./ProgressReporting";

const ProgressReportPage: React.FC = () => {
  const handleExport = (
    format: string,
    period: string,
    startDate?: Date,
    endDate?: Date,
  ) => {
    console.log(`Exporting ${period} report in ${format} format`, {
      startDate,
      endDate,
    });
    // In a real app, this would trigger an API call to generate and download the report
  };

  const handleShare = () => {
    console.log("Sharing report");
    // In a real app, this would open a sharing dialog
  };

  const handlePrint = () => {
    console.log("Printing report");
    window.print();
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
        <ProgressReporting
          onExport={handleExport}
          onShare={handleShare}
          onPrint={handlePrint}
        />
      </div>
    </div>
  );
};

export default ProgressReportPage;
