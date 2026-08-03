import meridian from "../assets/work-meridian.jpg";
import fold from "../assets/work-fold.jpg";
import nordwerk from "../assets/work-nordwerk.jpg";
import aperture from "../assets/work-aperture.jpg";

export type Concept = {
  index: string;
  title: string;
  discipline: string;
  year: string;
  intent: string;
  slugTone: string;
  shot?: string;
  sector?: string;
  outcome?: string;
};

export const concepts: Concept[] = [
  {
    index: "01",
    shot: meridian,
    sector: "Healthcare",
    outcome: "Patient journey rebuilt around comprehension, not navigation.",
    title: "Meridian Health",
    discipline: "Structure · Interface · Launch",
    year: "2025",
    intent:
      "A clinical network rebuilt around one question: what does a patient need to understand before they need to act?",
    slugTone: "oklch(0.93 0.012 240)",
  },
  {
    index: "02",
    shot: fold,
    sector: "Consumer design",
    outcome: "Archive treated as a publication rather than a catalogue.",
    title: "Fold Studio",
    discipline: "Positioning · Editorial system",
    year: "2025",
    intent:
      "A furniture maker's archive treated as a publication rather than a catalogue — slow scroll, long captions, no grid noise.",
    slugTone: "oklch(0.93 0.008 100)",
  },
  {
    index: "03",
    shot: nordwerk,
    sector: "Finance",
    outcome: "Institutional credibility carried by typography and pace.",
    title: "Nordwerk Capital",
    discipline: "Narrative · Interface · Motion",
    year: "2024",
    intent:
      "Institutional credibility without institutional coldness. Typography carries the trust; motion carries the pace.",
    slugTone: "oklch(0.92 0.014 250)",
  },
  {
    index: "04",
    shot: aperture,
    sector: "Deeptech / AI research",
    outcome: "Dense research sequenced into a four-minute launch story.",
    title: "Aperture Labs",
    discipline: "Product thinking · Launch journey",
    year: "2024",
    intent:
      "A research group with a dense body of work, sequenced into a launch that reads in four minutes instead of forty.",
    slugTone: "oklch(0.94 0.006 200)",
  },
  {
    index: "05",
    title: "Halden Atelier",
    discipline: "Identity extension · Web",
    year: "2023",
    intent:
      "Restraint as the entire brief. One accent, one arc, one type family, and a lot of deliberate empty space.",
    slugTone: "oklch(0.93 0.01 60)",
  },
];
