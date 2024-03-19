import { useEffect, useState } from "react";
import CircleProgressBar from "./CircleProgressBar";

import { LuRotateCcw } from "react-icons/lu";
import { getDuration } from "../utils/Helpers";
import { useTimer } from "../context/TimerContext";
import { useMediaQuery } from "react-responsive";

type TimerButtonProps = {
  setRunCount: (value: boolean) => void;
  runCount: boolean;
  isDisabled: boolean;
};

type RestartButtonProps = {
  count: number;
  time: number;
  runCount: boolean;
  onRestart: (value: number) => void;
  setRunCount: (value: boolean) => void;
};

function Timer() {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [runCount, setRunCount] = useState(false);

  const { activeTimer, timerInputs } = useTimer();
  const inputId = activeTimer.toLowerCase().split(" ").join("-") as
    | "pomodoro"
    | "short-break"
    | "long-break";

  const time = timerInputs.find(
    (singleOBJ) => singleOBJ.timerName === inputId
  )!.time;

  const isDisabled = count > 0 ? false : true;

  useEffect(() => {
    setIsLoaded(false);
    setCount(time * 60);
    setRunCount(false);
  }, [time]);

  useEffect(() => {
    if (count > 0) {
      setIsLoaded(true);
    }
  }, [count]);
  useEffect(() => {
    if (isDisabled) setRunCount(false);

    if (runCount) {
      if (count > 0) {
        const timerId = setInterval(() => {
          setCount(count - 1);
        }, 1000);

        // Clear interval on re-render to avoid memory leaks
        return () => {
          clearInterval(timerId);
        };
      }
    }
  }, [count, runCount, isDisabled, activeTimer]);

  const percentage = (count / (time * 60)) * 100;

  const isMobile = useMediaQuery({
    query: "(max-width: 451px)",
  });

  return (
    <div className={`timer-container ${!isLoaded ? "disabled" : ""}`}>
      <div className="outer">
        <CircleProgressBar
          percentage={percentage}
          circleWidth={isMobile ? 267.805 : 366}
        />
        <div className="timer-content">
          <h1
            className={`time ${isDisabled ? "disabled" : ""}`}
          >{`${getDuration(count / 60)}`}</h1>
          <TimerButton
            setRunCount={setRunCount}
            runCount={runCount}
            isDisabled={isDisabled}
          />
          <RestartTimer
            count={count}
            time={time}
            onRestart={setCount}
            runCount={runCount}
            setRunCount={setRunCount}
          />
        </div>
      </div>
    </div>
  );
}

export default Timer;

function TimerButton({ setRunCount, runCount, isDisabled }: TimerButtonProps) {
  const btnTxt = runCount ? "PAUSE" : "START";

  function handleClick() {
    setRunCount(!runCount);
  }

  return (
    <button
      className={`time-controller ${isDisabled ? "disabled" : ""}`}
      onClick={() => handleClick()}
      disabled={isDisabled}
    >
      {btnTxt}
    </button>
  );
}

function RestartTimer({
  count,
  time,
  onRestart,
  setRunCount,
}: RestartButtonProps) {
  const isDisabled = count === time * 60;

  function handleClick() {
    onRestart(time * 60);
    setRunCount(false);
  }
  return (
    <button
      className={`restart-timer-btn  ${isDisabled ? "disabled" : ""}`}
      disabled={isDisabled}
      onClick={() => handleClick()}
    >
      <LuRotateCcw />
    </button>
  );
}
