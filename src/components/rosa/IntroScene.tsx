import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import symbolSource from "@/assets/rosa-icon-dark.svg?raw";
import { getIntroFrame } from "@/lib/introMotion";
import { PadelCourt, type ThemeColors } from "./Hero3DScene";

interface SceneProps {
  progress: MotionValue<number>;
  theme: "light" | "dark";
  onReady: () => void;
}

function IntroWorld({ progress, theme, onReady }: SceneProps) {
  const logo = useRef<THREE.Group>(null);
  const court = useRef<THREE.Group>(null);
  const ready = useRef(false);
  const { camera, size, viewport, invalidate } = useThree();
  useEffect(
    () => progress.on("change", () => invalidate()),
    [progress, invalidate],
  );
  const [showCourt, setShowCourt] = useState(progress.get() > 0.43);
  useEffect(
    () => progress.on("change", (value) => setShowCourt(value > 0.43)),
    [progress],
  );

  const geometry = useMemo(() => {
    const source = new SVGLoader().parse(symbolSource);
    return source.paths.flatMap((path) =>
      SVGLoader.createShapes(path).map((shape) => {
        const shapeGeometry = new THREE.ExtrudeGeometry(shape, {
          depth: 8,
          bevelEnabled: true,
          bevelThickness: 1.2,
          bevelSize: 0.8,
          bevelSegments: 3,
          curveSegments: 24,
          steps: 1,
        });
        shapeGeometry.translate(-63.53, -63.53, -4);
        return shapeGeometry;
      }),
    );
  }, []);
  const materials = useMemo(
    () =>
      [theme === "light" ? "#242426" : "#ededf1", "#e4007c"].map(
        (color) =>
          new THREE.MeshPhysicalMaterial({
            color,
            metalness: 0.15,
            roughness: 0.28,
            clearcoat: 0.5,
            clearcoatRoughness: 0.2,
            transparent: true,
            side: THREE.DoubleSide,
          }),
      ),
    [theme],
  );
  useEffect(
    () => () => geometry.forEach((value) => value.dispose()),
    [geometry],
  );
  useEffect(
    () => () => materials.forEach((value) => value.dispose()),
    [materials],
  );
  const colors = useMemo<ThemeColors>(
    () => ({
      floor: new THREE.Color(theme === "light" ? "#c5c6ce" : "#464651"),
      darker: new THREE.Color(theme === "light" ? "#484850" : "#25252d"),
      fog: theme === "light" ? "#fafafa" : "#0b0b0d",
      net: new THREE.Color("#646470"),
      glass: new THREE.Color("#d9e0ed"),
      glassOpacity: 0.14,
    }),
    [theme],
  );

  useFrame((state) => {
    const frame = getIntroFrame(progress.get());
    const mobile = size.width < 640;
    if (camera instanceof THREE.PerspectiveCamera) {
      const fov = mobile ? 62 : 44;
      if (camera.fov !== fov) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
      const distance = mobile ? 1.35 : 1;
      camera.position.set(
        -frame.court * (mobile ? 3.8 : 4.6) * distance,
        frame.court * (mobile ? 3.2 : 3.7) * distance,
        THREE.MathUtils.lerp(8, mobile ? 5.8 * distance : 7.4, frame.court),
      );
      camera.lookAt(0, frame.court * 0.3, 0);
    }
    if (logo.current) {
      const currentViewport = viewport.getCurrentViewport(camera);
      const symbolFit =
        Math.min(currentViewport.width, currentViewport.height) *
        (mobile ? 0.48 : 0.34);
      const markWidth = Math.min(size.width * (mobile ? 0.76 : 0.62), 640);
      const wordmarkFit =
        ((markWidth * 0.31 * frame.wordmarkScale) / size.height) *
        currentViewport.height;
      const fit = THREE.MathUtils.lerp(symbolFit, wordmarkFit, frame.alignment);
      logo.current.position.x =
        ((-markWidth * 0.2 * frame.wordmarkScale) / size.width) *
        currentViewport.width *
        frame.alignment;
      logo.current.scale.set(fit / 127.06, -fit / 127.06, fit / 127.06);
      logo.current.rotation.set(
        Math.sin(frame.assembly * Math.PI) * 0.46 + state.pointer.y * 0.06,
        frame.spin + state.pointer.x * 0.1,
        Math.sin(frame.assembly * Math.PI) * -0.16,
      );
      logo.current.visible = frame.symbolOpacity > 0.001;
      logo.current.children.forEach((part, index) => {
        const side = index === 0 ? -1 : 1;
        part.position.set(
          side * frame.separation * 15,
          -side * frame.separation * 10,
          side * frame.separation * 8,
        );
        part.rotation.z = side * frame.separation * 0.13;
      });
      materials.forEach((material) => {
        material.opacity = frame.symbolOpacity;
      });
    }
    if (court.current) {
      court.current.visible = frame.court > 0.001;
      court.current.scale.setScalar(
        THREE.MathUtils.lerp(0.22, mobile ? 0.86 : 0.92, frame.court),
      );
      court.current.position.y = mobile
        ? size.height < 740
          ? -1.9
          : -0.7
        : -0.85;
      court.current.rotation.y =
        THREE.MathUtils.lerp(-0.7, -0.15, frame.court) + state.pointer.x * 0.1;
    }
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
  });

  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 5, 6]} intensity={3} color="#ffffff" />
      <directionalLight position={[-4, 2, 3]} intensity={1.6} color="#ffd8ec" />
      <group ref={logo}>
        {geometry.map((shape, index) => (
          <mesh
            key={index}
            geometry={shape}
            material={materials[index % materials.length]}
          />
        ))}
      </group>
      {showCourt && (
        <group ref={court} visible={false}>
          <PadelCourt colors={colors} rotation={0} />
        </group>
      )}
    </>
  );
}

export default function IntroScene({
  active,
  paused,
  ...props
}: SceneProps & { active: boolean; paused: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? (paused ? "demand" : "always") : "never"}
    >
      <IntroWorld {...props} />
    </Canvas>
  );
}
