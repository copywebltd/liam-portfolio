export type VideoPhase = { step: string; detail: string };

export type VideoAd = {
  file: string; // basename in /public/video-ads (without extension)
  brand: string;
  tag: string; // the technique this one demonstrates
  note: string;
  phases: VideoPhase[]; // how it was built, phase by phase
};

/* Ordered for visual rhythm; no brand repeats back-to-back.
   Each ad leads with a different technique; same accuracy-first pipeline underneath. */
export const videoAds: VideoAd[] = [
  {
    file: "project-m",
    brand: "Project M",
    tag: "Reengineered ad",
    note: "A winning competitor ad, reverse-engineered onto Project M. Its structure and pacing kept, every claim rebuilt around the real product. It also opens on a genuine scroll-stopper: the spin-the-bottle gag.",
    phases: [
      { step: "Decode", detail: "Reverse-engineered a proven ad, its exact beats, cuts and pacing, before writing a word." },
      { step: "Rebuild the script", detail: "Rewrote it around Project M's real formula: 10 herbs, 600-year blend, reset then sustain." },
      { step: "Footage", detail: "AI scenes generated around the real product, held to one consistent creator throughout." },
      { step: "Voice + lip-sync", detail: "AI voiceover at a natural pace, with the closing shot lip-synced so her mouth matches the CTA." },
      { step: "Beat-aligned edit", detail: "Captions and the numbered demo cut to land exactly on the words she speaks." },
    ],
  },
  {
    file: "nitro-wood-claymation",
    brand: "Nitro Wood",
    tag: "AI claymation",
    note: "The range piece: a fully AI-animated claymation spot. A distinct handmade world, same product accuracy.",
    phases: [
      { step: "Real product", detail: "The real Nitro Wood label kept readable inside the clay world, no invented packaging." },
      { step: "Style frames", detail: "Claymation-model stills of the creator and product, in the stop-motion look." },
      { step: "Animation", detail: "Movement built by chaining a start frame to an end frame, for the handmade stop-motion feel." },
      { step: "Voice + sound", detail: "AI voiceover layered with clay-textured sound design." },
      { step: "Captions + edit", detail: "Captioned and cut to 9:16." },
    ],
  },
  {
    file: "modern-gents",
    brand: "Modern Gents",
    tag: "AI b-roll UGC",
    note: "The b-roll approach: AI creator scenes with the voiceover composed over the top, plus a real Trustpilot proof screen cut in. The edit and captions carry it, no lip-sync here.",
    phases: [
      { step: "Real product", detail: "Built on the real Elena Gold ring, true to the SKU." },
      { step: "Creator + scenes", detail: "One AI creator across three brand-world settings, identity locked shot to shot." },
      { step: "Real proof", detail: "A genuine Trustpilot screen-grab cut in, real social proof, not a claim." },
      { step: "Script + voice", detail: "Voiceover composed over the scenes at a natural pace, no lip-sync needed." },
      { step: "Captions + edit", detail: "Bold hook captions, native CTA, 9:16." },
    ],
  },
  {
    file: "tower28",
    brand: "Tower 28",
    tag: "AI lip-sync UGC",
    note: "A lip-sync demo: an AI creator whose mouth is synced to the AI voiceover, built around the brand's real SOS spray. Shown raw to demonstrate the lip-sync; a live campaign cut would front-load a scroll-stopper.",
    phases: [
      { step: "Real product", detail: "Anchored on Tower 28's actual SOS spray, so the bottle and label stay exact." },
      { step: "AI creator", detail: "A photoreal creator generated holding the real product, image to image." },
      { step: "Script + voice", detail: "Testimonial written from the product's real claims, then AI-voiced." },
      { step: "Lip-sync", detail: "Mouth synced to the voice with an AI avatar model, in two passes for full length, cut on a natural pause." },
      { step: "Captions + edit", detail: "Auto-synced single-line captions in the safe zone, 9:16." },
    ],
  },
  {
    file: "nitro-wood",
    brand: "Nitro Wood",
    tag: "AI lip-sync UGC",
    note: "The second lip-sync demo, on a male creator: a problem-led testimonial, AI-generated end to end, product true to the label. Shown raw to demonstrate the lip-sync; a live campaign cut would front-load a scroll-stopper.",
    phases: [
      { step: "Real product", detail: "Built around the real Nitro Wood tub, label intact." },
      { step: "AI creator", detail: "A photoreal creator generated holding the actual product." },
      { step: "Script + voice", detail: "A problem-led testimonial, claims kept safe, AI voiceover." },
      { step: "Lip-sync", detail: "AI avatar model syncs the mouth to the voice." },
      { step: "Captions + edit", detail: "Native single-line captions, cut to 9:16." },
    ],
  },
];
