import { Suspense, lazy } from "react";
import { Hero } from "@/components/sections/Hero";
import { Showreel } from "@/components/sections/Showreel";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Work } from "@/components/sections/Work";
import { Approach } from "@/components/sections/Approach";
import { TwoWays } from "@/components/sections/TwoWays";
import { ContentEngine } from "@/components/sections/ContentEngine";
import { Packages } from "@/components/sections/Packages";
import { WhyMovexa } from "@/components/sections/WhyMovexa";
import { SocialWall } from "@/components/sections/SocialWall";
import { About } from "@/components/sections/About";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { Contact } from "@/components/sections/Contact";

// 3D stage is heavy (three + r3f) — load it after first paint.
const Stage = lazy(() =>
  import("@/components/three/Stage").then((m) => ({ default: m.Stage })),
);

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Stage />
      </Suspense>
      <main>
        <Hero />
        <Showreel />
        <Services />
        <Industries />
        <Work />
        <Approach />
        <TwoWays />
        <ContentEngine />
        <Packages />
        <WhyMovexa />
        <SocialWall />
        <About />
        <MarqueeBand />
        <Testimonials />
        <FinalCta />
        <Contact />
      </main>
    </>
  );
}
