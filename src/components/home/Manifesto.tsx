import { vision } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import GradientScrollText from "@/components/ui/GradientScrollText";

/**
 * Quiet full-width statement band. The real vision line reads itself in,
 * word by word, as the section scrolls through — a breath between the
 * count-up trust strip and the three pillars.
 */
export default function Manifesto() {
  return (
    <section aria-label="Το όραμά μας" className="bg-paper py-act">
      <div className="mx-auto max-w-4xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <Reveal>
          <p className="caption-tag">Το όραμά μας</p>
        </Reveal>
        <GradientScrollText
          text={vision}
          className="mt-stanza font-display text-[clamp(1.7rem,4vw,3.1rem)] leading-[1.25] tracking-[-0.005em]"
        />
      </div>
    </section>
  );
}
