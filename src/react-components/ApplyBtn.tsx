import { useColor } from "../context/ColorContext";
import { useFont } from "../context/FontContext";

import { useTimer } from "../context/TimerContext";

function ApplyBtn() {
  const { activeColor, selectedColor, setTheme } = useColor();
  const { setFont, activeFont, selectedFont } = useFont();

  const { submitTimerForm, timerInputErrors } = useTimer();

  function applyChanges() {
    const hasErrors = timerInputErrors.some((errObj) => errObj.hasError);

    if (!hasErrors) {
      if (activeColor !== selectedColor) setTheme(selectedColor!);
      if (activeFont !== selectedFont) setFont(selectedFont!);
      submitTimerForm();
    }
  }
  return (
    <button className="apply-btn" onClick={() => applyChanges()}>
      Apply
    </button>
  );
}

export default ApplyBtn;
