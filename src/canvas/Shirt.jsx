import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
/* Decal for the mesh or texture, ,useGLYF to be able to use the 3Dmodel, usetexture to apply the texture */
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  /* import the 3d model FILE */
  const { nodes, materials } = useGLTF("./shirt_baked.glb");
  /* texture for the 3d image */
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  /* TO BE SMOOTH 0.25 , lambert1.color for the color and add the key to group tag to do the rerender when state change */
  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* check if ther is logo on the short or not => snap.isFullTexture and set a Decal for that */}
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false} // render on top of other on the scene
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
