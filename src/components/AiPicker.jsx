import CustomButton from "./CustomButton";
import PropTypes from "prop-types";

const AiPicker = ({ prompt, setPrompt, generatingImg, handleSubmit, close }) => {
  return (
    <div className="aipicker-container">
      <div className="flex justify-end absolute -top-7 right-0">
        <button onClick={close}> 
          <p className="close__btn">Close</p>
        </button>
      </div>
      <textarea
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit("logo")}
              customStyles="text-xs"
            />

            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit("full")}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};
// PropTypes validation
AiPicker.propTypes = {
  prompt: PropTypes.any,
  setPrompt: PropTypes.any,
  generatingImg: PropTypes.any,
  handleSubmit: PropTypes.any,
  close: PropTypes.func.isRequired,
};
export default AiPicker;
