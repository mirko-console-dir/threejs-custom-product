const isWebGLAvailable = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
};
const useCheckWebGL = () => {
    const isAvailable = isWebGLAvailable()
    return isAvailable
}
export default useCheckWebGL