import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn, Mail, Lock, AlertCircle, Github, Chrome } from "lucide-react";
import { login, loginWithProvider } from "@/services/auth";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError(null);
      return true;
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await login({ email, password, rememberMe });

      if (response.success && response.user) {
        // Redirect based on user role
        switch (response.user.role) {
          case "student":
            navigate("/student-dashboard");
            break;
          case "instructor":
            navigate("/instructor-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          default:
            navigate("/home");
        }
      } else {
        setError(response.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "github" | "google") => {
    setIsLoading(true);
    setError(null);

    try {
      await loginWithProvider(provider);
      // The redirect will be handled by Supabase OAuth
    } catch (err) {
      setError(`Failed to login with ${provider}. Please try again.`);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#212529]">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center text-[#6c757d]">
            Sign in to your account to continue learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#495057]">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#adb5bd] h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  className={`pl-10 border-[#ced4da] focus-visible:ring-[#495057] ${emailError ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-[#495057]">
                  Password
                </Label>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => navigate("/forgot-password")}
                  className="p-0 h-auto text-xs text-[#6c757d] hover:text-[#495057]"
                >
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#adb5bd] h-4 w-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`pl-10 border-[#ced4da] focus-visible:ring-[#495057] ${passwordError ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="text-[#343a40] border-[#ced4da]"
              />
              <Label
                htmlFor="remember-me"
                className="text-sm text-[#6c757d] cursor-pointer"
              >
                Remember me for 30 days
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#343a40] hover:bg-[#212529] text-white"
            >
              {isLoading ? "Signing in..." : "Sign in"}
              {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#dee2e6]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-[#6c757d]">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => handleSocialLogin("google")}
              className="border-[#ced4da] text-[#495057] hover:bg-[#f8f9fa]"
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => handleSocialLogin("github")}
              className="border-[#ced4da] text-[#495057] hover:bg-[#f8f9fa]"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-[#6c757d]">
            Don't have an account?{" "}
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/register")}
              className="p-0 h-auto text-[#495057] hover:text-[#343a40]"
            >
              Sign up
            </Button>
          </div>
          <Button
            type="button"
            variant="link"
            onClick={() => navigate("/home")}
            className="w-full text-[#6c757d] hover:text-[#495057]"
          >
            Continue as guest
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
