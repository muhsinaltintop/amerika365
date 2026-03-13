import { Icon } from "../atoms/Icon";

interface LifeCardProps {
  icon: string;
  iconClassName: string;
  title: string;
  subtitle: string;
}

export function LifeCard({ icon, iconClassName, title, subtitle }: LifeCardProps) {
  return (
    <div className="flex flex-col items-center space-y-3 rounded-xl border border-slate-50 bg-white p-5 text-center shadow-sm transition-transform hover:-translate-y-1 sm:space-y-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 sm:h-16 sm:w-16 dark:bg-slate-800">
        <Icon name={icon} className={`text-3xl ${iconClassName}`} />
      </div>
      <div>
        <h5 className="font-bold text-[#1b1a6b] dark:text-white">{title}</h5>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}
