import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, ContactShadows, Float, Html, Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { BuildingConfig } from '../../types';

interface BuildingSceneProps {
  config: BuildingConfig;
  selectedElementId?: string | null;
  onSelectElement?: (elementId: string | null) => void;
  interactive?: boolean;
}

// Procedural 3D Building Floor Mesh
const BuildingFloor = ({
  floorIndex,
  totalFloors,
  wallColor,
  hasBalcony,
  isWireframe,
  selectedElementId,
  onSelect
}: {
  floorIndex: number;
  totalFloors: number;
  wallColor: string;
  hasBalcony: boolean;
  isWireframe: boolean;
  selectedElementId?: string | null;
  onSelect?: (id: string) => void;
}) => {
  const floorHeight = 2.4;
  const width = 8.0;
  const depth = 10.0;
  const yPos = 0.2 + (floorIndex * floorHeight);
  const floorId = `floor_level_${floorIndex}`;

  const isSelected = selectedElementId === floorId;

  return (
    <group position={[0, yPos, 0]}>
      {/* Floor Concrete Slab */}
      <mesh
        position={[0, 0.1, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(floorId);
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width + 0.4, 0.2, depth + 0.4]} />
        <meshStandardMaterial
          color={isSelected ? "#38BDF8" : "#94A3B8"}
          wireframe={isWireframe}
          roughness={0.4}
        />
      </mesh>

      {/* Main Structural Walls */}
      {/* North Wall */}
      <mesh position={[0, floorHeight / 2, -depth / 2]} castShadow receiveShadow>
        <boxGeometry args={[width, floorHeight - 0.2, 0.25]} />
        <meshStandardMaterial
          color={wallColor}
          wireframe={isWireframe}
          transparent={isWireframe}
          opacity={isWireframe ? 0.3 : 1.0}
        />
      </mesh>

      {/* South Wall with Architectural Glass Windows */}
      <mesh position={[0, floorHeight / 2, depth / 2]} castShadow receiveShadow>
        <boxGeometry args={[width, floorHeight - 0.2, 0.25]} />
        <meshStandardMaterial
          color={wallColor}
          wireframe={isWireframe}
          transparent={isWireframe}
          opacity={isWireframe ? 0.3 : 1.0}
        />
      </mesh>

      {/* East & West Walls */}
      <mesh position={[width / 2, floorHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.25, floorHeight - 0.2, depth]} />
        <meshStandardMaterial
          color={wallColor}
          wireframe={isWireframe}
          transparent={isWireframe}
          opacity={isWireframe ? 0.3 : 1.0}
        />
      </mesh>
      <mesh position={[-width / 2, floorHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.25, floorHeight - 0.2, depth]} />
        <meshStandardMaterial
          color={wallColor}
          wireframe={isWireframe}
          transparent={isWireframe}
          opacity={isWireframe ? 0.3 : 1.0}
        />
      </mesh>

      {/* Glass Panoramic Windows on Facade */}
      <mesh position={[0, floorHeight / 2, (depth / 2) + 0.15]}>
        <boxGeometry args={[width * 0.7, floorHeight * 0.7, 0.05]} />
        <meshPhysicalMaterial
          color="#38BDF8"
          transmission={0.85}
          opacity={1.0}
          transparent
          roughness={0.05}
          ior={1.5}
          thickness={0.2}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Balcony on upper floors */}
      {hasBalcony && floorIndex > 0 && (
        <group position={[0, 0.1, (depth / 2) + 1.2]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[width * 0.75, 0.15, 2.2]} />
            <meshStandardMaterial color="#D97706" roughness={0.7} wireframe={isWireframe} />
          </mesh>
          {/* Glass Railing */}
          <mesh position={[0, 0.5, 1.0]}>
            <boxGeometry args={[width * 0.75, 0.8, 0.05]} />
            <meshPhysicalMaterial color="#38BDF8" transmission={0.9} transparent opacity={0.6} roughness={0.1} />
          </mesh>
        </group>
      )}

      {/* Floor Number Indicator Tag */}
      <Html position={[-width / 2 - 0.8, floorHeight / 2, 0]} center distanceFactor={15}>
        <div className="bg-slate-900/90 text-cyan-400 font-mono text-[10px] px-2 py-0.5 rounded border border-cyan-500/40 backdrop-blur pointer-events-none shadow-lg whitespace-nowrap">
          LEVEL {floorIndex + 1}
        </div>
      </Html>
    </group>
  );
};

// Procedural Roof with Solar Panel Array
const BuildingRoof = ({
  totalFloors,
  hasSolar,
  isWireframe
}: {
  totalFloors: number;
  hasSolar: boolean;
  isWireframe: boolean;
}) => {
  const floorHeight = 2.4;
  const width = 8.4;
  const depth = 10.4;
  const yPos = 0.2 + (totalFloors * floorHeight);

  return (
    <group position={[0, yPos, 0]}>
      {/* Roof Deck Slab */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.3, depth]} />
        <meshStandardMaterial color="#1E293B" roughness={0.6} wireframe={isWireframe} />
      </mesh>

      {/* Solar Panel Array */}
      {hasSolar && (
        <group position={[0, 0.35, 0]}>
          {[-2.5, 0, 2.5].map((x, i) => (
            <mesh key={i} position={[x, 0.08, 0]} rotation={[-0.15, 0, 0]} castShadow>
              <boxGeometry args={[2.0, 0.08, depth * 0.7]} />
              <meshStandardMaterial color="#0284C7" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
          <Html position={[0, 1.0, 0]} center distanceFactor={16}>
            <div className="bg-emerald-950/90 text-emerald-300 font-mono text-[10px] px-2 py-0.5 rounded border border-emerald-500/40 backdrop-blur shadow-lg flex items-center gap-1 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              12.4 kW BIPV SOLAR ARRAY
            </div>
          </Html>
        </group>
      )}
    </group>
  );
};

// Landscape Garden & Parking Canopy
const LandscapeEnvironment = ({
  hasGarden,
  hasParking,
  isWireframe
}: {
  hasGarden: boolean;
  hasParking: boolean;
  isWireframe: boolean;
}) => {
  return (
    <group position={[0, 0, 0]}>
      {/* Base Site Plot Terrain */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[26, 0.1, 26]} />
        <meshStandardMaterial color="#0F172A" roughness={0.9} />
      </mesh>

      {/* Lush Green Lawn */}
      {hasGarden && (
        <group>
          <mesh position={[0, 0.01, 0]} receiveShadow>
            <boxGeometry args={[20, 0.02, 20]} />
            <meshStandardMaterial color="#065F46" roughness={0.8} wireframe={isWireframe} />
          </mesh>
          {/* Architectural Trees */}
          {[
            [-8, 0, -8],
            [8, 0, -8],
            [-8, 0, 8],
          ].map((pos, idx) => (
            <group key={idx} position={pos as [number, number, number]}>
              {/* Trunk */}
              <mesh position={[0, 1.0, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.2, 2.0, 8]} />
                <meshStandardMaterial color="#78350F" />
              </mesh>
              {/* Canopy */}
              <mesh position={[0, 2.3, 0]} castShadow>
                <coneGeometry args={[1.4, 2.2, 8]} />
                <meshStandardMaterial color="#10B981" roughness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* Parking Canopy Pergola */}
      {hasParking && (
        <group position={[7.5, 0, 2.0]}>
          {/* Canopy Roof */}
          <mesh position={[0, 2.2, 0]} castShadow>
            <boxGeometry args={[4.2, 0.15, 6.0]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Support Columns */}
          {[-1.8, 1.8].map((x, i) =>
            [-2.6, 2.6].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 1.1, z]} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 2.2, 8]} />
                <meshStandardMaterial color="#1E293B" metalness={0.8} />
              </mesh>
            ))
          )}
          {/* EV Vehicle Mockup */}
          <group position={[0, 0.6, 0]}>
            <mesh castShadow>
              <boxGeometry args={[2.0, 0.8, 4.2]} />
              <meshStandardMaterial color="#0284C7" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.6, -0.2]}>
              <boxGeometry args={[1.7, 0.6, 2.4]} />
              <meshPhysicalMaterial color="#38BDF8" transmission={0.9} transparent opacity={0.7} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
};

export const BuildingScene3D: React.FC<BuildingSceneProps> = ({
  config,
  selectedElementId,
  onSelectElement,
  interactive = true
}) => {
  const isWireframe = config.lighting_preset === 'Blueprint Wireframe' || config.x_ray_mode;

  const getLighting = () => {
    switch (config.lighting_preset) {
      case 'Golden Hour':
        return {
          ambient: 0.5,
          sunColor: '#F59E0B',
          sunPos: [15, 6, 10] as [number, number, number],
          skyTurbidity: 8,
          skyRayleigh: 4,
          skyAzimuth: 180
        };
      case 'Night':
        return {
          ambient: 0.2,
          sunColor: '#38BDF8',
          sunPos: [5, 12, -10] as [number, number, number],
          skyTurbidity: 1,
          skyRayleigh: 0.5,
          skyAzimuth: 270
        };
      case 'Blueprint Wireframe':
        return {
          ambient: 1.0,
          sunColor: '#00F0FF',
          sunPos: [10, 20, 10] as [number, number, number],
          skyTurbidity: 0,
          skyRayleigh: 0,
          skyAzimuth: 0
        };
      default: // Day
        return {
          ambient: 0.7,
          sunColor: '#FFFFFF',
          sunPos: [12, 18, 12] as [number, number, number],
          skyTurbidity: 2,
          skyRayleigh: 2,
          skyAzimuth: 180
        };
    }
  };

  const light = getLighting();

  return (
    <div className="w-full h-full relative select-none rounded-2xl overflow-hidden bg-[#060913]">
      <Canvas
        shadows
        camera={{ position: [16, 12, 18], fov: 42 }}
        className="w-full h-full"
      >
        {/* Sky / Atmospheric Environment */}
        {config.lighting_preset === 'Night' ? (
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        ) : config.lighting_preset !== 'Blueprint Wireframe' ? (
          <Sky
            distance={450000}
            sunPosition={light.sunPos}
            turbidity={light.skyTurbidity}
            rayleigh={light.skyRayleigh}
            azimuth={light.skyAzimuth}
          />
        ) : null}

        <ambientLight intensity={light.ambient} />
        <directionalLight
          castShadow
          position={light.sunPos}
          intensity={1.4}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
          color={light.sunColor}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.4} />

        {/* 3D Grid Guide */}
        <Grid
          infiniteGrid
          position={[0, 0, 0]}
          cellSize={1}
          sectionSize={5}
          cellColor="#1E293B"
          sectionColor="#334155"
          fadeDistance={35}
          fadeStrength={1.5}
        />

        {/* Building Structure */}
        <group position={[0, 0, 0]}>
          <LandscapeEnvironment
            hasGarden={config.has_garden}
            hasParking={config.has_parking}
            isWireframe={isWireframe}
          />

          {Array.from({ length: config.num_floors }).map((_, i) => (
            <BuildingFloor
              key={i}
              floorIndex={i}
              totalFloors={config.num_floors}
              wallColor={config.wall_color}
              hasBalcony={config.has_balcony}
              isWireframe={isWireframe}
              selectedElementId={selectedElementId}
              onSelect={onSelectElement}
            />
          ))}

          <BuildingRoof
            totalFloors={config.num_floors}
            hasSolar={config.has_solar}
            isWireframe={isWireframe}
          />
        </group>

        {/* Soft Contact Shadows */}
        <ContactShadows
          position={[0, 0.05, 0]}
          opacity={0.65}
          scale={30}
          blur={1.5}
          far={10}
          resolution={1024}
          color="#000000"
        />

        {interactive && (
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={6}
            maxDistance={45}
            maxPolarAngle={Math.PI / 2 - 0.05}
          />
        )}
      </Canvas>

      {/* BIM Mode Overlay Watermark */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-white font-semibold">BUILDING DIGITAL TWIN</span>
        <span className="text-slate-400">| {config.architectural_style}</span>
      </div>
    </div>
  );
};
