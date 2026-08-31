import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function makeMShape() {
  // Bold angular "M" — legs 1.2 wide, deep centre V. ~4.4 box, centred.
  const s = new THREE.Shape();
  s.moveTo(-2.2, -2.2);
  s.lineTo(-2.2, 2.2);
  s.lineTo(-0.85, 2.2);
  s.lineTo(0.0, 0.55);
  s.lineTo(0.85, 2.2);
  s.lineTo(2.2, 2.2);
  s.lineTo(2.2, -2.2);
  s.lineTo(1.0, -2.2);
  s.lineTo(1.0, 0.75);
  s.lineTo(0.42, -0.2);
  s.lineTo(-0.42, -0.2);
  s.lineTo(-1.0, 0.75);
  s.lineTo(-1.0, -2.2);
  s.closePath();
  return s;
}

const PIXELS = Array.from({ length: 14 }, (_, i) => ({
  p: [
    Math.cos(i * 1.7) * (3.1 + (i % 3) * 0.5),
    Math.sin(i * 2.1) * 2.6,
    Math.sin(i * 1.3) * 1.4 - 0.4,
  ] as [number, number, number],
  s: 0.06 + (i % 4) * 0.035,
}));

export function MovexaM3D({
  pointer,
  scroll,
  quality = "high",
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
  quality?: "low" | "high";
}) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  const mGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(makeMShape(), {
      depth: 0.9,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.1,
      bevelSegments: quality === "high" ? 4 : 1,
      curveSegments: 6,
    });
    geo.center();
    return geo;
  }, [quality]);

  const playGeo = useMemo(() => {
    const tri = new THREE.Shape();
    tri.moveTo(-0.42, -0.5);
    tri.lineTo(0.55, 0);
    tri.lineTo(-0.42, 0.5);
    tri.closePath();
    const geo = new THREE.ExtrudeGeometry(tri, {
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 2,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !inner.current) return;
    const t = state.clock.elapsedTime;
    const sc = scroll.current;

    // pointer parallax (eased in usePointer already, tick here)
    const px = pointer.current.x;
    const py = pointer.current.y;

    // stay mostly face-on: gentle sway + pointer tilt, stronger turn only on scroll
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      px * 0.35 + Math.sin(t * 0.35) * 0.14 + sc * 1.9,
      3,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      py * 0.22 + Math.cos(t * 0.4) * 0.06 + sc * 0.6,
      3,
      delta,
    );
    // dive forward + shrink slightly as the hero scrolls away
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, sc * 5, 3, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, sc * -1.6, 3, delta);
    group.current.scale.setScalar(1 - sc * 0.22);

    inner.current.rotation.z = Math.sin(t * 0.2) * 0.05;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
        <group ref={inner}>
          {/* the M — polished violet acrylic, self-lit so it reads on any GPU */}
          <mesh geometry={mGeo} castShadow>
            <meshPhysicalMaterial
              color="#7A4DFF"
              emissive="#3a22a8"
              emissiveIntensity={0.85}
              metalness={0.35}
              roughness={0.22}
              clearcoat={1}
              clearcoatRoughness={0.15}
              iridescence={0.5}
              iridescenceIOR={1.3}
              sheen={0.6}
              sheenColor="#D728A9"
            />
          </mesh>

          {/* play triangle — bright emissive acrylic in the valley of the M */}
          <mesh geometry={playGeo} position={[0, -0.9, 0.55]} scale={1.15}>
            <meshPhysicalMaterial
              color="#ff5bc4"
              emissive="#D728A9"
              emissiveIntensity={1.1}
              metalness={0.2}
              roughness={0.2}
              clearcoat={1}
              toneMapped={false}
            />
          </mesh>

          {/* camera-lens rings */}
          <mesh rotation={[0, 0, 0]} position={[0, 0, 0.1]}>
            <torusGeometry args={[3.15, 0.05, 12, 80]} />
            <meshStandardMaterial color="#cbb8ff" metalness={1} roughness={0.18} />
          </mesh>
          <mesh rotation={[Math.PI / 2.4, 0.3, 0]} position={[0, 0, -0.2]}>
            <torusGeometry args={[3.55, 0.03, 10, 80]} />
            <meshStandardMaterial
              color="#D728A9"
              metalness={0.9}
              roughness={0.3}
              emissive="#3023AE"
              emissiveIntensity={0.4}
            />
          </mesh>

          {/* floating pixels */}
          {quality === "high" &&
            PIXELS.map((px, i) => (
              <mesh key={i} position={px.p}>
                <boxGeometry args={[px.s, px.s, px.s]} />
                <meshStandardMaterial
                  color={i % 2 ? "#D728A9" : "#6C3BFF"}
                  emissive={i % 2 ? "#D728A9" : "#6C3BFF"}
                  emissiveIntensity={0.8}
                  toneMapped={false}
                />
              </mesh>
            ))}
        </group>
      </Float>
    </group>
  );
}
