interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return <h3 className="text-2xl font-extrabold tracking-tight text-[color:var(--navy)] sm:text-[2rem]">{title}</h3>;
}
