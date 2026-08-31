export type Industry = {
  key: string;
  name: string;
  line: string;
  note: string;
  tint: [string, string];
};

export const industries: Industry[] = [
  {
    key: "restaurants",
    name: "Restaurants",
    line: "Make people taste it before they visit.",
    note: "Beautiful food videos and photography.",
    tint: ["#D728A9", "#6C3BFF"],
  },
  {
    key: "fashion",
    name: "Fashion",
    line: "Turn every collection into a campaign.",
    note: "Fashion editorial content.",
    tint: ["#6C3BFF", "#071B55"],
  },
  {
    key: "hospitality",
    name: "Hospitality",
    line: "Sell the feeling before the destination.",
    note: "Hotels, villas, resorts and tourism.",
    tint: ["#3023AE", "#D728A9"],
  },
  {
    key: "beauty",
    name: "Beauty",
    line: "Visuals designed to get noticed.",
    note: "Salon, skincare and beauty.",
    tint: ["#9328D6", "#6C3BFF"],
  },
  {
    key: "fitness",
    name: "Fitness",
    line: "Energy captured in motion.",
    note: "Gym and fitness content.",
    tint: ["#3023AE", "#6C3BFF"],
  },
  {
    key: "real-estate",
    name: "Real Estate",
    line: "Spaces deserve cinematic storytelling.",
    note: "Property videos and photography.",
    tint: ["#071B55", "#9328D6"],
  },
  {
    key: "product-brands",
    name: "Product Brands",
    line: "Make products impossible to ignore.",
    note: "Commercial product content.",
    tint: ["#D728A9", "#3023AE"],
  },
  {
    key: "corporate",
    name: "Corporate",
    line: "Professional doesn't have to look boring.",
    note: "Company films and branded storytelling.",
    tint: ["#6C3BFF", "#D728A9"],
  },
];
