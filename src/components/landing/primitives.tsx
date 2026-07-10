import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  containerClassName?: string;
}

export function Section({ id, className, containerClassName, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <div className={cn("container mx-auto max-w-7xl px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-3 text-xs uppercase tracking-[0.28em]", className)}>
      <span className="h-px w-8 bg-gold" />
      <span className="text-gold font-medium">{children}</span>
    </div>
  );
}

interface HeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function Heading({ children, className, as: Tag = "h2" }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-display text-4xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return <div className={cn("gold-rule w-full", className)} />;
}
