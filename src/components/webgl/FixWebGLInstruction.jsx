import { screen_chrome_help, hardware_acceleration_help, warning_sign } from "../../assets";

const FixWebGLInstruction = () => {
  return (
    <div className="grow bg-gray-700 text-white min-h-screen">
        <div className="pt-12 px-10 lg:pt-24 lg:px-24 flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <h3 className="text-2xl md:text-5xl font-semibold brightness-100">Fix Browser limitations to play</h3>
                <img src={warning_sign} alt="warning_sign" className="brightness-100 w-24"/>
            </div>
            <div className="flex flex-col gap-2">
                <details>
                    <summary className="font-semibold brightness-100 cursor-pointer no-select md:text-2xl ">1. Activate hardware acceleration</summary>
                    <div className="ml-3 md:ml-5 md:flex md:py-5 lg:pt-10">
                        <div className="flex flex-col gap-5 mt-4 md:w-1/2">
                            <div className="md:text-xl">
                                <p>a. Open browser settings: browser_name://settings</p>
                                <p className="ml-5">(chrome://settings, opera://settings, edge://settings)</p>
                            </div>
                            <p className="md:text-xl">b. Click on System.</p>
                            <p className="md:text-xl">c. Click the Use hardware acceleration when available.</p>
                            <p className="md:text-xl">d. Relaunch.</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:w-1/2">
                            <p className="md:text-xl">Example with Chrome:</p>
                            <img src={hardware_acceleration_help} alt="image example hardware acceleration browser" />
                        </div>
                    </div>
                </details>
                <details>
                    <summary className="md:text-2xl font-semibold brightness-100 cursor-pointer no-select">2. Make sure your browser is updated to the latest version</summary>
                    <div className="ml-3 md:ml-5 md:flex md:py-5 lg:pt-10">
                        <div className="flex flex-col gap-5 mt-4 md:w-1/2">
                            <div className="md:text-xl">
                                <p>a. Open browser settings: browser_name://settings</p>
                                <p className="ml-5">(chrome://settings, opera://settings, edge://settings)</p>
                            </div>
                            <p className="md:text-xl">b. Click on About.</p>
                            <p className="md:text-xl">c. Click the update button.</p>
                            <p className="md:text-xl">d. Close your browser and relaunch it.</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:w-1/2">
                            <p className="md:text-xl">Example with Chrome:</p>
                            <img src={screen_chrome_help} alt="image example hardware acceleration browser" />
                        </div>
                    </div>
                </details>
            </div>
        </div>
    </div>
  )
}
export default FixWebGLInstruction
