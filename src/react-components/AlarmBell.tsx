import { LuBellRing } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";

import { motion } from "framer-motion";

type AlarmBellProps = {
  setAlarm: (value: boolean) => void;
};

function AlarmBell({ setAlarm }: AlarmBellProps) {
  const handleClick = () => {
    setAlarm(false);
  };

  return (
    <motion.div
      className="bell-container"
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.span
        className="bell-icon"
        initial={{ x: -10 }}
        animate={{ x: 10 }}
        transition={{ ease: "linear", duration: 0.07, repeat: Infinity }}
      >
        <LuBellRing />
      </motion.span>
      <button className="close-icon" onClick={handleClick}>
        <IoCloseCircleOutline />
      </button>
    </motion.div>
  );
}
export default AlarmBell;
