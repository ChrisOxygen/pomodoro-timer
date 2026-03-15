export type TimerOBJType = {
  timerName: string;
  time: number;
  min: number;
  max: number;
};

export type TimerInputErrorType = {
  timerName: string;
  hasError: boolean;
  errorMsg: string;
};

export type UserTimerOBJType = {
  timerName: string;
  time: number;
};
