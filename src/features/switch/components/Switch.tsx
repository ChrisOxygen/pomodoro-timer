import { motion, useReducedMotion } from "framer-motion";
import { useTimer } from "../../timer";

type SwitchTabProps = {
  timerTitle: string;
  setActiveTimer: (timer: string) => void;
  activeTimer: string;
};

function Switch() {
  const { timers, setActiveTimer, activeTimer } = useTimer();
  const shouldReduce = useReducedMotion();

  const xPosition =
    activeTimer === "Pomodoro"
      ? "0%"
      : activeTimer === "Short Break"
        ? "100%"
        : "197%";

  return (
    <div
      role="tablist"
      aria-label="Timer mode"
      className="grid grid-cols-3 relative rounded-[31.5px] bg-dark-2 w-[373px] h-[63px] shrink-0 items-center p-[9px] mb-[45px] max-[451px]:w-[327px]"
    >
      <motion.span
        layout
        animate={{ x: xPosition }}
        transition={
          shouldReduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 700, damping: 30 }
        }
        className="w-[120px] h-12 flex rounded-pill absolute ml-[9px] max-[451px]:w-[105.201px]"
        style={{ background: "var(--main-color)" }}
      />
      {timers.map((timerTitle, index) => (
        <SwitchTab
          key={index}
          timerTitle={timerTitle}
          setActiveTimer={setActiveTimer}
          activeTimer={activeTimer}
        />
      ))}
    </div>
  );
}

export default Switch;

function SwitchTab({
  timerTitle,
  setActiveTimer,
  activeTimer,
}: SwitchTabProps) {
  const id = timerTitle.toLowerCase().split(" ").join("-");
  const isActive = timerTitle === activeTimer;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls="timer-region"
      className={`h-full shrink-0 rounded-pill flex items-center justify-center z-[5] text-sm font-bold max-[451px]:text-xs ${
        isActive
          ? "text-dark-1 opacity-100"
          : "text-faded-blue opacity-70 hover:opacity-100"
      }`}
      id={id}
      onClick={() => setActiveTimer(timerTitle)}
    >
      {timerTitle}
    </button>
  );
}
