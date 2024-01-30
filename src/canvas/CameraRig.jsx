import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import PropTypes from "prop-types";

import state from "../store";

const CameraRig = ({ children }) => {
  /* ref to move the camera, updating the state */
  const group = useRef();
  const snap = useSnapshot(state);

  /* useFrame for the delta(the difference from the last frame happened), this hook allow to execute code to any render frames*/
  useFrame((state, delta) => {
    // responsive
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    // responsive

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // set the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};
CameraRig.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CameraRig;
