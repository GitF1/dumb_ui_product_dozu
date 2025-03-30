import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Menu, Search, Settings, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/language/LanguageSelector";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onOpenSettings?: () => void;
  onOpenSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userName = "User",
  userAvatar = "",
  onOpenSettings = () => {},
  onOpenSearch = () => {},
}) => {
  const { t } = useTranslation();

  return (
    <header className="w-full h-16 px-4 md:px-6 flex items-center justify-between border-b border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          <span className="font-medium text-gray-800 dark:text-gray-200 hidden md:inline-block">
            {t("app.title")}
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSelector />
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSearch}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Search className="h-5 w-5" />
        </Button>

        <nav className="hidden md:flex items-center gap-1">
          <Button variant="ghost" asChild>
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {t("app.dashboard")}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link
              to="/library"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {t("app.library")}
            </Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-gray-200 text-gray-700">
              {userName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{t("app.dashboard")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/library" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{t("app.library")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onOpenSettings}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                <span>{t("app.settings")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{t("app.profile")}</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden md:flex">
              <Button variant="ghost" size="sm" className="gap-2">
                <span className="text-gray-600">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{t("app.profile")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onOpenSettings}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                <span>{t("app.settings")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
