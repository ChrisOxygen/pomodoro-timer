import { type CSSProperties, useEffect } from "react";

import { LuCheck } from "react-icons/lu";
import { useColor } from "../context/ColorContext";

const colors = ["#F87070", "#70F3F8", "#D881F8"];

function ColorSelector() {
  const { activeColor, setSelectedColor, selectedColor } = useColor();

  useEffect(() => {
    setSelectedColor(activeColor);
  }, [activeColor, setSelectedColor]);

  return (
    <div className="color-selector">
      {colors.map((color, index) => (
        <ColorBtn
          key={index}
          colorString={color}
          selectedColor={selectedColor!}
          onActiveColor={setSelectedColor}
        />
      ))}
    </div>
  );
}
export default ColorSelector;

type ColorBtnProps = {
  selectedColor: string;
  colorString: string;
  onActiveColor: (colorString: string) => void;
};

type testType = {
  "--bg-color": string;
} & CSSProperties;

function ColorBtn({
  selectedColor,
  colorString,
  onActiveColor,
}: ColorBtnProps) {
  const styles: testType = {
    "--bg-color": colorString,
  };

  const isActiveColor = selectedColor === colorString;
  return (
    <button
      style={styles}
      className={`color-btn ${isActiveColor ? "color-btn--active" : ""} `}
      id={colorString}
      onClick={() => onActiveColor(colorString)}
    >
      <span>{isActiveColor && <LuCheck />}</span>
    </button>
  );
}
