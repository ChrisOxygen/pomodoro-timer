import { FormEvent, useEffect, useRef } from "react";
import NumberInput from "./NumberInput";
import { useTimer } from "../../timer";
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
    if (isSubmitted) formRef.current?.requestSubmit();
  }, [isSubmitted]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    timerInputs.forEach((timeObj) => {
      if (timeObj.time !== +formData.get(timeObj.timerName)!) {
        updateTimer({
          timerName: timeObj.timerName,
          time: +formData.get(timeObj.timerName)!,
        });
      }
      resetTimerForm();
      closeModal();
    });
  }

  return (
    <form
      className="flex justify-between items-center gap-[21px] max-[451px]:flex-col max-[451px]:gap-4"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      {timers.map((timerTitle, index) => (
        <NumberInput key={index} label={timerTitle} {...timerInputs[index]} />
      ))}
    </form>
  );
}

export default TimeInputForm;
