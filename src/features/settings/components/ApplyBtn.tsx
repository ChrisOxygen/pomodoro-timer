import { useColor } from "../context/ColorContext";
import { useFont } from "../context/FontContext";
import { useTimer } from "../../timer";

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
    <button
      className="text-white text-center text-base font-bold w-[140px] h-[53px] shrink-0 rounded-pill -translate-y-1/2 hover:[filter:grayscale(0.2)_brightness(1.2)]"
      style={{ background: "var(--main-color)" }}
      onClick={applyChanges}
    >
      Apply
    </button>
  );
}

export default ApplyBtn;
