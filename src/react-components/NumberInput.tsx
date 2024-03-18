import { type MouseEvent, useState, useEffect } from "react";
import { LuChevronUp } from "react-icons/lu";
import { LuChevronDown } from "react-icons/lu";
import { useTimer } from "../context/TimerContext";

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
          timerName: timerName,
          hasError: true,
          errorMsg: `Time must be between ${min} and ${max}`,
        });

        setErrorMsg(
          timerInputErrors.find((timer) => timer.timerName === timerName)!
            .errorMsg
        );
      }
    } else {
      const inputWithinRange = +inputValue >= min && +inputValue <= max;
      if (inputWithinRange) {
        setError({
          timerName: timerName,
          hasError: false,
          errorMsg: "",
        });
        setErrorMsg(
          timerInputErrors.find((timer) => timer.timerName === timerName)!
            .errorMsg
        );
      }
    }
  }, [inputValue, max, min, setError, timerName, errorMsg, timerInputErrors]);

  function handleInc(e: MouseEvent) {
    e.preventDefault();
    setInputValue((currValue) => currValue + 1);
  }
  function handleDec(e: MouseEvent) {
    e.preventDefault();
    setInputValue((currValue) => currValue - 1);
  }
  return (
    <div className="time-section__item">
      <label htmlFor={timerName}>{label}</label>
      <div className="input-container">
        <input
          id={timerName}
          name={timerName}
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(+e.target.value)}
        />
        <div className="controllers">
          <button
            className="control-btn control-btn__inc"
            onClick={(e) => handleInc(e)}
          >
            <span className="control-btn__icon">
              <LuChevronUp />
            </span>
          </button>
          <button className="control-btn control-btn__dec" onClick={handleDec}>
            <span className="control-btn__icon">
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
  return <div className="error-display">{errorMsg}</div>;
}
