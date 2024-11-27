/* use from package react-color the SketchPicker */
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../store";
import PropTypes from 'prop-types';

const ColorPicker = ({close}) => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <div className="flex justify-end">
        <button onClick={close}> 
          <p className="close__btn">Close</p>
        </button>
      </div>
      <SketchPicker
        color={snap.color}
        disableAlpha // opacity
        onChange={(color) => (state.color = color.hex)} // change color
      />
    </div>
  );
};
ColorPicker.propTypes = {
  close: PropTypes.func.isRequired,
};
export default ColorPicker;
