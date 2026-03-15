import { useMediaQuery } from "react-responsive";

type CircleProgressBarProps = {
  percentage: number;
  circleWidth: number;
};

function CircleProgressBar({ percentage, circleWidth }: CircleProgressBarProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 451px)" });

  const radius = isMobile ? 122 : 166;
  const dashArray = radius * Math.PI * 2;

  return (
    <svg
      width={circleWidth}
      height={circleWidth}
      viewBox={`0 0 ${circleWidth} ${circleWidth}`}
    >
      <circle
        cx={circleWidth / 2}
        cy={circleWidth / 2}
        r={radius}
        strokeWidth={isMobile ? "8px" : "9px"}
        transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        style={{
          fill: "none",
          stroke: "var(--main-color)",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeDasharray: dashArray,
          strokeDashoffset: dashArray - (dashArray * percentage) / 100,
        }}
      />
    </svg>
  );
}

export default CircleProgressBar;
