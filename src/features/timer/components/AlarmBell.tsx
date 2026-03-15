import { LuBellRing } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";

type AlarmBellProps = {
  setAlarm: (value: boolean) => void;
};

function AlarmBell({ setAlarm }: AlarmBellProps) {
  const handleClick = () => setAlarm(false);

  return (
    <motion.div
      className="fixed top-5 right-5 w-[110px] h-[110px] bg-dark-2 rounded-[10px] flex flex-col justify-center items-center max-[451px]:w-[90px] max-[451px]:h-[90px] max-[451px]:rounded-[9px]"
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.span
        className="text-[40px] text-faded-blue max-[451px]:text-[33px]"
        initial={{ x: -10 }}
        animate={{ x: 10 }}
        transition={{ ease: "linear", duration: 0.07, repeat: Infinity }}
      >
        <LuBellRing />
      </motion.span>
      <button
        className="text-[25px] text-(--main-color) max-[451px]:text-[20px]"
        onClick={handleClick}
      >
        <IoCloseCircleOutline />
      </button>
    </motion.div>
  );
}

export default AlarmBell;
