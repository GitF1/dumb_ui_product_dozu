import React from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      <Select value={i18n.language} onValueChange={changeLanguage}>
        <SelectTrigger className="w-[130px] h-8 text-sm border-gray-200 dark:border-gray-700">
          <SelectValue placeholder={t("languages.language")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t("languages.en")}</SelectItem>
          <SelectItem value="vi">{t("languages.vi")}</SelectItem>
          <SelectItem value="ja">{t("languages.ja")}</SelectItem>
          <SelectItem value="zh">{t("languages.zh")}</SelectItem>
          <SelectItem value="hi">{t("languages.hi")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
