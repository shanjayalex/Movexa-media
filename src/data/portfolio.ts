import { coconutIslandReels, realEstateReels, socialReels } from "./reels";

export type Project = {
  slug: string;
  no: string;
  title: string;
  tags: string[];
  client: string;
  industry: string;
  year: string;
  span: "wide" | "tall" | "std";
  tint: [string, string];
  /** YouTube Short IDs — real delivered content, shown on the case-study page. */
  reels?: string[];
  summary: string;
  challenge: string;
  idea: string;
  production: string;
  content: string;
  result: string;
};

export const projects: Project[] = [
  {
    slug: "coconut-island-uk",
    no: "01",
    title: "Coconut Island UK",
    tags: ["Restaurant", "Reels", "Social"],
    client: "Coconut Island UK",
    industry: "Restaurants",
    year: "2026",
    span: "wide",
    tint: ["#D728A9", "#6C3BFF"],
    reels: coconutIslandReels,
    summary:
      "Short-form social content for a Sri Lankan restaurant in the UK — dishes, atmosphere and personality, cut for the feed.",
    challenge:
      "A Sri Lankan restaurant building its name in the UK, with food and a room that deserved to be seen — and a feed that needed a steady stream of content people would actually stop for.",
    idea:
      "Shoot the food the way people crave it — close, warm, full of texture — and cut everything into a fast, punchy rhythm made for Reels and Shorts. Every dish becomes its own short.",
    production:
      "On-location shoots at the restaurant: signature dishes, prep detail, plating and the room. Then editing, sound design, captions and colour to a consistent look across the whole set.",
    content:
      "A running library of vertical Shorts / Reels — you can watch a selection from the set below — plus supporting stills and story cuts.",
    result:
      "An always-on content pipeline the restaurant can post consistently. Ask us for the latest reach, views and engagement figures from the campaign.",
  },
  {
    slug: "real-estate-tours",
    no: "02",
    title: "Real Estate Tours",
    tags: ["Real Estate", "Video", "Social"],
    client: "Property Client",
    industry: "Real Estate",
    year: "2026",
    span: "tall",
    tint: ["#3023AE", "#6C3BFF"],
    reels: realEstateReels,
    summary:
      "Cinematic walkthrough and listing videos that give properties the storytelling they deserve.",
    challenge:
      "Listings that looked like every other listing — wide phone shots and static photos that never made anyone feel the space.",
    idea:
      "Move through the property the way a buyer would — a considered path, natural light, smooth motion — and cut it tight for social.",
    production:
      "On-location filming with stabilised movement, careful framing of each room, and edits built for both listing pages and vertical feeds.",
    content:
      "A set of vertical property tours / listing videos — watch a selection below — plus supporting cutdowns.",
    result:
      "Listing content the agent can push across social and portals. Ask us for the latest view and enquiry figures.",
  },
  {
    slug: "brand-reels",
    no: "03",
    title: "Brand Social Reels",
    tags: ["Reels", "Editing", "Social"],
    client: "Multiple Brands",
    industry: "Product Brands",
    year: "2026",
    span: "wide",
    tint: ["#D728A9", "#9328D6"],
    reels: socialReels,
    summary:
      "Short-form edits built to stop the scroll — footage in, polished vertical content out.",
    challenge:
      "Brands with footage sitting unused and feeds that needed momentum — no time to turn raw clips into something postable.",
    idea:
      "A fast editing pipeline: trend-aware pacing, motion graphics, captions and sound design, delivered ready to post.",
    production:
      "Remote editing from supplied footage — cutting, colour, graphics and sound — with quick turnarounds.",
    content: "A rotating set of vertical reels — a few are below — sized for Reels, TikTok and Shorts.",
    result:
      "A repeatable way to keep posting without a shoot every week. Ask us for performance on a specific brand.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
