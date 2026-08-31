import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { MovexaM3D } from "./MovexaM3D";
import { Particles } from "./Particles";
import { useMediaQuery, usePerfTier, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Persistent hero 3D stage: fixed behind the page, fades out once the hero has
 * scrolled away. Lit entirely by real lights so it renders identically on any
 * GPU (or software fallback) without waiting on an HDR environment.
 */
export function Stage() {
  const tier = usePerfTier();
  const reduced = usePrefersReducedMotion();
  const narrow = useMediaQuery("(max-width: 860px)");
  const pointer = useRef({ x: 0, y: 0 });
  const targetPointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const [opacity, setOpacity] = useState(1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      targetPointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetPointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    let raf = 0;
    const ease = () => {
      pointer.current.x += (targetPointer.current.x - pointer.current.x) * 0.06;
      pointer.current.y += (targetPointer.current.y - pointer.current.y) * 0.06;
      raf = requestAnimationFrame(ease);
    };
    raf = requestAnimationFrame(ease);

    const onScroll = () => {
      const h = window.innerHeight;
      scroll.current = Math.min(1, window.scrollY / Math.max(1, h));
      setOpacity(1 - Math.min(1, Math.max(0, (window.scrollY - h * 0.5) / (h * 0.7))));
      setVisible(window.scrollY < h * 1.7);
    };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (reduced) {
    return <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-brand-radial" />;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      style={{ opacity, visibility: visible ? "visible" : "hidden" }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 42 }}
        dpr={[1, tier === "high" ? 1.8 : 1.3]}
        gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
      >
        <ambientLight intensity={1.1} />
        <hemisphereLight args={["#b9a8ff", "#0a0a1f", 1.1]} />
        <directionalLight position={[5, 8, 8]} intensity={2.6} color="#e9e2ff" />
        <pointLight position={[-7, -1, 6]} intensity={70} color="#D728A9" distance={40} />
        <pointLight position={[8, 5, -2]} intensity={55} color="#6C3BFF" distance={40} />
        <pointLight position={[3, -4, 8]} intensity={30} color="#3023AE" distance={40} />

        <group
          position={narrow ? [0.3, 3.6, -2] : [3.9, -0.6, 0]}
          scale={narrow ? 0.46 : 0.82}
        >
          <MovexaM3D pointer={pointer} scroll={scroll} quality={tier} />
        </group>

        {tier === "high" && <Particles count={narrow ? 400 : 850} />}
      </Canvas>
    </div>
  );
}
