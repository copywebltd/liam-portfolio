export type AdBreakdown = {
  slug: string;
  brand: string;
  tag: string; // format
  copy: string; // the thinking behind the words
  design: string; // the thinking behind the layout
};

/* Our generated static ads, each with the reasoning behind the copy and the design.
   Ordered for visual rhythm (dark / light / colour). */
export const adBreakdowns: AdBreakdown[] = [
  {
    slug: "tower28", brand: "Tower 28", tag: "Product pun",
    copy: "A shade-range brand's best joke is variety itself. A deadpan two-liner — one bold promise, one dry payoff that names the range — sells choice without a feature list. Most-aware beauty buyer; wit does the work a spec sheet can't.",
    design: "One product, centred in near-empty space. The restraint reads premium, and the negative space makes the single product the whole argument. Real packaging, accurate to the SKU.",
  },
  {
    slug: "modern-gents", brand: "Modern Gents", tag: "Durability timeline",
    copy: "Time as proof. Framing the ring as unchanged across the years turns a lifetime-warranty claim into something you can see. The year markers stay generic — a promise about durability, never a fabricated history.",
    design: "The repetition is the argument: the identical product at four points on a timeline, one payoff line beneath. The layout proves 'built to last' before the copy claims it.",
  },
  {
    slug: "nitro-wood", brand: "Nitro Wood", tag: "Mechanism map",
    copy: "A two-benefit product needs a two-benefit idea. The copy names each benefit once and lets the overlap do the selling — the mechanism argued in a glance instead of a paragraph.",
    design: "Two overlapping circles, the brand pointing at the sweet spot where they meet. Deliberately abstract and clean: the diagram is the hero, the product just signs it.",
  },
  {
    slug: "pique", brand: "Pique", tag: "Poetic cadence",
    copy: "A repeated-line cadence performs the ritual it's selling — each line is one beat of the daily habit, building to the payoff. Ceremonial matcha sells calm, so the rhythm becomes the calm.",
    design: "A dark, quiet field with the product held at centre. No chrome, no clutter — the stillness matches the promise, and the type rhythm walks the eye down the page.",
  },
  {
    slug: "create", brand: "Create", tag: "Single-variable demo",
    copy: "Two words carry the whole ad because the picture already made the argument. The purest 'show the transformation' — minimal copy, maximum clarity, nothing to argue with.",
    design: "The product is the only thing that changes between the two states. One continuous field, no divider, no caption bar — restraint that trusts the viewer to get it.",
  },
  {
    slug: "project-m", brand: "Project M", tag: "Reframe",
    copy: "A sophisticated, burned-before buyer resists hype. A short reframe — dismiss the taboo, then offer the way out — respects her intelligence and names the real block (silence), not the symptom.",
    design: "A clean field, product floated, near-total restraint. The white space signals seriousness; nothing on the canvas competes with the line.",
  },
  {
    slug: "sun-home", brand: "Sun Home", tag: "Moment of use",
    copy: "Premium wellness sells the feeling, not the spec sheet. The copy drops the reader into the moment of use — the exhale at the end of a hard day — so the product arrives as the answer to a need already felt.",
    design: "A real lifestyle scene at dusk with the product placed inside it. Warm light does the emotional work; the sauna is the resolution, not the subject.",
  },
  {
    slug: "tactacam", brand: "Tactacam", tag: "Capability",
    copy: "Hunter voice: blunt, capability-first. The line promises the one thing the buyer actually wants — to know what's out there — and the product delivers it. No fluff, all proof.",
    design: "The product sits in its real environment, a rugged trail at first light. Shooting it in the field instead of on white signals proven, in-use, dependable.",
  },
  {
    slug: "inno-supps", brand: "Inno Supps", tag: "Benefit callouts",
    copy: "A mechanism-and-proof play for a skeptical, product-aware buyer. Lead with the mechanism, back it with authority (board-certified doctors). The ad teaches instead of shouts, and teaching transfers trust.",
    design: "Spec callouts arrow around the real bottle like a diagram. The layout borrows the authority of a data sheet; the product stays centre because the claim is about the product.",
  },
  {
    slug: "blk-and-bold", brand: "BLK & Bold", tag: "Ritual list",
    copy: "A daily-ritual structure for a daily-consumed product. The weekday cadence mirrors how coffee is actually used, and a give-back purpose rides along without preaching.",
    design: "A dark field with the copy set straight on the photo — no cards, no chrome. The ritual reads as the product's own rhythm.",
  },
  {
    slug: "clove", brand: "Clove", tag: "Wear proof",
    copy: "Durability proof for a shoe worn on 12-hour shifts. Showing pristine-then-worn makes the claim self-evidently true — the buyer's own future, previewed.",
    design: "A two-frame time-lapse with day badges and the same shoe in both. The scuffed floor tells the year's story; the product is the only constant.",
  },
];
