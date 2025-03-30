import { Routes, Route, useRoutes, Navigate } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import React from "react";
import routes from "tempo-routes";
import Home from "./components/home";
import WelcomePage from "./components/welcome/WelcomePage";
import OnboardingPage from "./components/onboarding/OnboardingPage";
import ProgressReportPage from "./components/progress/ProgressReportPage";
import NextLearningPage from "./components/recommendations/NextLearningPage";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { getCurrentUser, AuthUser } from "./services/auth";
import "./i18n";

// Lazy load components
const FlashcardPage = lazy(
  () => import("./components/flashcards/FlashcardPage"),
);
const QuizPage = lazy(() => import("./components/quizzes/QuizPage"));
const GamePage = lazy(() => import("./components/gamification/GamePage"));
const ChatPage = lazy(() => import("./components/chatting/ChatPage"));

// Protected route component
const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: JSX.Element;
  requiredRole?: string;
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case "student":
        return <Navigate to="/student-dashboard" replace />;
      case "instructor":
        return <Navigate to="/instructor-dashboard" replace />;
      case "admin":
        return <Navigate to="/admin-dashboard" replace />;
      default:
        return <Navigate to="/admin-dashboard" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="learning-platform-theme">
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/progress" element={<ProgressReportPage />} />
          <Route path="/recommendations" element={<NextLearningPage />} />

          {/* Method-specific learning pages */}
          <Route path="/flashcards" element={<FlashcardPage />} />
          <Route path="/quizzes" element={<QuizPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/chat" element={<ChatPage />} />

          {/* Protected routes based on user roles */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute requiredRole="student">
                <div>Student Dashboard (To be implemented)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor-dashboard"
            element={
              <ProtectedRoute requiredRole="instructor">
                <div>Instructor Dashboard (To be implemented)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <div>Admin Dashboard (To be implemented)</div>
              </ProtectedRoute>
            }
          />

          {/* Add this before any catchall route */}
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
