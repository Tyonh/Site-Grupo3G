import Image from "next/image";
import { useId } from "react";

interface ThreeGLoaderMarkProps {
  label?: string;
  phase?: "loading" | "ready" | "leaving";
}

export default function ThreeGLoaderMark({
  label = "Carregando",
  phase = "loading",
}: ThreeGLoaderMarkProps) {
  const circleId = useId();

  return (
    <div
      className="page-loader"
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-label={label}>
      <div className="page-loader-mark" aria-hidden="true">
        <svg
          className="page-loader-ring"
          viewBox="0 0 200 200"
          focusable="false">
          <defs>
            <path
              id={circleId}
              d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
            />
          </defs>
          {/* Cada nome ocupa o mesmo arco; os pontos fecham os quatro quadrantes. */}
          {[0, 90, 180, 270].map((rotation) => (
            <g key={rotation} transform={`rotate(${rotation} 100 100)`}>
              <text className="page-loader-ring-text">
                <textPath
                  href={`#${circleId}`}
                  startOffset="10.69"
                  textLength="98"
                  lengthAdjust="spacingAndGlyphs">
                  GRUPO 3G
                </textPath>
              </text>
              <circle cx="100" cy="17" r="3" fill="white" />
            </g>
          ))}
        </svg>
        <span className="page-loader-core">
          <Image
            src="/grupo-3g-symbol-loader.png"
            alt=""
            width={1498}
            height={1870}
            priority
            className="page-loader-core-image"
          />
        </span>
      </div>
      <span className="page-loader-label">{label}</span>
    </div>
  );
}
