import { Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { SmoothScroll } from "@/lib/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";
import { PageTransition } from "@/components/PageTransition";
import { ReelPlayer } from "@/components/ui/ReelPlayer";
import Home from "@/pages/Home";

const CaseStudy = lazy(() => import("@/pages/CaseStudy"));

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <Loader onDone={() => setReady(true)} />}

      <Cursor />
      <SmoothScroll>
        <Navbar />
        <PageTransition>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work/:slug" element={<CaseStudy />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </PageTransition>
        <Footer />
      </SmoothScroll>

      <ReelPlayer />

      {/* fixed page-wide grain */}
      <div className="grain-layer pointer-events-none fixed inset-0 z-[400] opacity-[0.05] mix-blend-overlay" />
    </>
  );
}
