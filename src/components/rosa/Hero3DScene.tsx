import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import rosaIconWhite from "@/assets/rosa-icon-white.png";

const ROSA = new THREE.Color("#E4007C");

interface ThemeColors {
  floor: THREE.Color;
  darker: THREE.Color;
  fog: string;
  net: THREE.Color;
  glass: THREE.Color;
  glassOpacity: number;
}

const DARK_THEME: ThemeColors = {
  floor: new THREE.Color("#1a1a22"),
  darker: new THREE.Color("#2a2a35"),
  fog: "#0d0d14",
  net: new THREE.Color("#555566"),
  glass: new THREE.Color("#aabbcc"),
  glassOpacity: 0.25,
};

const LIGHT_THEME: ThemeColors = {
  floor: new THREE.Color("#f5f5f7"),
  darker: new THREE.Color("#eaeaef"),
  fog: "#fafafa",
  net: new THREE.Color("#ccccdd"),
  glass: new THREE.Color("#eef2ff"),
  glassOpacity: 0.12,
};

function useSvgTexture(src: string) {
  const texture = useMemo(() => {
    const tex = new THREE.Texture();
    const img = new Image();
    img.onload = () => {
      tex.image = img;
      tex.needsUpdate = true;
    };
    img.src = src;
    return tex;
  }, [src]);
  return texture;
}

function ScoreboardScreen() {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 256;
    const ctx = c.getContext("2d")!;
    
    // Background
    ctx.fillStyle = "#0d0d14";
    ctx.fillRect(0, 0, 512, 256);
    
    // Header bar
    ctx.fillStyle = "#E4007C";
    ctx.fillRect(0, 0, 512, 6);
    
    // "LIVE" badge
    ctx.fillStyle = "#E4007C";
    roundRect(ctx, 16, 20, 56, 24, 4);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("LIVE", 26, 37);
    
    // Set info
    ctx.fillStyle = "#666";
    ctx.font = "12px sans-serif";
    ctx.fillText("Set 3  •  Court 1", 86, 37);
    
    // Divider
    ctx.fillStyle = "#222";
    ctx.fillRect(16, 54, 480, 1);
    
    // Team 1 row
    const rowY1 = 80;
    ctx.fillStyle = "#e2e2e2";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("Rodri / Lean", 20, rowY1);
    // Score boxes
    drawScoreBox(ctx, 320, rowY1 - 18, "6", false);
    drawScoreBox(ctx, 365, rowY1 - 18, "6", false);
    drawScoreBox(ctx, 410, rowY1 - 18, "2", true);
    // Game score
    ctx.fillStyle = "#E4007C";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("15", 462, rowY1);
    
    // Divider
    ctx.fillStyle = "#1a1a24";
    ctx.fillRect(16, rowY1 + 14, 480, 1);
    
    // Team 2 row
    const rowY2 = 130;
    ctx.fillStyle = "#999";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("Saul / Jime", 20, rowY2);
    drawScoreBox(ctx, 320, rowY2 - 18, "2", false);
    drawScoreBox(ctx, 365, rowY2 - 18, "7", false);
    drawScoreBox(ctx, 410, rowY2 - 18, "1", true);
    ctx.fillStyle = "#888";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("30", 462, rowY2);
    
    // Bottom bar with rosa branding
    ctx.fillStyle = "#E4007C";
    ctx.globalAlpha = 0.15;
    ctx.fillRect(0, 220, 512, 36);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#E4007C";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("ROSA", 20, 242);
    ctx.fillStyle = "#555";
    ctx.font = "11px sans-serif";
    ctx.fillText("Powered by AI", 65, 242);
    
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);

  return (
    <mesh position={[0, 0, 0.025]}>
      <planeGeometry args={[0.9, 0.45]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawScoreBox(ctx: CanvasRenderingContext2D, x: number, y: number, score: string, active: boolean) {
  ctx.fillStyle = active ? "#1a1a2e" : "#141420";
  roundRect(ctx, x, y, 36, 28, 4);
  ctx.fill();
  if (active) {
    ctx.strokeStyle = "#E4007C";
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, 36, 28, 4);
    ctx.stroke();
  }
  ctx.fillStyle = active ? "#fff" : "#aaa";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText(score, x + 12, y + 21);
}

function SignalPulse({ vertical = false, scale: baseScale = 1 }: { vertical?: boolean; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const pulse = (Math.sin(t * 2) + 1) * 0.5; // 0-1
    const s = baseScale * (1 + pulse * 0.15);
    meshRef.current.scale.set(s, s, 1);
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.08 + pulse * 0.12;
  });

  return (
    <mesh ref={meshRef} rotation={vertical ? [0, 0, 0] : [Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.13, 0.18, 48]} />
      <meshBasicMaterial color={ROSA} transparent opacity={0.12} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function RecordingIndicator() {
  const dotRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const pulse = (Math.sin(state.clock.elapsedTime * 4) + 1) * 0.5;

    if (dotRef.current) {
      const material = dotRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.6 + pulse * 0.4;
    }

    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      const scale = 1 + pulse * 0.35;
      glowRef.current.scale.set(scale, scale, scale);
      material.opacity = 0.12 + pulse * 0.18;
    }
  });

  return (
    <group position={[0.105, 0.07, -0.126]}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.032, 16, 16]} />
        <meshBasicMaterial color="#ff2b3a" transparent opacity={0.2} depthWrite={false} />
      </mesh>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial color="#ff3b4d" transparent opacity={1} />
      </mesh>
    </group>
  );
}

// Pre-compute color LUT for heatmap (256 entries)
const HEAT_LUT = (() => {
  const lut = new Uint8Array(256 * 4);
  for (let i = 0; i < 256; i++) {
    const v = i / 255;
    const [r, g, b] = heatColor(v);
    const idx = i * 4;
    lut[idx] = r;
    lut[idx + 1] = g;
    lut[idx + 2] = b;
    lut[idx + 3] = v < 0.01 ? 0 : Math.min(255, Math.round(v * 280));
  }
  return lut;
})();

function HeatmapFloor({ courtW, courtL }: { courtW: number; courtL: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const canvasRef = useRef(document.createElement("canvas"));
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const frameCount = useRef(0);

  const heatPoints = useRef([
    { x: 60, y: 50, radius: 45, intensity: 0.9, phase: 0 },
    { x: 180, y: 55, radius: 50, intensity: 0.85, phase: 0.8 },
    { x: 120, y: 40, radius: 35, intensity: 0.7, phase: 1.5 },
    { x: 90, y: 80, radius: 30, intensity: 0.6, phase: 2.1 },
    { x: 200, y: 90, radius: 28, intensity: 0.55, phase: 0.3 },
    { x: 40, y: 100, radius: 25, intensity: 0.4, phase: 1.0 },
    { x: 150, y: 95, radius: 22, intensity: 0.45, phase: 2.5 },
    { x: 128, y: 140, radius: 20, intensity: 0.3, phase: 1.8 },
    { x: 70, y: 700, radius: 48, intensity: 0.88, phase: 0.5 },
    { x: 190, y: 690, radius: 44, intensity: 0.82, phase: 1.3 },
    { x: 130, y: 720, radius: 38, intensity: 0.75, phase: 2.0 },
    { x: 100, y: 670, radius: 26, intensity: 0.5, phase: 0.7 },
    { x: 210, y: 660, radius: 24, intensity: 0.45, phase: 1.6 },
    { x: 50, y: 650, radius: 22, intensity: 0.35, phase: 2.3 },
    { x: 160, y: 640, radius: 20, intensity: 0.4, phase: 0.9 },
    { x: 100, y: 350, radius: 18, intensity: 0.2, phase: 1.2 },
    { x: 160, y: 420, radius: 16, intensity: 0.18, phase: 2.8 },
    { x: 80, y: 450, radius: 15, intensity: 0.15, phase: 0.4 },
  ]);

  useMemo(() => {
    const c = canvasRef.current;
    c.width = 256;
    c.height = 384;
    textureRef.current = new THREE.CanvasTexture(c);
  }, []);

  useFrame((state) => {
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    const c = canvasRef.current;
    const ctx = c.getContext("2d")!;
    const t = state.clock.elapsedTime;
    const W = c.width;
    const H = c.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    ctx.filter = "blur(10px)";

    for (const pt of heatPoints.current) {
      const px = pt.x + Math.sin(t * 0.8 + pt.phase) * 3;
      const py = pt.y * (H / 768) + Math.cos(t * 0.7 + pt.phase * 1.3) * 2.5;
      const r = pt.radius * (0.9 + 0.1 * Math.sin(t * 1.0 + pt.phase));
      const alpha = Math.min(1, pt.intensity * (0.85 + 0.15 * Math.sin(t * 1.0 + pt.phase)));

      const grad = ctx.createRadialGradient(px, py, 0, px, py, r);
      grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
      grad.addColorStop(0.5, `rgba(255,255,255,${alpha * 0.4})`);
      grad.addColorStop(1, `rgba(255,255,255,0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(px - r, py - r, r * 2, r * 2);
    }

    ctx.filter = "none";
    ctx.globalCompositeOperation = "source-over";

    const imageData = ctx.getImageData(0, 0, W, H);
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      const idx = d[i] * 4;
      d[i] = HEAT_LUT[idx];
      d[i + 1] = HEAT_LUT[idx + 1];
      d[i + 2] = HEAT_LUT[idx + 2];
      d[i + 3] = HEAT_LUT[idx + 3];
    }
    ctx.putImageData(imageData, 0, 0);

    if (textureRef.current) textureRef.current.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[courtW, courtL]} />
      <meshBasicMaterial map={textureRef.current} transparent depthWrite={false} opacity={0.85} />
    </mesh>
  );
}

// Maps 0-1 intensity to heatmap color: blue → cyan → green → yellow → orange → red
function heatColor(v: number): [number, number, number] {
  if (v < 0.1) {
    const t = v / 0.1;
    return [0, 0, Math.round(80 + t * 140)]; // dark blue → blue
  } else if (v < 0.2) {
    const t = (v - 0.1) / 0.1;
    return [0, Math.round(t * 200), Math.round(220 - t * 40)]; // blue → cyan
  } else if (v < 0.3) {
    const t = (v - 0.2) / 0.1;
    return [0, Math.round(200 + t * 55), Math.round(180 - t * 180)]; // cyan → green
  } else if (v < 0.45) {
    const t = (v - 0.3) / 0.15;
    return [Math.round(t * 255), 255, 0]; // green → yellow
  } else if (v < 0.6) {
    const t = (v - 0.45) / 0.15;
    return [255, Math.round(255 - t * 130), 0]; // yellow → orange
  } else {
    const t = Math.min(1, (v - 0.6) / 0.4);
    return [255, Math.round(125 - t * 125), 0]; // orange → red
  }
}

function PadelCourt({ colors }: { colors: ThemeColors }) {
  const groupRef = useRef<THREE.Group>(null);
  const logoTexture = useSvgTexture(rosaIconWhite);

  const darkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.darker, metalness: 0.6, roughness: 0.4 }),
    [colors]
  );
  const floorMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.floor, metalness: 0.5, roughness: 0.5 }),
    [colors]
  );
  const glassMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: colors.glass,
      metalness: 0.1,
      roughness: 0.05,
      transparent: true,
      opacity: colors.glassOpacity,
      transmission: 0.85,
      depthWrite: false,
    }),
    [colors]
  );
  const edgeMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: ROSA, transparent: true, opacity: 1.0 }),
    []
  );
  const pinkMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: ROSA }),
    []
  );
  const netMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: colors.net, metalness: 0.3, roughness: 0.7, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
    [colors]
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  const courtW = 3;
  const courtL = 4.5;
  const wallH = 1.2;
  const glassH = 0.9;
  const floorThick = 0.05;

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Floor */}
        <mesh material={floorMat} position={[0, 0, 0]}>
          <boxGeometry args={[courtW + 0.1, floorThick, courtL + 0.1]} />
        </mesh>
        {/* Heatmap overlay on floor */}
        <HeatmapFloor courtW={courtW} courtL={courtL} />

        {/* Center line */}
        <mesh position={[0, 0.06, 0]} material={edgeMat} renderOrder={1}>
          <boxGeometry args={[courtW, 0.01, 0.015]} />
        </mesh>
        {/* Service lines */}
        {[-1.65, 1.65].map((z, i) => (
          <mesh key={`sv-${i}`} position={[0, 0.06, z]} material={edgeMat} renderOrder={1}>
            <boxGeometry args={[courtW, 0.01, 0.015]} />
          </mesh>
        ))}
        {/* Center service dividers (connecting center line to service lines) */}
        {[-0.825, 0.825].map((z, i) => (
          <mesh key={`csv-${i}`} position={[0, 0.06, z]} material={edgeMat} renderOrder={1}>
            <boxGeometry args={[0.015, 0.01, 1.65]} />
          </mesh>
        ))}

        {/* Back walls (glass-like, low opacity) */}
        {[-1, 1].map((side) => (
          <mesh
            key={`bw-${side}`}
            position={[0, wallH / 2 + floorThick / 2, side * courtL / 2]}
          >
            <boxGeometry args={[courtW, wallH, 0.04]} />
            <meshPhysicalMaterial
              color={new THREE.Color("#aabbcc")}
              metalness={0.1}
              roughness={0.05}
              transparent
              opacity={0.28}
              transmission={0.85}
              depthWrite={false}
            />
          </mesh>
        ))}

        {/* Glass side walls */}
        {[-1, 1].map((side) => (
          <mesh
            key={`gw-${side}`}
            material={glassMat}
            position={[side * courtW / 2, glassH / 2 + floorThick / 2, 0]}
          >
            <boxGeometry args={[0.03, glassH, courtL]} />
          </mesh>
        ))}

        {/* Glass back-wall top */}
        {[-1, 1].map((side) => (
          <mesh
            key={`gbw-${side}`}
            material={glassMat}
            position={[0, wallH + glassH / 2 + floorThick / 2, side * courtL / 2]}
          >
            <boxGeometry args={[courtW, glassH * 0.5, 0.025]} />
          </mesh>
        ))}

        {/* Cylinder pads on back walls (inside face) with logo */}
        {[-1, 1].map((side) => (
          <group key={`pad-group-${side}`} position={[0, 0.7, side * (courtL / 2 - 0.06)]}>
            <mesh
              material={pinkMat}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.12, 0.12, 0.04, 24]} />
            </mesh>
            {/* Logo on inward-facing side */}
            <mesh position={[0, 0, -side * 0.025]} rotation={[0, side > 0 ? Math.PI : 0, 0]}>
              <planeGeometry args={[0.16, 0.16]} />
              <meshBasicMaterial map={logoTexture} transparent side={THREE.DoubleSide} />
            </mesh>
            {/* Signal pulse */}
            <SignalPulse />
          </group>
        ))}

        {/* Net in the center */}
        {/* Net posts */}
        {[-1, 1].map((side) => (
          <mesh
            key={`npost-${side}`}
            material={darkMat}
            position={[side * courtW / 2 * 0.95, 0.22, 0]}
          >
            <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
          </mesh>
        ))}
        {/* Net mesh */}
        <mesh position={[0, 0.24, 0]} material={netMat}>
          <boxGeometry args={[courtW * 0.9, 0.35, 0.015]} />
        </mesh>
        {/* Net top edge (cable) */}
        <mesh position={[0, 0.42, 0]} material={edgeMat}>
          <boxGeometry args={[courtW * 0.92, 0.02, 0.02]} />
        </mesh>

        {/* Monitor on the SIDE of the court (no pole) */}
        <group position={[courtW / 2 + 0.4, 1.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
          {/* Monitor frame */}
          <mesh>
            <boxGeometry args={[1.0, 0.55, 0.04]} />
            <meshStandardMaterial color={colors.darker} metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Scoreboard UI */}
          <ScoreboardScreen />
          {/* Signal pulse around monitor */}
          <group position={[0, 0, 0.03]}>
            <SignalPulse vertical scale={3} />
          </group>
        </group>

        {/* Floating video camera behind back wall */}
        <group position={[0, 1.0, -courtL / 2 - 0.6]} scale={0.6}>
          {/* Main body */}
          <mesh>
            <boxGeometry args={[0.3, 0.2, 0.25]} />
            <meshStandardMaterial color={new THREE.Color("#444455")} metalness={0.5} roughness={0.4} />
          </mesh>
          {/* Lens cone (front) */}
          <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.08, 0.12, 16]} />
            <meshStandardMaterial color={new THREE.Color("#555566")} metalness={0.5} roughness={0.4} />
          </mesh>
          {/* Lens glass */}
          <mesh position={[0, 0, 0.25]}>
            <circleGeometry args={[0.04, 16]} />
            <meshPhysicalMaterial color={new THREE.Color("#336")} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Lens ring */}
          <mesh position={[0, 0, 0.24]} material={edgeMat} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.045, 0.006, 8, 24]} />
          </mesh>
          {/* Viewfinder (side trapezoid-like piece) */}
          <mesh position={[0.2, 0.02, 0]}>
            <boxGeometry args={[0.12, 0.22, 0.18]} />
            <meshStandardMaterial color={new THREE.Color("#444455")} metalness={0.5} roughness={0.4} />
          </mesh>
          {/* Viewfinder front */}
          <mesh position={[0.26, 0.02, 0.06]}>
            <boxGeometry args={[0.01, 0.1, 0.08]} />
            <meshBasicMaterial color={new THREE.Color("#333")} />
          </mesh>
          {/* Top handle */}
          <mesh position={[0, 0.14, 0]}>
            <boxGeometry args={[0.18, 0.04, 0.15]} />
            <meshStandardMaterial color={new THREE.Color("#444455")} metalness={0.5} roughness={0.4} />
          </mesh>
          {/* Recording indicator on the rear top-right corner */}
          <RecordingIndicator />
          {/* Signal pulse around camera */}
          <group position={[0, 0, 0.15]}>
            <SignalPulse vertical scale={2} />
          </group>
        </group>

        {/* Corner posts */}
        {[-1, 1].map((x) =>
          [-1, 1].map((z) => (
            <mesh
              key={`post-${x}-${z}`}
              material={darkMat}
              position={[x * courtW / 2, (wallH + glassH * 0.3) / 2 + floorThick / 2, z * courtL / 2]}
            >
              <boxGeometry args={[0.05, wallH + glassH * 0.3, 0.05]} />
            </mesh>
          ))
        )}

        {/* Wall top edge highlights */}
        {[-1, 1].map((side) => (
          <mesh
            key={`we-${side}`}
            position={[0, wallH + floorThick / 2, side * courtL / 2]}
            material={edgeMat}
          >
            <boxGeometry args={[courtW + 0.02, 0.015, 0.045]} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function CourtGrid() {
  const lines = useMemo(() => {
    const pts: [number, number, number][][] = [];
    for (let i = -5; i <= 5; i++) {
      pts.push([[-5, 0, i], [5, 0, i]]);
      pts.push([[i, 0, -5], [i, 0, 5]]);
    }
    return pts;
  }, []);

  return (
    <group position={[0, -4, -6]} rotation={[-Math.PI / 2.5, 0, 0]}>
      {lines.map((line, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(
          line.map((p) => new THREE.Vector3(...p))
        );
        return (
          <lineSegments key={i} geometry={geometry}>
            <lineBasicMaterial color={ROSA} transparent opacity={0.06} />
          </lineSegments>
        );
      })}
    </group>
  );
}

export default function Hero3DScene({ theme }: { theme: "dark" | "light" }) {
  const colors = theme === "light" ? LIGHT_THEME : DARK_THEME;

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [3.5, 2, 4.5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, logarithmicDepthBuffer: true }} frameloop="always">
        <fog attach="fog" args={[colors.fog, 6, 16]} />
        <ambientLight intensity={theme === "light" ? 1.2 : 0.6} />
        <pointLight position={[5, 5, 5]} intensity={theme === "light" ? 0.8 : 1.2} color="#E4007C" />
        <pointLight position={[-5, 3, 3]} intensity={theme === "light" ? 1.0 : 0.6} color="#ffffff" />
        <pointLight position={[0, 4, 0]} intensity={theme === "light" ? 0.8 : 0.4} color="#ffffff" />
        <PadelCourt colors={colors} />
        <CourtGrid />
      </Canvas>
    </div>
  );
}
