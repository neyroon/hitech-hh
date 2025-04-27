"use client";
import { debounce, throttle } from "@/utils/throttle";
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";

export const MultiRangeSlider = ({
  min,
  max,
  defaultMinValue = min,
  defaultMaxValue = max,
  onChange,
}: {
  min: number;
  max: number;
  defaultMinValue?: number;
  defaultMaxValue?: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
}) => {
  const [minVal, setMinVal] = useState(defaultMinValue);
  const [maxVal, setMaxVal] = useState(defaultMaxValue);
  const minValRef = useRef<HTMLInputElement | null>(null);
  const maxValRef = useRef<HTMLInputElement | null>(null);
  const range = useRef(null);
  const trottledOnchange = useRef(debounce(onChange, 500));

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    trottledOnchange.current({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="font-light">{minVal}</span>
        <span className="font-light">{maxVal}</span>
      </div>
      <div className="relative h-[20px]">
        <div className="rounded-[4px] h-[4px] top-[8px] absolute w-full bg-bg-grey z-1" />
        <div ref={range} className="bg-bg-red top-[8px] absolute h-[4px] z-2" />
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={classNames(
            "pointer-events-none absolute top-[8px] h-0 w-full lg:w-[241px] outline-none appearance-none  z-3",
            {
              "z-5": minVal > max - 100,
            }
          )}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="pointer-events-none top-[8px] absolute h-0 w-full lg:w-[241px] outline-none appearance-none  z-4"
        />
      </div>
    </>
  );
};
