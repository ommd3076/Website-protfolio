import { useRef } from "react";
import { MagneticLink } from "./CTA";
import { useLoadSequence } from "./motion";
import { Arc } from "./Arc";

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  useLoadSequence(scope);

  return (
    <section
      ref={scope}
      className="relative overflow-hidden px-6 pb-24 pt-24 md:px-12 md:pb-30 md:pt-30"
    >
      <Arc
        className="hero-load pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[1240px] -translate-x-1/2 text-accent-soft/70"
        data-load="draw"
      />

      <div className="relative mx-auto max-w-[1120px] text-center">
        <p data-load="eyebrow" className="hero-load eyebrow" style={{ letterSpacing: "0.2em" }}>
          AI-native product, launch & experience company
        </p>

        <h1 className="mt-8 text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.04em] md:text-[5.4rem]">
          <span className="block">
            <span data-load="line" className="hero-load block">
              We build the systems
            </span>
          </span>
          <span className="block">
            <span data-load="line" className="hero-load block text-muted-foreground">
              companies launch
            </span>
          </span>
          <span className="block">
            <span data-load="line" className="hero-load block">
              themselves with.
            </span>
          </span>
        </h1>

        <p
          data-load="fade"
          className="hero-load mx-auto mt-9 max-w-[38ch] text-[0.95rem] leading-[1.65] text-muted-foreground"
        >
          Carenetics designs websites, digital systems and launch structure with AI in the workflow
          rather than on the poster — today for software and services, next for deeptech, healthcare
          and medtech.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <span data-load="cta" className="hero-load">
            <MagneticLink to="/work">See the work</MagneticLink>
          </span>
        </div>
      </div>
    </section>
  );
}
