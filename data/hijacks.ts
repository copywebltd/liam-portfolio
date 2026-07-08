export type Hijack = {
  slug: string;
  brand: string;
  via: string; // the famous ad whose design grammar was borrowed
  tag: string; // format / framework
  note: string; // what carried over — the breakdown
};

/* Swipe -> brand: a real outside ad's design grammar, rebuilt on a brand's real product.
   Ordered for visual rhythm (dark / light / colour). */
export const hijacks: Hijack[] = [
  { slug: "tower28", brand: "Tower 28", via: "Apple, AirPods Max", tag: "Product pun",
    note: "Apple's “silence is golden · also available in silver” becomes a shade-variant pun on the real ShineOn lip jelly." },
  { slug: "modern-gents", brand: "Modern Gents", via: "Patagonia", tag: "Durability timeline",
    note: "Patagonia's decades-long “designed to last” — the same ring across Year 1 to Year 40. Generic markers, never fabricated dates." },
  { slug: "nitro-wood", brand: "Nitro Wood", via: "Mastercard", tag: "Venn",
    note: "Mastercard's overlap Venn — nitric oxide meets stamina, the brand pointing at the sweet spot." },
  { slug: "pique", brand: "Pique", via: "Whoop", tag: "Poetic cadence",
    note: "Whoop's repeated-line rhythm, rebuilt as a matcha ritual — the cadence carried, the surveillance tone didn't." },
  { slug: "create", brand: "Create", via: "Heinz", tag: "With / without",
    note: "Heinz's “good / great” demo — plain water beside the mix. Two words, no chrome: the restraint proof." },
  { slug: "project-m", brand: "Project M", via: "Porsche", tag: "Reframe",
    note: "Porsche's “staring is rude · unless it's a 911” reframes the menopause taboo on a clean field." },
  { slug: "sun-home", brand: "Sun Home", via: "S.Pellegrino", tag: "Moment of use",
    note: "Pellegrino's recovery scene — the sauna as the evening reset, product floated in as the answer." },
  { slug: "tactacam", brand: "Tactacam", via: "Saab", tag: "Heritage flex",
    note: "Saab's “Born From Jets” provenance — an engineering-pedigree flex over a rugged trail." },
  { slug: "inno-supps", brand: "Inno Supps", via: "Huel", tag: "Benefit callouts",
    note: "Huel's radial spec callouts — a supplement's clinical proof arrowed around the bottle." },
  { slug: "blk-and-bold", brand: "BLK & Bold", via: "Nike", tag: "Ritual list",
    note: "Nike's weekday strikethrough — a daily-cup ritual for a give-back coffee." },
  { slug: "clove", brand: "Clove", via: "Ridge", tag: "Wear proof",
    note: "Ridge's day-1 / day-365 wear proof — the nurse shoe, pristine then scuffed on a hospital floor." },
];
