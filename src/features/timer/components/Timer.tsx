import { useMediaQuery } from "react-responsive";
import { LuRotateCcw } from "react-icons/lu";
import { AnimatePresence } from "framer-motion";

import CircleProgressBar from "./CircleProgressBar";
import AlarmBell from "./AlarmBell";
import SessionCounter from "./SessionCounter";
import { useCountdown } from "../hooks/useCountdown";
import { useTimer } from "../context/TimerContext";
import { getDuration } from "../../../lib/helpers";

type TimerButtonProps = {
  setRunCount: (value: boolean) => void;
  runCount: boolean;
  isDisabled: boolean;
};

type RestartButtonProps = {
  isDisabled: boolean;
  onRestart: () => void;
};

function Timer() {
  const { activeTimer, timerInputs, alarmOn, setAlarm } = useTimer();

  const inputId = activeTimer.toLowerCase().split(" ").join("-") as
    | "pomodoro"
    | "short-break"
    | "long-break";

  const time = timerInputs.find((obj) => obj.timerName === inputId)!.time;

  const { count, runCount, isLoaded, setRunCount, percentage } =
    useCountdown(time);

  const isDisabled = count <= 0;

  const isMobile = useMediaQuery({ query: "(max-width: 451px)" });

  function handleRestart() {
    setRunCount(false);
    setAlarm(false);
  }

  return (
    <>
    <div
      className={`w-[410px] h-[410px] shrink-0 flex items-center justify-center rounded-full bg-[linear-gradient(315deg,#2E325A_0%,#0E112A_100%)] shadow-[50px_50px_100px_0px_#121530,-50px_-50px_100px_0px_#272C5A] mb-4 max-[451px]:max-w-75 max-[451px]:h-75 ${!isLoaded ? "opacity-30" : ""}`}
    >
      <div className="max-w-[366px] h-[366px] flex items-center justify-start rounded-full bg-dark-2 relative max-[451px]:w-[267.805px] max-[451px]:h-[267.805px]">
        <CircleProgressBar
          percentage={percentage}
          circleWidth={isMobile ? 267.805 : 366}
        />
        <div className="w-full flex flex-col items-center justify-center absolute">
          <h1
            className={`text-faded-blue text-center text-[100px] mt-[50px] max-[451px]:text-[80px] ${isDisabled ? "opacity-30" : ""}`}
          >
            {getDuration(count / 60)}
          </h1>
          <TimerButton
            setRunCount={setRunCount}
            runCount={runCount}
            isDisabled={isDisabled}
          />
          <RestartTimer
            isDisabled={count === time * 60}
            onRestart={handleRestart}
          />
        </div>
      </div>
      <AnimatePresence>
        {alarmOn && <AlarmBell setAlarm={setAlarm} />}
      </AnimatePresence>
    </div>
    <SessionCounter />
    </>
  );
}

export default Timer;

function TimerButton({ setRunCount, runCount, isDisabled }: TimerButtonProps) {
  const btnTxt = runCount ? "PAUSE" : "START";

  return (
    <button
      className={`flex items-center justify-center relative text-white text-base font-bold tracking-[15px] -mr-[19px] text-center max-[451px]:text-sm max-[451px]:tracking-[13.125px] max-[451px]:-mr-[17.125px] ${isDisabled ? "opacity-30" : ""}`}
      onClick={() => setRunCount(!runCount)}
      disabled={isDisabled}
    >
      {btnTxt}
    </button>
  );
}

function RestartTimer({ isDisabled, onRestart }: RestartButtonProps) {
  return (
    <button
      className={`flex flex-col items-center justify-center p-[7px] rounded-full border border-[#ffffff2a] bg-[#d7e0ff23] mt-[7px] text-[#ffffff8e] max-[451px]:p-[5px] max-[451px]:text-[13px] ${isDisabled ? "opacity-30" : ""}`}
      disabled={isDisabled}
      onClick={onRestart}
    >
      <LuRotateCcw />
    </button>
  );
}
