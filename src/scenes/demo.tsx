import { useRef, useState } from 'react'
import {
  Engine,
  Scene,
  useBeforeRender,
  useClick,
  useHover,
} from 'react-babylonjs'
import { Vector3, Color3, Mesh } from '@babylonjs/core'
import { Room } from './components/room';

import { woodTexture } from './textures';

/* render <Scene> component with lights and <Room /> inside. Room floor is red, walls are green and ceiling is white */
export const DemoScene = () => (
    <Scene>
        <arcRotateCamera
            name="camera1"
            target={Vector3.Zero()}
            alpha={Math.PI / 2}
            beta={Math.PI / 4}
            radius={8}
        />
        <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={Vector3.Up()}
        />
        <Room
            name="room"
            position={Vector3.Zero()}
            width={6}
            height={4}
            depth={10}
            textures={{
                floor: woodTexture,
                ceiling: woodTexture,
                wall: woodTexture,
            }}
        />
    </Scene>
)

export default DemoScene;