import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AiPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");

  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker close={()=>setActiveEditorTab("")}/>;
      case "filepicker": // upload the images as the logo
        return <FilePicker file={file} setFile={setFile} readFile={readFile} close={()=>setActiveEditorTab("")}/>;
      case "aipicker":
        return (
          <AiPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
            close={()=>setActiveEditorTab("")}
          />
        );
      default:
        return null;
    }
  };
  /* for AI Picker */
  const [modalMessage, setModalMessage] = useState(false)
  const handleSeeCode = () => {
    const githubLink = 'https://github.com/mirko-console-dir/threejs-3D-customisation';
    window.open(githubLink, '_blank');
    setModalMessage(false)
  }
  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      //back end to generate an image
      // npm init -y to generate the file for a server
      setGeneratingImg(true);

      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
      
    } catch (error) {
      //alert(error);
      setModalMessage(true)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };
  /* / for AI Picker */

  /* to update our shirt after the readFile function */
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  /* funtions to enable and check what we are showing, just changin the state than go to setAcriveFilterTab*/
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is update the UI

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    // read file depending from the type for the FilePicker
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          {/* TO SHOW THE MESSAGE MODAL */}
          {modalMessage &&
            <motion.div
              className="absolute z-20 flex"
              style={{top: '50%', left: '50%',background: '#e0e0e0', border: '1px solid #e0e0e0', borderRadius: 10, transform: 'translate(-50%,-50%)', padding: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 30px 0 rgba(31, 38, 135, 0.07)'}}
              {...fadeAnimation}
            >
              <p style={{margin: 50, textAlign: 'center'}}>All of OpenAI&#39;s credits have been exhausted. If you&#39;re curious, you can view the code on GitHub or continue to enjoy the app.</p>
              <div className="flex gap-10" 
              >
                <CustomButton
                  type="filled"
                  title="See The Code"
                  handleClick={handleSeeCode}
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
                <CustomButton
                  type="filled"
                  title="Continue Customize"
                  handleClick={()=>setModalMessage(false)}
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
              </div>
            </motion.div>
          }
          {/* END TO SHOW THE MESSAGE MODAL */}
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
