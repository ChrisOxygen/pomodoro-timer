/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

type FontStateType = {
  activeFont: string;
  selectedFont?: string;
};

type FontContextValue = FontStateType & {
  setFont: (fontName: string) => void;
  setSelectedFont: (font: string) => void;
};

type FontProviderProps = {
  children: ReactNode;
};

type SetFontAction = {
  type: "SET_FONT";
  payload: string;
};

type SetSelectedFontAction = {
  type: "SET_SELECTED_FONT";
  payload: string;
};

type Action = SetFontAction | SetSelectedFontAction;

const initialState: FontStateType = {
  activeFont: "kumbh",
  selectedFont: "",
};

const FontContext = createContext<FontContextValue | null>(null);

function fontReducer(state: FontStateType, action: Action): FontStateType {
  switch (action.type) {
    case "SET_FONT":
      return {
        ...state,
        activeFont: action.payload,
      };

    case "SET_SELECTED_FONT":
      return {
        ...state,
        selectedFont: action.payload,
      };

    default:
      return state;
  }
}

function FontProvider({ children }: FontProviderProps) {
  const [fontState, dispatch] = useReducer(fontReducer, initialState);
  const { activeFont, selectedFont } = fontState;

  useEffect(() => {
    document.documentElement.className = `${activeFont}-theme`;
  }, [activeFont]);

  const setFont = (fontName: string) => {
    dispatch({ type: "SET_FONT", payload: fontName });

    document.documentElement.className = `${fontName}-theme`;
  };

  const setSelectedFont = useCallback((font: string) => {
    dispatch({ type: "SET_SELECTED_FONT", payload: font });
  }, []);

  const ctxValue: FontContextValue = {
    setFont,
    activeFont,
    selectedFont,
    setSelectedFont,
  };

  return (
    <FontContext.Provider value={ctxValue}>{children}</FontContext.Provider>
  );
}

//custom hook
function useFont() {
  const context = useContext(FontContext);

  if (context === null)
    throw new Error("FontContext was used outside the FontProvider");
  return context;
}

export { FontProvider, useFont };
