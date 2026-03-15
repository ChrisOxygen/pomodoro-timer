import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { useColor } from "../context/ColorContext";

const colors = ["#F87070", "#70F3F8", "#D881F8"];

function ColorSelector() {
  const { activeColor, setSelectedColor, selectedColor } = useColor();

  useEffect(() => {
    setSelectedColor(activeColor!);
  }, [activeColor, setSelectedColor]);

  return (
    <div className="flex gap-4">
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

function ColorBtn({ selectedColor, colorString, onActiveColor }: ColorBtnProps) {
  const isActiveColor = selectedColor === colorString;

  return (
    <button
      className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full hover:brightness-110 ${isActiveColor ? "text-[20px]" : ""}`}
      style={{ backgroundColor: colorString }}
      id={colorString}
      onClick={() => onActiveColor(colorString)}
    >
      <span>{isActiveColor && <LuCheck />}</span>
    </button>
  );
}
