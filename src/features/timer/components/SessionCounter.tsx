import { motion, useReducedMotion } from "framer-motion";
import { useTimer } from "../context/TimerContext";

const TOTAL_DOTS = 4;

function SessionCounter() {
  const { sessionCount } = useTimer();
  const shouldReduce = useReducedMotion();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${sessionCount} of ${TOTAL_DOTS} sessions completed`}
      className="flex gap-[10px] mt-[16px]"
    >
      {Array.from({ length: TOTAL_DOTS }, (_, i) => {
        const filled = i < sessionCount;
        return (
          <motion.span
            key={filled ? `dot-${i}-filled` : `dot-${i}-empty`}
            className="w-[10px] h-[10px] rounded-full border-2"
            style={{
              borderColor: "var(--main-color)",
              backgroundColor: filled ? "var(--main-color)" : "transparent",
            }}
            initial={{ scale: filled ? 0.5 : 1 }}
            animate={{ scale: 1 }}
            transition={
              shouldReduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 500, damping: 22 }
            }
          />
        );
      })}
    </div>
  );
}

export default SessionCounter;
