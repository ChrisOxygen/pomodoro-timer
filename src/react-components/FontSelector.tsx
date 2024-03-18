import { useEffect } from "react";
import { useFont } from "../context/FontContext";

const fonts = ["kumbh", "roboto", "space"];

function FontSelector() {
  const { activeFont, setSelectedFont, selectedFont } = useFont();
  useEffect(() => {
    setSelectedFont(activeFont);
  }, [activeFont, setSelectedFont]);
  return (
    <div className="font-selector">
      {fonts.map((font, index) => (
        <FontBtn
          key={index}
          fontTitle={font}
          selectedFont={selectedFont!}
          onActiveFont={setSelectedFont}
        />
      ))}
    </div>
  );
}
export default FontSelector;

type FontBtnProps = {
  fontTitle: string;
  selectedFont: string;
  onActiveFont: (fontTitle: string) => void;
};

function FontBtn({ selectedFont, fontTitle, onActiveFont }: FontBtnProps) {
  const isActiveFont = fontTitle === selectedFont;
  return (
    <button
      className={`font-btn ${
        isActiveFont ? "font-btn--active" : ""
      } font-btn--${fontTitle}`}
      id={fontTitle}
      onClick={() => onActiveFont(fontTitle)}
    >
      Aa
    </button>
  );
}
