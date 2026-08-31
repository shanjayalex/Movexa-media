/**
 * Real MOVEXA MEDIA client work — short-form vertical content (YouTube Shorts),
 * produced and/or edited by MOVEXA. Grouped by campaign.
 */

/** Coconut Island UK — Sri Lankan restaurant, United Kingdom. */
export const coconutIslandReels: string[] = [
  "3r3OaZSj6as",
  "k8ilFbrGgGQ",
  "vpLkwCO7nB8",
  "WGssflAn0lQ",
  "FE2bpUpP7DA",
  "wvOW2gVi9sk",
  "h5GfM_Lb5PQ",
  "2gGUviz2cE8",
  "DbFmiYm_jmk",
  "73WZp_m_NhU",
];

/** Real-estate content — property tours & listing videos. */
export const realEstateReels: string[] = [
  "sgs_itHW3Uk",
  "6cXawULEjlE",
  "0bwnBqJb3kA",
  "9X9I8dwNPVE",
  "QiDPNHljNAk",
];

/** General social-media reels across brands. */
export const socialReels: string[] = [
  "qj3VsmlQFlI",
  "1ZUUz93QlVs",
  "gOilug_Zn8I",
  "GZD6bOdMoQI",
];

/** MOVEXA MEDIA website showreel — landscape 16:9. */
export const showreelId = "fo4noqySmJY";

/** Everything, for the social wall / showreel. */
export const allReels: string[] = [
  ...coconutIslandReels,
  ...realEstateReels,
  ...socialReels,
];

/** Vertical (original-aspect) Short thumbnail — falls back to hqdefault via onThumbError. */
export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/oardefault.jpg`;
export const ytWatch = (id: string) => `https://youtube.com/shorts/${id}`;
export const ytEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

/** Landscape 16:9 thumbnail (maxres → falls back to hqdefault via onThumbError). */
export const ytThumbLandscape = (id: string) =>
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

/** Muted, looping, controls-free embed — for an auto-playing background loop. */
export const ytLoopEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}` +
  `&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3`;

/** Full embed with sound + controls — for the "watch with sound" modal. */
export const ytFullEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

/**
 * <img onError> handler: retry a YouTube Short's 4:3 thumbnail if the vertical
 * one 404s; for any other broken image, hide it so the tinted panel shows.
 */
export function onThumbError(e: React.SyntheticEvent<HTMLImageElement>) {
  const el = e.currentTarget;
  if (el.dataset.fb) {
    el.style.display = "none";
    return;
  }
  el.dataset.fb = "1";
  if (el.src.includes("/oardefault.jpg")) {
    el.src = el.src.replace("/oardefault.jpg", "/hqdefault.jpg");
  } else {
    el.style.display = "none";
  }
}
