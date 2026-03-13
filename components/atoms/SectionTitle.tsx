interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return <h3 className="text-xl font-extrabold text-[#1b1a6b] sm:text-2xl dark:text-white">{title}</h3>;
}
