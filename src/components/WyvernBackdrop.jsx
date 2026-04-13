import { useId } from "react";

const SILHOUETTE = "M200 48 L48 392h88l64-200 64 200h88L200 48z";

export default function WyvernBackdrop() {
  const uid = useId().replace(/:/g, "");

  return (
    <div className="wyvern-backdrop" aria-hidden="true">
      <svg
        className="wyvern-backdrop-svg"
        viewBox="0 0 400 440"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`${uid}-core`} cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#002208" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#001a06" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-edge`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff55" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#00aa33" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00ff66" stopOpacity="0.18" />
          </linearGradient>
          <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="wyvern-backdrop-pulse">
          <path fill={`url(#${uid}-core)`} d={SILHOUETTE} opacity="0.88" />
          <path
            fill="none"
            stroke={`url(#${uid}-edge)`}
            strokeWidth="1.5"
            strokeLinejoin="round"
            filter={`url(#${uid}-soft)`}
            d={SILHOUETTE}
            opacity="0.4"
          />
          <path
            fill="none"
            stroke="#00ff41"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.14"
            d="M200 118v148 M104 218h192"
          />
          <path
            d="M88 168 Q24 120 8 56 M312 168 Q376 120 392 56"
            fill="none"
            stroke="#00ff41"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.09"
          />
        </g>
      </svg>
    </div>
  );
}
