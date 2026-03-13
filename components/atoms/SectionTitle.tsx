interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return <h3 className="text-2xl font-extrabold text-[#1b1a6b] dark:text-white">{title}</h3>;
}
