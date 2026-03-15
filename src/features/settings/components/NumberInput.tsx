import { type MouseEvent, useState, useEffect } from "react";
import { LuChevronUp, LuChevronDown } from "react-icons/lu";
import { useTimer } from "../../timer";

type NumberInputProps = {
  label: string;
  timerName: string;
  time: number;
  min: number;
  max: number;
};

type ErrorDisplayProps = {
  errorMsg: string;
};

function NumberInput({ label, timerName, time, min, max }: NumberInputProps) {
  const [inputValue, setInputValue] = useState(time);
  const [errorMsg, setErrorMsg] = useState("");

  const { timerInputErrors, setError } = useTimer();

  useEffect(() => {
    if (!errorMsg) {
      if (+inputValue < min || +inputValue > max) {
        setError({
          timerName,
          hasError: true,
          errorMsg: `Time must be between ${min} and ${max}`,
        });
        setErrorMsg(
          timerInputErrors.find((t) => t.timerName === timerName)!.errorMsg
        );
      }
    } else {
      const inputWithinRange = +inputValue >= min && +inputValue <= max;
      if (inputWithinRange) {
        setError({ timerName, hasError: false, errorMsg: "" });
        setErrorMsg(
          timerInputErrors.find((t) => t.timerName === timerName)!.errorMsg
        );
      }
    }
  }, [inputValue, max, min, setError, timerName, errorMsg, timerInputErrors]);

  function handleInc(e: MouseEvent) {
    e.preventDefault();
    setInputValue((v) => v + 1);
  }

  function handleDec(e: MouseEvent) {
    e.preventDefault();
    setInputValue((v) => v - 1);
  }

  return (
    <div className="flex flex-col justify-center items-start gap-2 max-[451px]:flex-row max-[451px]:justify-between max-[451px]:items-center max-[451px]:gap-0">
      <label
        htmlFor={timerName}
        className="text-dark-1/40 text-xs font-bold max-[451px]:w-full"
      >
        {label}
      </label>
      <div className="group relative flex items-center gap-1 bg-off-white rounded-[10px] pr-4">
        <input
          id={timerName}
          name={timerName}
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(+e.target.value)}
          className="w-full h-full bg-off-white border-none outline-none p-4 pr-0 text-dark-1 text-sm font-bold rounded-[10px]"
        />
        <div className="flex flex-col">
          <button
            className="text-dark-1/25 w-3 group-hover:text-dark-1"
            onClick={handleInc}
          >
            <span>
              <LuChevronUp />
            </span>
          </button>
          <button
            className="text-dark-1/25 w-3 group-hover:text-dark-1"
            onClick={handleDec}
          >
            <span>
              <LuChevronDown />
            </span>
          </button>
        </div>
        {errorMsg && <ErrorDisplay errorMsg={errorMsg} />}
      </div>
    </div>
  );
}

export default NumberInput;

function ErrorDisplay({ errorMsg }: ErrorDisplayProps) {
  return (
    <div className="absolute bottom-0 left-0 text-red-500 text-[9px] translate-y-full">
      {errorMsg}
    </div>
  );
}
