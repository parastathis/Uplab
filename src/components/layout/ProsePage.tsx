import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

/** Shared long-form article shell for legal/quality/jobs pages. */
export default function ProsePage({
  kicker,
  title,
  text,
  children,
}: {
  kicker: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <div className="mx-auto max-w-3xl px-[clamp(1.2rem,4vw,4.5rem)] pb-act">
        <Reveal>
          <p className="caption-tag">{kicker}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="display-md mt-hair text-ink">{title}</h1>
        </Reveal>
        {text && (
          <Stagger className="mt-verse space-y-line" gap={0.04}>
            {text
              .split("\n")
              .filter(Boolean)
              .map((p, i) => (
                <StaggerItem key={i}>
                  <p className="text-[0.95rem] leading-[1.85] text-ink/80">{p}</p>
                </StaggerItem>
              ))}
          </Stagger>
        )}
        {children && <Reveal delay={0.1}>{children}</Reveal>}
      </div>
    </div>
  );
}
