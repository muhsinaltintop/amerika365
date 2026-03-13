interface NewsMetaProps {
  category: string;
  time: string;
}

export function NewsMeta({ category, time }: NewsMetaProps) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
      <span>{category}</span>
      <span>•</span>
      <span>{time}</span>
    </div>
  );
}
