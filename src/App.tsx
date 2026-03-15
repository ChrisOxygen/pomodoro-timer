import { motion, useReducedMotion } from "framer-motion";
import { Timer, useTimer } from "./features/timer";
import { Switch } from "./features/switch";
import { Settings } from "./features/settings";
import { InstallBanner } from "./features/pwa";

const MODE_BG: Record<string, string> = {
  Pomodoro: "#1E213F",
  "Short Break": "#1A3340",
  "Long Break": "#1B2744",
};

function App() {
  const { activeTimer } = useTimer();
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-center w-screen h-screen justify-center safe-insets"
      animate={{ backgroundColor: MODE_BG[activeTimer] ?? "#1E213F" }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.6, ease: "easeInOut" }}
    >
      <h2 className="text-white text-center text-[32px] font-bold w-full mb-[55px]">
        pomodoro
      </h2>
      <Switch />
      <Timer />
      <Settings />
      <InstallBanner />
    </motion.div>
  );
}

export default App;
