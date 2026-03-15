/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useReducer } from "react";
import type {
  TimerOBJType,
  TimerInputErrorType,
  UserTimerOBJType,
} from "../../../types";

type TimerStateType = {
  timers: ["Pomodoro", "Short Break", "Long Break"];
  activeTimer: string;
  timerInputs: TimerOBJType[];
  isSubmitted: boolean;
  timerInputErrors: TimerInputErrorType[];
  alarmOn: boolean;
  sessionCount: number;
};

type TimerContextValue = TimerStateType & {
  setActiveTimer: (timer: string) => void;
  updateTimer: (timer: UserTimerOBJType) => void;
  submitTimerForm: () => void;
  resetTimerForm: () => void;
  setError: (errorObj: TimerInputErrorType) => void;
  setAlarm: (value: boolean) => void;
  incrementSession: () => void;
  resetSession: () => void;
};

type TimerProviderProps = {
  children: ReactNode;
};

type SetActiveTimerAction = { type: "SET_ACTIVE_TIMER"; payload: string };
type UpdateTimerAction = { type: "UPDATE_TIMER"; payload: UserTimerOBJType };
type SubmitTimerFormAction = { type: "SUBMIT_TIMER_FORM" };
type ResetTimerFormAction = { type: "RESET_TIMER_FORM" };
type SetErrorAction = { type: "SET_ERROR"; payload: TimerInputErrorType };
type SetAlarmAction = { type: "SET_ALARM"; payload: boolean };
type IncrementSessionAction = { type: "INCREMENT_SESSION" };
type ResetSessionAction = { type: "RESET_SESSION" };

type Action =
  | SetActiveTimerAction
  | UpdateTimerAction
  | SubmitTimerFormAction
  | ResetTimerFormAction
  | SetErrorAction
  | SetAlarmAction
  | IncrementSessionAction
  | ResetSessionAction;

const initialState: TimerStateType = {
  timers: ["Pomodoro", "Short Break", "Long Break"],
  activeTimer: "Pomodoro",
  timerInputs: [
    { timerName: "pomodoro", time: 23, min: 5, max: 60 },
    { timerName: "short-break", time: 4, min: 2, max: 60 },
    { timerName: "long-break", time: 15, min: 5, max: 60 },
  ],
  isSubmitted: false,
  timerInputErrors: [
    { timerName: "pomodoro", hasError: false, errorMsg: "" },
    { timerName: "short-break", hasError: false, errorMsg: "" },
    { timerName: "long-break", hasError: false, errorMsg: "" },
  ],
  alarmOn: false,
  sessionCount: Number(localStorage.getItem("sessionCount") ?? 0),
};

const TimerContext = createContext<TimerContextValue | null>(null);

function timerReducer(state: TimerStateType, action: Action): TimerStateType {
  switch (action.type) {
    case "SET_ACTIVE_TIMER":
      return { ...state, activeTimer: action.payload };
    case "UPDATE_TIMER": {
      const { timerName, time } = action.payload;
      const newArr = state.timerInputs.map((timerObj) =>
        timerObj.timerName === timerName
          ? { ...timerObj, time }
          : { ...timerObj }
      );
      return { ...state, timerInputs: [...newArr] };
    }
    case "SET_ERROR": {
      const { timerName, hasError, errorMsg } = action.payload;
      const newArr = state.timerInputErrors.map((errorObj) =>
        errorObj.timerName === timerName
          ? { ...errorObj, hasError, errorMsg }
          : { ...errorObj }
      );
      return { ...state, timerInputErrors: [...newArr] };
    }
    case "SUBMIT_TIMER_FORM":
      return { ...state, isSubmitted: true };
    case "RESET_TIMER_FORM":
      return { ...state, isSubmitted: false };
    case "SET_ALARM":
      return { ...state, alarmOn: action.payload };
    case "INCREMENT_SESSION": {
      const next = state.sessionCount >= 4 ? 4 : state.sessionCount + 1;
      localStorage.setItem("sessionCount", String(next));
      return { ...state, sessionCount: next };
    }
    case "RESET_SESSION":
      localStorage.setItem("sessionCount", "0");
      return { ...state, sessionCount: 0 };
    default:
      return state;
  }
}

function TimerProvider({ children }: TimerProviderProps) {
  const [timerState, dispatch] = useReducer(timerReducer, initialState);
  const {
    activeTimer,
    timers,
    timerInputs,
    isSubmitted,
    timerInputErrors,
    alarmOn,
    sessionCount,
  } = timerState;

  const setActiveTimer = (timer: string) => {
    dispatch({ type: "SET_ACTIVE_TIMER", payload: timer });
    dispatch({ type: "SET_ALARM", payload: false });
  };
  const updateTimer = (timer: UserTimerOBJType) =>
    dispatch({ type: "UPDATE_TIMER", payload: timer });
  const submitTimerForm = () => dispatch({ type: "SUBMIT_TIMER_FORM" });
  const resetTimerForm = () => dispatch({ type: "RESET_TIMER_FORM" });
  const setError = (errorObj: TimerInputErrorType) =>
    dispatch({ type: "SET_ERROR", payload: errorObj });
  const setAlarm = (value: boolean) =>
    dispatch({ type: "SET_ALARM", payload: value });
  const incrementSession = () => dispatch({ type: "INCREMENT_SESSION" });
  const resetSession = () => dispatch({ type: "RESET_SESSION" });

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
    alarmOn,
    setAlarm,
    sessionCount,
    incrementSession,
    resetSession,
  };

  return (
    <TimerContext.Provider value={ctxValue}>{children}</TimerContext.Provider>
  );
}

function useTimer() {
  const context = useContext(TimerContext);
  if (context === null)
    throw new Error("TimerContext was used outside the TimerProvider");
  return context;
}

export { TimerProvider, useTimer };
