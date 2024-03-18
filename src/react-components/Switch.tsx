import { useTimer } from "../context/TimerContext";

import { motion } from "framer-motion";

type SwitchTabProps = {
  timerTitle: string;
  setActiveTimer: (timer: string) => void;
  activeTimer: string;
};

function Switch() {
  const { timers, setActiveTimer, activeTimer } = useTimer();

  const xPositon =
    activeTimer === "Pomodoro"
      ? "0%"
      : activeTimer === "Short Break"
      ? "100%"
      : "197%";
  return (
    <div className="switch">
      <motion.span
        layout
        animate={{ x: xPositon }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={`switch-active-bg`}
      ></motion.span>
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

  function handleClick() {
    setActiveTimer(timerTitle);
  }

  const isActive = timerTitle === activeTimer;
  return (
    <button
      className={`switch-tab ${isActive ? "switch-tab--active" : ""}`}
      id={id}
      onClick={() => handleClick()}
    >
      {timerTitle}
    </button>
  );
}
