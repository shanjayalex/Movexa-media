export type Service = {
  no: string;
  title: string;
  blurb: string;
  includes: string[];
  visual: "camera" | "orbit" | "timeline" | "shutter" | "grid" | "target";
};

export const services: Service[] = [
  {
    no: "01",
    title: "Content Production",
    blurb:
      "Professional commercial video production created specifically for modern digital platforms.",
    includes: [
      "Creative direction",
      "Script development",
      "Professional camera shoots",
      "Lighting",
      "Cinematic videography",
      "Product videos",
      "Business promotional films",
    ],
    visual: "camera",
  },
  {
    no: "02",
    title: "Social Media Marketing",
    blurb:
      "Content designed to build attention, engagement and business growth.",
    includes: [
      "Instagram",
      "Facebook",
      "TikTok",
      "Content planning",
      "Reels strategy",
      "Social media management",
      "Campaign concepts",
      "Performance analysis",
    ],
    visual: "orbit",
  },
  {
    no: "03",
    title: "Reels & Video Editing",
    blurb:
      "Turn ordinary footage into content people stop scrolling for.",
    includes: [
      "Short-form editing",
      "Cinematic editing",
      "Motion graphics",
      "Captions",
      "Sound design",
      "Color grading",
      "Trend-driven edits",
    ],
    visual: "timeline",
  },
  {
    no: "04",
    title: "Photography",
    blurb: "High-end photography designed for digital brands.",
    includes: ["Food", "Products", "Fashion", "Hospitality", "Corporate", "Lifestyle"],
    visual: "shutter",
  },
  {
    no: "05",
    title: "Design & Motion",
    blurb: "Create visually consistent brands across social media.",
    includes: [
      "Social posts",
      "Posters",
      "Ad creatives",
      "Carousels",
      "Motion posters",
      "Campaign graphics",
      "Digital designs",
    ],
    visual: "grid",
  },
  {
    no: "06",
    title: "Paid Ad Creatives",
    blurb:
      "Creative content designed specifically for marketing campaigns.",
    includes: [
      "Meta Ads",
      "Social video ads",
      "Campaign creatives",
      "Promotional concepts",
      "Conversion-focused content",
    ],
    visual: "target",
  },
];
