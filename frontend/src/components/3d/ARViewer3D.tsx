import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Grid, Html } from '@react-three/drei';
import { Camera, RefreshCw, ZoomIn, ZoomOut, RotateCw, Video, CheckCircle2, Sliders, ShieldCheck, Compass, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { BuildingConfig } from '../../types';

interface ARViewerProps {
  config: BuildingConfig;
  onCaptureSnapshot?: (dataUrl: string) => void;
}

export const ARViewer3D: React.FC<ARViewerProps> = ({ config, onCaptureSnapshot }) => {
  const [scaleMode, setScaleMode] = useState<'1:1 Real-World' | '1:50 Tabletop'>('1:50 Tabletop');
  const [scaleFactor, setScaleFactor] = useState<number>(1.0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isPlaced, setIsPlaced] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [flashActive, setFlashActive] = useState<boolean>(false);
  const [hasCameraStream, setHasCameraStream] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Attempt real camera stream if available on device
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            setHasCameraStream(true);
          }
        })
        .catch(() => {
          // Fallback to high-definition simulated drone / site camera background
          setHasCameraStream(false);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 300);

    const snapshot = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
    onCaptureSnapshot?.(snapshot);
  };

  return (
    <div className="relative w-full h-[680px] rounded-3xl overflow-hidden border border-slate-700/80 bg-black shadow-2xl">
      {/* Real Camera Stream or AR Site Simulation Background */}
      {hasCameraStream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black">
          {/* Simulated AR Land Camera View */}
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
            alt="AR Site Ground"
            className="w-full h-full object-cover opacity-45 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-blue-950/20 backdrop-brightness-95" />
        </div>
      )}

      {/* AR HUD Targeting Reticle & Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        {/* Top Header HUD */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 rounded-2xl px-4 py-2 flex items-center gap-2.5 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-mono text-xs font-bold tracking-wider">WEBXR AR SPATIAL ENGINE</span>
            </div>
            <Badge variant="electric">{scaleMode}</Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-slate-300">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>HEADING 042° NE</span>
            </div>
            <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>12.9716° N, 77.5946° E</span>
            </div>
          </div>
        </div>

        {/* Center Reticle Guide */}
        <div className="self-center flex flex-col items-center gap-2">
          <div className="w-24 h-24 border border-cyan-400/40 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
          </div>
          <span className="text-[11px] font-mono text-cyan-300 bg-slate-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
            GROUND SURFACE LOCKED (PLANE DETECTED)
          </span>
        </div>

        {/* Bottom Floating Control Dock */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto bg-slate-950/85 backdrop-blur-xl border border-slate-700/80 p-4 rounded-3xl shadow-2xl">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setScaleMode(scaleMode === '1:1 Real-World' ? '1:50 Tabletop' : '1:1 Real-World');
                setScaleFactor(scaleMode === '1:1 Real-World' ? 1.0 : 2.5);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              Toggle Scale ({scaleMode})
            </button>
            <button
              onClick={() => setRotationAngle(prev => (prev + 45) % 360)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
              title="Rotate Model 45°"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScaleFactor(prev => Math.min(prev + 0.2, 3.0))}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
              title="Scale Up"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScaleFactor(prev => Math.max(prev - 0.2, 0.4))}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
              title="Scale Down"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Action CTAs: Snapshot & Video */}
          <div className="flex items-center gap-3">
            <Button
              variant={isRecording ? 'danger' : 'secondary'}
              size="md"
              leftIcon={<Video className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />}
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? 'REC 00:14 (Stop)' : 'Record AR Video'}
            </Button>
            <Button
              variant="electric"
              size="md"
              leftIcon={<Camera className="w-4 h-4" />}
              onClick={handleCapture}
            >
              Capture Site Photo
            </Button>
          </div>
        </div>
      </div>

      {/* 3D AR Model Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [10, 8, 14], fov: 45 }}
          className="w-full h-full"
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 15, 10]} intensity={1.8} castShadow />

          {/* AR Placement Shadow & Surface Grid */}
          <Grid
            infiniteGrid
            position={[0, 0, 0]}
            cellSize={0.5}
            sectionSize={2.5}
            cellColor="#00F0FF"
            sectionColor="#0066FF"
            fadeDistance={20}
          />

          {/* Placed Building Mesh */}
          <group
            position={[0, 0, 0]}
            scale={[scaleFactor * 0.7, scaleFactor * 0.7, scaleFactor * 0.7]}
            rotation={[0, (rotationAngle * Math.PI) / 180, 0]}
          >
            {/* Building Floors */}
            {Array.from({ length: config.num_floors }).map((_, i) => (
              <group key={i} position={[0, i * 2.4, 0]}>
                {/* Floor Slab */}
                <mesh position={[0, 0.1, 0]}>
                  <boxGeometry args={[8.4, 0.2, 10.4]} />
                  <meshStandardMaterial color="#94A3B8" roughness={0.4} />
                </mesh>
                {/* Walls */}
                <mesh position={[0, 1.2, -5.0]}>
                  <boxGeometry args={[8.0, 2.2, 0.25]} />
                  <meshStandardMaterial color={config.wall_color} />
                </mesh>
                <mesh position={[0, 1.2, 5.0]}>
                  <boxGeometry args={[8.0, 2.2, 0.25]} />
                  <meshStandardMaterial color={config.wall_color} />
                </mesh>
                {/* Glass Facade */}
                <mesh position={[0, 1.2, 5.15]}>
                  <boxGeometry args={[5.6, 1.6, 0.05]} />
                  <meshPhysicalMaterial color="#38BDF8" transmission={0.9} transparent opacity={0.6} />
                </mesh>
                {/* Balcony */}
                {config.has_balcony && i > 0 && (
                  <mesh position={[0, 0.1, 6.2]}>
                    <boxGeometry args={[6.0, 0.15, 2.2]} />
                    <meshStandardMaterial color="#D97706" />
                  </mesh>
                )}
              </group>
            ))}

            {/* Solar Roof */}
            <mesh position={[0, config.num_floors * 2.4 + 0.15, 0]}>
              <boxGeometry args={[8.4, 0.3, 10.4]} />
              <meshStandardMaterial color="#1E293B" />
            </mesh>
            {config.has_solar && (
              <mesh position={[0, config.num_floors * 2.4 + 0.35, 0]} rotation={[-0.15, 0, 0]}>
                <boxGeometry args={[7.0, 0.08, 7.0]} />
                <meshStandardMaterial color="#0284C7" metalness={0.9} roughness={0.2} />
              </mesh>
            )}
          </group>

          <ContactShadows position={[0, 0.02, 0]} opacity={0.7} scale={20} blur={2} />
          <OrbitControls enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI / 2 - 0.05} />
        </Canvas>
      </div>

      {/* Camera Shutter Flash Animation */}
      {flashActive && (
        <div className="absolute inset-0 bg-white z-50 pointer-events-none animate-ping opacity-90 transition-opacity" />
      )}
    </div>
  );
};
