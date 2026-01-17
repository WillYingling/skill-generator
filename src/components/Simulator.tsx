import { useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import Athlete from './Athlete';
import type { AthletePosition } from './Athlete';
import Trampoline from './Trampoline';
import FrameMarker from './FrameMarker';
import * as THREE from 'three';

const tuck = {
  leftShoulder: 3*Math.PI / 2,  // Equivalent to -π/2, but interpolates shorter path from π
  rightShoulder: 3*Math.PI / 2,
  leftThigh: -3*Math.PI/4,
  rightThigh: -3*Math.PI/4,

  leftShin: 3*Math.PI/4,
  rightShin: 3*Math.PI/4,
};

const pike = {
  leftShoulder: 3*Math.PI / 2,
  rightShoulder: 3*Math.PI / 2,
  leftThigh: -3*Math.PI/4,
  rightThigh: -3*Math.PI/4,

  leftShin: 0,
  rightShin: 0,
}

const straightArmsUp = {
  leftShoulder: Math.PI,
  rightShoulder: Math.PI,
  leftThigh: 0,
  rightThigh: 0,

  leftShin: 0,
  rightShin: 0,
};

// Component that calculates athlete position each frame
function AthleteController() {
  const athleteRef = useRef<THREE.Group>(null);
  const athletePositionRef = useRef<AthletePosition>({
    height: 0,
    rotation: 0,
    twist: 0,
    joints: straightArmsUp,
  });

  const JumpPhase = 2;
  const BouncePhase = JumpPhase / 10;
  const CycleTime = JumpPhase + BouncePhase;
  const Gravity = -9.81; // m/s^2

  useFrame((state) => {
    const cycleTime = state.clock.elapsedTime % CycleTime;
    let curTime = cycleTime;
    let height = 0;
    
    if (curTime > JumpPhase) {
      curTime -= JumpPhase;
      // Bounce phase
      let landingVelocity = Gravity * JumpPhase * 0.5;
      let finalVelocity = -landingVelocity;
      let bounceAcceleration = (finalVelocity - landingVelocity) / BouncePhase;
      height = (landingVelocity * curTime) + ((0.5 * bounceAcceleration) * (curTime * curTime));
    } else {
      height = ((0.5 * Gravity) * (curTime * curTime)) - (((Gravity * JumpPhase) / 2) * curTime);
    }

    // Interpolate joint positions based on time
    let t = 0; // Interpolation factor (0 to 1)
    if (curTime <= JumpPhase / 2) {
      // First half: straightArmsUp -> tuck
      t = curTime / (JumpPhase / 2);
    } else if (curTime <= JumpPhase) {
      // Second half: tuck -> straightArmsUp
      t = 1 - (curTime - JumpPhase / 2) / (JumpPhase / 2);
    } else {
      // Bounce phase: stay in straightArmsUp
      t = 0;
    }

    // Linear interpolation between straightArmsUp and tuck
    const interpolate = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    // Calculate rotation: 2*pi over JumpPhase, 0 during bounce
    let rotation = 0;
    if (curTime <= JumpPhase) {
      rotation = (2 * Math.PI * curTime) / JumpPhase;
      rotation = rotation * 3;
    }

    // Calculate twist: 180 degrees (pi radians) from JumpPhase/2 to JumpPhase
    let twist = 0;
    if (curTime > JumpPhase / 2 && curTime <= JumpPhase) {
      // Linear interpolation from 0 to π over the second half
      const twistProgress = (curTime - JumpPhase / 2) / (JumpPhase / 2);
      twist = Math.PI * twistProgress;
    }

    // Root is now at hip level, so add totalLegLength to height
    // During bounce, height goes negative and feet should go below trampoline (y=0)
    // So: feetHeight = height, rootHeight = height + totalLegLength
    const totalLegLength = 2 * 0.48 + 0.1; // 2 * legSegmentLength + gap
    const feetHeight = height;
    const rootHeight = feetHeight + totalLegLength;
    
    athletePositionRef.current.height = rootHeight;
    athletePositionRef.current.rotation = rotation;
    athletePositionRef.current.twist = twist;
    let position1 = straightArmsUp;
    let position2 = pike;

    athletePositionRef.current.joints = {
      leftShoulder: interpolate(position1.leftShoulder, position2.leftShoulder, t),
      rightShoulder: interpolate(position1.rightShoulder, position2.rightShoulder, t),
      leftThigh: interpolate(position1.leftThigh, position2.leftThigh, t),
      rightThigh: interpolate(position1.rightThigh, position2.rightThigh, t),
      leftShin: interpolate(position1.leftShin, position2.leftShin, t),
      rightShin: interpolate(position1.rightShin, position2.rightShin, t),
    };
  });

  return (
    <>
      <Athlete ref={athleteRef} athletePosition={athletePositionRef.current} />
      <Trampoline athleteRef={athleteRef} />
    </>
  );
}

function Simulator() {
  // Rotate camera position 45 degrees around Z axis
  const angle = Math.PI / 4; // 45 degrees
  const x = 0 * Math.cos(angle) - 5 * Math.sin(angle);
  const y = 0 * Math.sin(angle) + 5 * Math.cos(angle);
  const z = 18;
  
  return (
    <Canvas style={{ width: '90vw', height: '400px', border: '1px solid red' }}
        camera={{ position: [x, y, z], fov: 55 }}
    >
        <OrbitControls target={[0, 5, 0]} enableZoom={true} enablePan={false} />
        <AthleteController />
        {/* Frame marker at origin for debugging */}
        <FrameMarker position={[0, 0, 0]} size={2} />
        <ambientLight intensity={Math.PI / 2} />
    </Canvas>
  );
}

export default Simulator;
