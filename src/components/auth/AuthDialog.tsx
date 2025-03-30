import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn, UserPlus, Mail, Lock, ArrowRight } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string, name: string) => void;
  onContinueAsGuest: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  open,
  onOpenChange,
  onLogin,
  onRegister,
  onContinueAsGuest,
}) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(email, password, name);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white p-0 overflow-hidden">
        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full rounded-none h-14">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#343a40] h-14"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-white rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#343a40] h-14"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl text-[#212529]">
                Welcome back
              </DialogTitle>
              <DialogDescription className="text-[#6c757d]">
                Sign in to your account to continue learning
              </DialogDescription>
            </DialogHeader>

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
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-[#ced4da] focus-visible:ring-[#495057]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-[#495057]">
                    Password
                  </Label>
                  <Button
                    variant="link"
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
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-[#ced4da] focus-visible:ring-[#495057]"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
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
                className="w-full bg-[#343a40] hover:bg-[#212529] text-white"
              >
                Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

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
                  className="border-[#ced4da] text-[#495057] hover:bg-[#f8f9fa]"
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#ced4da] text-[#495057] hover:bg-[#f8f9fa]"
                >
                  Apple
                </Button>
              </div>

              <Button
                type="button"
                variant="link"
                onClick={onContinueAsGuest}
                className="w-full text-[#6c757d] hover:text-[#495057] mt-2"
              >
                Continue as guest
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl text-[#212529]">
                Create an account
              </DialogTitle>
              <DialogDescription className="text-[#6c757d]">
                Join our learning platform to track your progress
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-[#495057]">
                  Full Name
                </Label>
                <Input
                  id="register-name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-[#ced4da] focus-visible:ring-[#495057]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-[#495057]">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#adb5bd] h-4 w-4" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-[#ced4da] focus-visible:ring-[#495057]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-[#495057]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#adb5bd] h-4 w-4" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-[#ced4da] focus-visible:ring-[#495057]"
                    required
                  />
                </div>
                <p className="text-xs text-[#6c757d]">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) =>
                    setAgreeTerms(checked as boolean)
                  }
                  className="mt-1 text-[#343a40] border-[#ced4da]"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-[#6c757d] cursor-pointer"
                >
                  I agree to the{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-[#495057] hover:text-[#343a40]"
                  >
                    Terms of Service
                  </Button>{" "}
                  and{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-[#495057] hover:text-[#343a40]"
                  >
                    Privacy Policy
                  </Button>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={!agreeTerms}
                className="w-full bg-[#343a40] hover:bg-[#212529] text-white disabled:opacity-50"
              >
                Create account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#dee2e6]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-[#6c757d]">
                    Or sign up with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#ced4da] text-[#495057] hover:bg-[#f8f9fa]"
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#ced4da] text-[#495057] hover:bg-[#f8f9fa]"
                >
                  Apple
                </Button>
              </div>

              <Button
                type="button"
                variant="link"
                onClick={onContinueAsGuest}
                className="w-full text-[#6c757d] hover:text-[#495057] mt-2"
              >
                Continue as guest
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
