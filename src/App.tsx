import Settings from "./react-components/Settings";
import Switch from "./react-components/Switch";
import Timer from "./react-components/Timer";

import { motion } from "framer-motion";

function App() {
  return (
    <motion.div className="App">
      <h2 className="title">pomodoro</h2>
      <Switch />

      <Timer />
      <Settings />
    </motion.div>
  );
}

export default App;
