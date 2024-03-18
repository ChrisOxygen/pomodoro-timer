/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

type ColorStateType = {
  activeColor: string | null;
  selectedColor?: string;
};

type ColorContextValue = ColorStateType & {
  setTheme: (color: string) => void;

  setSelectedColor: (color: string) => void;
};

type ColorProviderProps = {
  children: ReactNode;
};

type SetThemeAction = {
  type: "SET_THEME";
  payload: string;
};

type SetSelectedColorAction = {
  type: "SET_SELECTED_COLOR";
  payload: string;
};

type Action = SetThemeAction | SetSelectedColorAction;

const initialState: ColorStateType = {
  activeColor: localStorage.getItem("color")
    ? localStorage.getItem("color")
    : "#F87070",
  selectedColor: "",
};

const ColorContext = createContext<ColorContextValue | null>(null);

function colorReducer(state: ColorStateType, action: Action): ColorStateType {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        activeColor: action.payload,
      };

    case "SET_SELECTED_COLOR":
      return {
        ...state,
        selectedColor: action.payload,
      };

    default:
      return state;
  }
}

function ColorProvider({ children }: ColorProviderProps) {
  const [colorState, dispatch] = useReducer(colorReducer, initialState);
  const { activeColor, selectedColor } = colorState;

  useEffect(() => {
    setTheme(activeColor!);
  }, [activeColor]);

  const setTheme = (color: string) => {
    dispatch({ type: "SET_THEME", payload: color });
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("color", color);
  };

  const setSelectedColor = useCallback((color: string) => {
    dispatch({ type: "SET_SELECTED_COLOR", payload: color });
  }, []);

  const ctxValue: ColorContextValue = {
    activeColor,
    setTheme,
    setSelectedColor,
    selectedColor,
  };

  return (
    <ColorContext.Provider value={ctxValue}>{children}</ColorContext.Provider>
  );
}

//custom hook
function useColor() {
  const context = useContext(ColorContext);

  if (context === null)
    throw new Error("ColorContext was used outside the ColorProvider");
  return context;
}

export { ColorProvider, useColor };
