import NumberInput from "./NumberInput";
import { useTimer } from "../context/TimerContext";
import { FormEvent, useEffect, useRef } from "react";
import { useModal } from "../context/ModalContext";

export type FormValues = {
  ["pomodoro"]: string;
  ["short-break"]: string;
  ["long-break"]: string;
};

function TimeInputForm() {
  const { timers, timerInputs, isSubmitted, updateTimer, resetTimerForm } =
    useTimer();

  const formRef = useRef<HTMLFormElement>(null);

  const { closeModal } = useModal();

  useEffect(() => {
    if (isSubmitted) {
      formRef.current?.requestSubmit();
    }
  }, [isSubmitted]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // creating an object from an array with reduce array method.
    // const currentValues = timerInputs.reduce(
    //   (o, timeObj) => ({ ...o, [timeObj.timerName]: timeObj.time }),
    //   {}

    timerInputs.forEach((timeObj) => {
      if (timeObj.time !== +formData.get(timeObj.timerName)!) {
        const newTime = +formData.get(timeObj.timerName)!;

        updateTimer({
          timerName: timeObj.timerName,
          time: newTime,
        });
      }
      resetTimerForm();
      closeModal();
    });
  }

  return (
    <form
      className="time-section__content"
      ref={formRef}
      onSubmit={(e) => handleSubmit(e)}
    >
      {timers.map((timerTitle, index) => (
        <NumberInput key={index} label={timerTitle} {...timerInputs[index]} />
      ))}
    </form>
  );
}

export default TimeInputForm;
