import { proxy } from "valtio";
const state = proxy({
  /* intro we are in the  home page or not */
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
});
export default state;
