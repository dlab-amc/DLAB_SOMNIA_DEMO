import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * 한 줄 말줄임 + 실제 축약된 경우에만 호버 툴팁 표시
 */
const TruncatedTooltipCell = ({ text, isTitle = false }) => {
  const textRef = useRef(null);
  const [truncated, setTruncated] = useState(false);
  const value = text ?? "";

  const measure = useCallback(() => {
    const el = textRef.current;
    if (!el) {
      setTruncated(false);
      return;
    }
    setTruncated(el.scrollWidth > el.clientWidth + 1);
  }, []);

  useEffect(() => {
    measure();
    const el = textRef.current;
    if (!el || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, value]);

  if (!value) return null;

  return (
    <span
      className={`cell-tooltip-wrap${isTitle ? " is-title" : ""}${
        truncated ? " is-truncated" : ""
      }`}
    >
      <span className="cell-ellipsis-text" ref={textRef}>
        {value}
      </span>
      {truncated ? (
        <span className="cell-tooltip" role="tooltip">
          {value}
        </span>
      ) : null}
    </span>
  );
};

export default TruncatedTooltipCell;
