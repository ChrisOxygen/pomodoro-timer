import { useEffect, useState } from "react";
import { useTimer } from "../context/TimerContext";

const audio = new Audio("./assets/alarm.mp3");

export function useCountdown(time: number) {
  const [count, setCount] = useState(time * 60);
  const [isLoaded, setIsLoaded] = useState(false);
  const [runCount, setRunCount] = useState(false);

  const { alarmOn, setAlarm, activeTimer, incrementSession, resetSession } =
    useTimer();

  const isDisabled = count <= 0;

  // Reset when the timer mode changes (time prop changes)
  useEffect(() => {
    setIsLoaded(false);
    setCount(time * 60);
    setRunCount(false);
  }, [time]);

  // Mark as loaded once count is above 0
  useEffect(() => {
    if (count > 0) setIsLoaded(true);
  }, [count]);

  // Countdown interval
  useEffect(() => {
    if (isDisabled) setRunCount(false);

    if (runCount && count > 0) {
      const timerId = setInterval(() => {
        setCount((c) => c - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [count, runCount, isDisabled]);

  // Trigger alarm and session logic when countdown reaches 0
  useEffect(() => {
    if (count === 0 && runCount) {
      setAlarm(true);
      if (activeTimer === "Pomodoro") {
        incrementSession();
      } else if (activeTimer === "Long Break") {
        resetSession();
      }
    }
  }, [count, runCount, setAlarm, activeTimer, incrementSession, resetSession]);

  // Control audio playback
  useEffect(() => {
    if (alarmOn) {
      audio.loop = true;
      audio.play();
    } else {
      audio.pause();
    }
  }, [alarmOn]);

  const percentage = (count / (time * 60)) * 100;

  return { count, runCount, isLoaded, setRunCount, percentage };
}
