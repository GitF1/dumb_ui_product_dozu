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
import { AlertCircle, UserPlus, Mail, Lock, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { register, UserRole } from "@/services/auth";

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Validation states
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  const validateName = (name: string) => {
    if (!name.trim()) {
      setNameError("Full name is required");
      return false;
    } else if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    } else {
      setNameError(null);
      return true;
    }
  };

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
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
      );
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    } else {
      setConfirmPasswordError(null);
      return true;
    }
  };

  const validateTerms = (agreed: boolean) => {
    if (!agreed) {
      setTermsError("You must agree to the Terms of Service");
      return false;
    } else {
      setTermsError(null);
      return true;
    }
  };

  const validateCaptcha = (verified: boolean) => {
    if (!verified) {
      setCaptchaError("Please verify that you are not a robot");
      return false;
    } else {
      setCaptchaError(null);
      return true;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
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
    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  const handleRoleChange = (value: UserRole) => {
    setRole(value);
  };

  const handleTermsChange = (checked: boolean) => {
    setAgreedToTerms(checked);
    validateTerms(checked);
  };

  // This would be replaced with actual reCAPTCHA implementation
  const handleCaptchaChange = () => {
    setCaptchaVerified(true);
    setCaptchaError(null);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all inputs
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isTermsValid = validateTerms(agreedToTerms);
    const isCaptchaValid = validateCaptcha(captchaVerified);

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !isTermsValid ||
      !isCaptchaValid
    ) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await register({
        name,
        email,
        password,
        role,
      });

      if (response.success) {
        // Redirect to login page with success message
        navigate("/login", {
          state: { message: "Registration successful! Please log in." },
        });
      } else {
        setError(response.error || "Registration failed. Please try again.");
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
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-[#6c757d]">
            Join our learning platform to start your educational journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#495057]">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#adb5bd] h-4 w-4" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={handleNameChange}
                  className={`pl-10 border-[#ced4da] focus-visible:ring-[#495057] ${nameError ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {nameError && (
                <p className="text-red-500 text-xs mt-1">{nameError}</p>
              )}
            </div>

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
              <Label htmlFor="password" className="text-[#495057]">
                Password
              </Label>
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

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-[#495057]">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#adb5bd] h-4 w-4" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`pl-10 border-[#ced4da] focus-visible:ring-[#495057] ${confirmPasswordError ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-xs mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-[#495057]">
                I am a
              </Label>
              <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger className="border-[#ced4da] focus:ring-[#495057]">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mock reCAPTCHA - would be replaced with actual reCAPTCHA component */}
            <div className="space-y-2">
              <div
                className="border border-[#ced4da] rounded p-3 flex items-center justify-center cursor-pointer"
                onClick={handleCaptchaChange}
              >
                <Checkbox
                  id="captcha"
                  checked={captchaVerified}
                  className="mr-2"
                />
                <Label
                  htmlFor="captcha"
                  className="cursor-pointer text-sm text-[#6c757d]"
                >
                  I'm not a robot
                </Label>
              </div>
              {captchaError && (
                <p className="text-red-500 text-xs mt-1">{captchaError}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={handleTermsChange}
                className="text-[#343a40] border-[#ced4da]"
              />
              <Label
                htmlFor="terms"
                className="text-sm text-[#6c757d] cursor-pointer"
              >
                I agree to the{" "}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => window.open("/terms", "_blank")}
                  className="p-0 h-auto text-[#495057] hover:text-[#343a40]"
                >
                  Terms of Service
                </Button>
              </Label>
            </div>
            {termsError && (
              <p className="text-red-500 text-xs mt-1">{termsError}</p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#343a40] hover:bg-[#212529] text-white"
            >
              {isLoading ? "Creating account..." : "Create account"}
              {!isLoading && <UserPlus className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm text-[#6c757d]">
            Already have an account?{" "}
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/login")}
              className="p-0 h-auto text-[#495057] hover:text-[#343a40]"
            >
              Sign in
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegistrationPage;
