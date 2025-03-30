import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Star, ArrowRight } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  tags: string[];
  imageUrl?: string;
}

interface CourseRecommendationsProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onViewAllCourses: () => void;
}

const CourseRecommendations: React.FC<CourseRecommendationsProps> = ({
  courses = [
    {
      id: "1",
      title: "Introduction to Web Development",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript.",
      level: "Beginner" as const,
      duration: "4 weeks",
      rating: 4.7,
      tags: ["HTML", "CSS", "JavaScript"],
      imageUrl:
        "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80",
    },
    {
      id: "2",
      title: "UX/UI Design Principles",
      description:
        "Master the core principles of user experience and interface design.",
      level: "Intermediate" as const,
      duration: "6 weeks",
      rating: 4.9,
      tags: ["Design", "UX", "UI"],
      imageUrl:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    },
    {
      id: "3",
      title: "Data Science Fundamentals",
      description:
        "Introduction to data analysis, visualization, and basic statistics.",
      level: "Beginner" as const,
      duration: "8 weeks",
      rating: 4.6,
      tags: ["Python", "Statistics", "Data"],
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
  ],
  onSelectCourse,
  onViewAllCourses,
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-[#e9ecef] text-[#495057]";
      case "Intermediate":
        return "bg-[#e9ecef] text-[#495057]";
      case "Advanced":
        return "bg-[#e9ecef] text-[#495057]";
      default:
        return "bg-[#e9ecef] text-[#495057]";
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-white rounded-xl border border-[#dee2e6] shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#212529]">
            Recommended for You
          </h2>
          <p className="text-[#6c757d]">
            Based on your learning preferences and goals
          </p>
        </div>
        <Button
          onClick={onViewAllCourses}
          variant="outline"
          className="text-[#495057] border-[#ced4da] hover:bg-[#f8f9fa]"
        >
          View all courses
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden border border-[#dee2e6] hover:shadow-md transition-shadow duration-200 bg-white"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: course.imageUrl
                  ? `url(${course.imageUrl})`
                  : "linear-gradient(to right, #e9ecef, #dee2e6)",
              }}
            />
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant="secondary"
                  className={`${getLevelColor(course.level)} font-normal`}
                >
                  {course.level}
                </Badge>
                <div className="flex items-center text-[#6c757d]">
                  <Star className="h-4 w-4 text-[#ffc107] fill-[#ffc107] mr-1" />
                  <span className="text-sm">{course.rating}</span>
                </div>
              </div>
              <h3 className="text-lg font-medium text-[#212529] mb-2">
                {course.title}
              </h3>
              <p className="text-[#6c757d] text-sm mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center text-[#6c757d] text-sm mb-3">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-[#f8f9fa] text-[#6c757d] border-[#dee2e6] font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-5 pt-0">
              <Button
                onClick={() => onSelectCourse(course.id)}
                className="w-full bg-[#343a40] hover:bg-[#212529] text-white"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Start Learning
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseRecommendations;
