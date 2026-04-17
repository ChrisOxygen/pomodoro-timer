import { useEffect } from "react";
import { useFont } from "../context/FontContext";

const fonts = ["kumbh", "roboto", "space"];

function FontSelector() {
  const { activeFont, setSelectedFont, selectedFont } = useFont();

  useEffect(() => {
    setSelectedFont(activeFont);
  }, [activeFont, setSelectedFont]);

  return (
    <div className="flex gap-4">
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

const fontClassMap: Record<string, string> = {
  kumbh: "font-kumbh",
  roboto: "font-roboto",
  space: "font-space",
};

function FontBtn({ selectedFont, fontTitle, onActiveFont }: FontBtnProps) {
  const isActiveFont = fontTitle === selectedFont;
  const fontClass = fontClassMap[fontTitle] ?? "";

  return (
    <button
      className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full text-[15px] font-bold hover:outline hover:outline-off-white hover:outline-offset-4 ${fontClass} ${
        isActiveFont ? "bg-dark-2 text-white" : "bg-off-white text-dark-1"
      }`}
      id={fontTitle}
      onClick={() => onActiveFont(fontTitle)}
    >
      Aa
    </button>
  );
}
