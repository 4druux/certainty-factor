import { BadgeCheck, BadgeInfo, BadgePercent } from "lucide-react";

export const getConfidenceProgressColor = (persentase) => {
  if (persentase >= 80) return "bg-green-500";
  if (persentase >= 60) return "bg-indigo-500";
  if (persentase >= 40) return "bg-amber-500";
  return "bg-slate-500";
};

export const getConfidenceTextColor = (persentase) => {
  if (persentase >= 80) return "text-green-800 dark:text-green-400";
  if (persentase >= 60) return "text-indigo-800 dark:text-indigo-400";
  if (persentase >= 40) return "text-amber-800 dark:text-amber-400";
  return "text-slate-800 dark:text-slate-400";
};

export const getConfidenceBg = (persentase) => {
  if (persentase >= 80) return "bg-green-100 dark:bg-green-500/10 border border-green-500 dark:border-green-400/30";
  if (persentase >= 60) return "bg-indigo-100 dark:bg-indigo-500/10 border-indigo-500 dark:border-indigo-400/30";
  if (persentase >= 40) return "bg-amber-100 dark:bg-amber-500/10 border border-amber-500 dark:border-amber-400/30";
  return "bg-slate-100 dark:bg-slate-500/10 border border-slate-500 dark:border-slate-400/30";
};

export const getConfidenceIcon = (persentase) => {
  if (persentase >= 80) {
    return <BadgeCheck className="w-5 h-5 md:w-6 md:h-6 text-green-500" />;
  }
  if (persentase >= 60) {
    return <BadgeInfo className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />;
  }
  if (persentase >= 40) {
    return <BadgePercent className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />;
  }
  return <BadgePercent className="w-5 h-5 md:w-6 md:h-6 text-slate-500" />;
};
