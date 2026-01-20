import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import type { AthletePosition } from './Athlete';
import FrameMarker from './FrameMarker';
import AthleteController, { type Skill } from './AthleteController';

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
}

const straightArmsDown = {
  leftShoulder: 2*Math.PI,
  rightShoulder: 2*Math.PI,
  leftThigh: 0,
  rightThigh: 0,

  leftShin: 0,
  rightShin: 0,
}

function Simulator() {
  // Rotate camera position 45 degrees around Z axis
  const angle = Math.PI / 4; // 45 degrees
  const x = 0 * Math.cos(angle) - 5 * Math.sin(angle);
  const y = 0 * Math.sin(angle) + 5 * Math.cos(angle);
  const z = 18;
  
  // Define skills - each skill is a sequence of positions that start and end at height 0
  const skills: Skill[] = [
    {
      positions: [
        {
          height: 0,
          rotation: 0,
          twist: 0,
          joints: straightArmsUp,
        },
        {
          height: 0,
          rotation: 0.95,
          twist: 0.45,
          joints: straightArmsUp,
        },
        {
          height: 0,
          rotation: 1,
          twist: 0.5,
          joints: straightArmsUp,
        },
      ],
      timestamps: [0, 0.9, 1],
    },
{
      positions: [
        {
          height: 0,
          rotation: 0,
          twist: 0,
          joints: straightArmsUp,
        },
        {
          height: 0,
          rotation: -0.95,
          twist: 0.45,
          joints: straightArmsUp,
        },
        {
          height: 0,
          rotation: -1,
          twist: 0.5,
          joints: straightArmsUp,
        },
      ],
      timestamps: [0, 0.9, 1],
    },
  ];
  
  return (
    <Canvas style={{ width: '90vw', height: '400px', border: '1px solid red' }}
        camera={{ position: [x, y, z], fov: 55 }}
    >
        <OrbitControls target={[0, 5, 0]} enableZoom={true} enablePan={false} />
        <AthleteController skills={skills} />
        {/* Frame marker at origin for debugging */}
        <FrameMarker position={[0, 0, 0]} size={2} />
        <ambientLight intensity={Math.PI / 2} />
    </Canvas>
  );
}

export default Simulator;
