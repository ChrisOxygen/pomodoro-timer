import { motion } from "framer-motion";
import { useTimer } from "../context/TimerContext";

const TOTAL_DOTS = 4;

function SessionCounter() {
  const { sessionCount } = useTimer();

  return (
    <div className="flex gap-[10px] mt-[16px]">
      {Array.from({ length: TOTAL_DOTS }, (_, i) => {
        const filled = i < sessionCount;
        return (
          <motion.span
            key={i}
            className="w-[10px] h-[10px] rounded-full border-2"
            style={{
              borderColor: "var(--main-color)",
              backgroundColor: filled ? "var(--main-color)" : "transparent",
            }}
            animate={{ scale: filled ? [1, 1.35, 1] : 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

export default SessionCounter;
