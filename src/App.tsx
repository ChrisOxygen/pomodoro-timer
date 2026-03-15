import { motion } from "framer-motion";
import { Timer } from "./features/timer";
import { Switch } from "./features/switch";
import { Settings } from "./features/settings";

function App() {
  return (
    <motion.div className="flex flex-col items-center w-screen h-screen px-[30px] justify-center bg-dark-1 max-[650px]:px-6 max-[650px]:pt-[15px]">
      <h2 className="text-faded-blue text-center text-[32px] font-bold w-full mb-[55px]">
        pomodoro
      </h2>
      <Switch />
      <Timer />
      <Settings />
    </motion.div>
  );
}

export default App;
