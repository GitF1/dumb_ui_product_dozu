import React, { useState } from "react";
import { Search, Filter, Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ContentCard from "./ContentCard";

interface ContentLibraryProps {
  contentSets?: ContentSet[];
  onCreateContent?: () => void;
  onStudyContent?: (id: string) => void;
  onEditContent?: (id: string) => void;
  onDeleteContent?: (id: string) => void;
}

interface ContentSet {
  id: string;
  title: string;
  createdAt: string;
  contentType: "flashcards" | "notes" | "quiz";
  itemCount: number;
  lastStudied?: string;
}

const ContentLibrary: React.FC<ContentLibraryProps> = ({
  contentSets = [
    {
      id: "1",
      title: "Introduction to React",
      createdAt: "2023-05-15",
      contentType: "flashcards",
      itemCount: 24,
      lastStudied: "3 days ago",
    },
    {
      id: "2",
      title: "JavaScript Fundamentals",
      createdAt: "2023-04-20",
      contentType: "notes",
      itemCount: 15,
      lastStudied: "1 week ago",
    },
    {
      id: "3",
      title: "CSS Grid & Flexbox",
      createdAt: "2023-06-10",
      contentType: "flashcards",
      itemCount: 32,
      lastStudied: "2 days ago",
    },
    {
      id: "4",
      title: "TypeScript Basics",
      createdAt: "2023-05-28",
      contentType: "quiz",
      itemCount: 18,
    },
    {
      id: "5",
      title: "React Hooks Deep Dive",
      createdAt: "2023-06-22",
      contentType: "flashcards",
      itemCount: 42,
      lastStudied: "1 day ago",
    },
    {
      id: "6",
      title: "Web Accessibility",
      createdAt: "2023-07-05",
      contentType: "notes",
      itemCount: 27,
    },
    {
      id: "7",
      title: "Node.js Fundamentals",
      createdAt: "2023-06-18",
      contentType: "flashcards",
      itemCount: 36,
      lastStudied: "5 days ago",
    },
    {
      id: "8",
      title: "Git & GitHub Workflow",
      createdAt: "2023-05-30",
      contentType: "quiz",
      itemCount: 20,
      lastStudied: "2 weeks ago",
    },
  ],
  onCreateContent = () => {},
  onStudyContent = () => {},
  onEditContent = () => {},
  onDeleteContent = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter content based on search query, active tab, and sort
  const filteredContent = contentSets
    .filter((content) => {
      // Filter by search query
      if (
        searchQuery &&
        !content.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by content type tab
      if (activeTab === "all") return true;
      if (activeTab === "flashcards" && content.contentType === "flashcards")
        return true;
      if (activeTab === "notes" && content.contentType === "notes") return true;
      if (activeTab === "quizzes" && content.contentType === "quiz")
        return true;

      return false;
    })
    .sort((a, b) => {
      // Sort content
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      } else if (sortBy === "recently-studied") {
        // If lastStudied is undefined, put it at the end
        if (!a.lastStudied && !b.lastStudied) return 0;
        if (!a.lastStudied) return 1;
        if (!b.lastStudied) return -1;

        // Simple string comparison for demo purposes
        // In a real app, you'd parse these dates properly
        return a.lastStudied.localeCompare(b.lastStudied);
      }
      return 0;
    });

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Content Library
        </h2>
        <Button
          onClick={onCreateContent}
          className="bg-gray-800 hover:bg-gray-900"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Content
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="text-gray-500 h-4 w-4" />
            <span className="text-sm text-gray-600">Sort by:</span>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              <SelectItem value="recently-studied">Recently Studied</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="w-full md:w-auto bg-gray-200">
          <TabsTrigger value="all" className="flex-1 md:flex-none">
            All Content
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex-1 md:flex-none">
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex-1 md:flex-none">
            Notes
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex-1 md:flex-none">
            Quizzes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {renderContentGrid(filteredContent)}
        </TabsContent>
        <TabsContent value="flashcards" className="mt-6">
          {renderContentGrid(filteredContent)}
        </TabsContent>
        <TabsContent value="notes" className="mt-6">
          {renderContentGrid(filteredContent)}
        </TabsContent>
        <TabsContent value="quizzes" className="mt-6">
          {renderContentGrid(filteredContent)}
        </TabsContent>
      </Tabs>

      {filteredContent.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border border-gray-200">
          <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No content found
          </h3>
          <p className="text-gray-500 text-center mb-6">
            {searchQuery
              ? `No results found for "${searchQuery}". Try a different search term.`
              : "You don't have any content in this category yet."}
          </p>
          <Button
            onClick={onCreateContent}
            className="bg-gray-700 hover:bg-gray-800"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Content
          </Button>
        </div>
      )}
    </div>
  );

  function renderContentGrid(content: ContentSet[]) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {content.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            createdAt={item.createdAt}
            contentType={item.contentType}
            itemCount={item.itemCount}
            lastStudied={item.lastStudied}
            onStudy={onStudyContent}
            onEdit={onEditContent}
            onDelete={onDeleteContent}
          />
        ))}
      </div>
    );
  }
};

export default ContentLibrary;
