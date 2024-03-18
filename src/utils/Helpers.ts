export function getDuration(minutes: number) {
  const seconds = minutes * 60;

  const remainingMinutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60);
  const displayMinutes = String(remainingMinutes).padStart(2, "0");
  const displaySeconds = String(remainingSeconds).padStart(2, "0");

  return `${displayMinutes}:${displaySeconds}`;
}
