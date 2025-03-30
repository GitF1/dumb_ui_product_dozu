import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, ArrowLeft, Send } from "lucide-react";
import { resetPassword } from "@/services/auth";

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Validation state
  const [emailError, setEmailError] = useState<string | null>(null);

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await resetPassword(email);

      if (response.success) {
        setSuccess(
          "Password reset instructions have been sent to your email. Please check your inbox.",
        );
        setEmail(""); // Clear the form
      } else {
        setError(
          response.error || "Failed to send reset email. Please try again.",
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#212529]">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center text-[#6c757d]">
            Enter your email and we'll send you instructions to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#343a40] hover:bg-[#212529] text-white"
            >
              {isLoading ? "Sending..." : "Send reset instructions"}
              {!isLoading && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            type="button"
            variant="link"
            onClick={() => navigate("/login")}
            className="text-[#6c757d] hover:text-[#495057]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
