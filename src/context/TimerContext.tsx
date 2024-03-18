/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useReducer } from "react";

export type TimerOBJType = {
  timerName: string;
  time: number;
  min: number;
  max: number;
};
export type timerInputErrorsType = {
  timerName: string;
  hasError: boolean;
  errorMsg: string;
};
export type UserTimerOBJType = {
  timerName: string;
  time: number;
};

type TimerStateType = {
  timers: ["Pomodoro", "Short Break", "Long Break"];
  activeTimer: string;
  timerInputs: TimerOBJType[];
  isSubmitted: boolean;
  timerInputErrors: timerInputErrorsType[];
};

type TimerContextValue = TimerStateType & {
  setActiveTimer: (timer: string) => void;
  updateTimer: (timer: UserTimerOBJType) => void;
  submitTimerForm: () => void;
  resetTimerForm: () => void;
  setError: (errorObj: timerInputErrorsType) => void;
};

type TimerProviderProps = {
  children: ReactNode;
};

type setActiveTimerAction = {
  type: "SET_ACTIVE_TIMER";
  payload: string;
};

type updateTimerAction = {
  type: "UPDATE_TIMER";
  payload: UserTimerOBJType;
};
type submitTimerFormAction = {
  type: "SUBMIT_TIMER_FORM";
};
type resetTimerFormAction = {
  type: "RESET_TIMER_FORM";
};

type setErrorAction = {
  type: "SET_ERROR";
  payload: timerInputErrorsType;
};

type Action =
  | setActiveTimerAction
  | updateTimerAction
  | submitTimerFormAction
  | resetTimerFormAction
  | setErrorAction;

const initialState: TimerStateType = {
  timers: ["Pomodoro", "Short Break", "Long Break"],
  activeTimer: "Pomodoro",
  timerInputs: [
    { timerName: "pomodoro", time: 23, min: 5, max: 60 },
    { timerName: "short-break", time: 5, min: 5, max: 60 },
    { timerName: "long-break", time: 15, min: 5, max: 60 },
  ],
  isSubmitted: false,
  timerInputErrors: [
    { timerName: "pomodoro", hasError: false, errorMsg: "" },
    { timerName: "short-break", hasError: false, errorMsg: "" },
    { timerName: "long-break", hasError: false, errorMsg: "" },
  ],
};

const TimerContext = createContext<TimerContextValue | null>(null);

function timerReducer(state: TimerStateType, action: Action): TimerStateType {
  switch (action.type) {
    case "SET_ACTIVE_TIMER":
      return { ...state, activeTimer: action.payload };
    case "UPDATE_TIMER": {
      const { timerName, time } = action.payload;
      const newArr = state.timerInputs.map((timerObj) => {
        if (timerObj.timerName === timerName) {
          return { ...timerObj, time: time };
        }

        return { ...timerObj };
      });
      return {
        ...state,
        timerInputs: [...newArr],
      };
    }
    case "SET_ERROR": {
      const { timerName, hasError, errorMsg } = action.payload;
      const newArr = state.timerInputErrors.map((errorObj) => {
        if (errorObj.timerName === timerName) {
          return { ...errorObj, hasError: hasError, errorMsg: errorMsg };
        }

        return { ...errorObj };
      });
      return {
        ...state,
        timerInputErrors: [...newArr],
      };
    }

    case "SUBMIT_TIMER_FORM":
      return { ...state, isSubmitted: true };

    case "RESET_TIMER_FORM":
      return { ...state, isSubmitted: false };

    default:
      return state;
  }
}

function TimerProvider({ children }: TimerProviderProps) {
  const [timerState, dispatch] = useReducer(timerReducer, initialState);
  const { activeTimer, timers, timerInputs, isSubmitted, timerInputErrors } =
    timerState;

  const setActiveTimer = (timer: string) => {
    dispatch({ type: "SET_ACTIVE_TIMER", payload: timer });
  };

  const updateTimer = (timer: UserTimerOBJType) => {
    dispatch({ type: "UPDATE_TIMER", payload: timer });
  };
  const submitTimerForm = () => {
    dispatch({ type: "SUBMIT_TIMER_FORM" });
  };
  const resetTimerForm = () => {
    dispatch({ type: "RESET_TIMER_FORM" });
  };

  const setError = (errorObj: timerInputErrorsType) => {
    dispatch({ type: "SET_ERROR", payload: errorObj });
  };

  const ctxValue: TimerContextValue = {
    activeTimer,
    setActiveTimer,
    timers,
    timerInputs,
    updateTimer,
    submitTimerForm,
    isSubmitted,
    resetTimerForm,
    timerInputErrors,
    setError,
  };

  return (
    <TimerContext.Provider value={ctxValue}>{children}</TimerContext.Provider>
  );
}

//custom hook
function useTimer() {
  const context = useContext(TimerContext);

  if (context === null)
    throw new Error("TimerContext was used outside the TimerProvider");
  return context;
}

export { TimerProvider, useTimer };
