import { useMediaQuery } from "react-responsive";

type CircleProgressBarProps = {
  percentage: number;
  circleWidth: number;
};

function CircleProgressBar({
  percentage,
  circleWidth,
}: CircleProgressBarProps) {
  const isMobile = useMediaQuery({
    query: "(max-width: 451px)",
  });

  const radius = isMobile ? 122 : 166;
  const dashArray = radius * Math.PI * 2;

  return (
    <svg
      className="svg"
      width={circleWidth}
      height={circleWidth}
      viewBox={`0 0 ${circleWidth} ${circleWidth}`}
    >
      <circle
        className="svg-circle-progress"
        cx={circleWidth / 2}
        cy={circleWidth / 2}
        r={radius}
        strokeWidth={`${isMobile ? "8px" : "9px"}`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashArray - (dashArray * percentage) / 100,
        }}
        transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
      />
    </svg>
  );
}

export default CircleProgressBar;
