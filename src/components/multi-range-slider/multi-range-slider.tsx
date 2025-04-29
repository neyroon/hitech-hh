"use client";
import { debounce } from "@/utils/debounce";
import { useEffect, useRef, useState } from "react";

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
  const [sliderMinValue] = useState(defaultMinValue);
  const [sliderMaxValue] = useState(defaultMaxValue);

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const onChangeDebounced = useRef(debounce(onChange, 500));

  const sliderTrack = useRef<HTMLDivElement | null>(null);

  const minGap = 5;
  const slideMin = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= sliderMinValue && maxVal - value >= minGap) {
      setMinVal(value);
    }
  };

  const slideMax = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value - minVal >= minGap) {
      setMaxVal(value);
    }
  };
  const setSliderTrack = () => {
    const range = sliderTrack.current;

    if (range) {
      const minPercent =
        ((minVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
      const maxPercent =
        ((maxVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

      range.style.left = `${minPercent}%`;
      range.style.right = `${100 - maxPercent}%`;
    }
  };

  useEffect(() => {
    setSliderTrack();
    onChangeDebounced.current({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="font-light">{minVal}</span>
        <span className="font-light">{maxVal}</span>
      </div>

      <div className="range-slider">
        <div className="slider-track" ref={sliderTrack}></div>
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={minVal}
          onChange={slideMin}
          className="min-val"
        />
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={maxVal}
          onChange={slideMax}
          className="max-val"
        />
      </div>
    </>
  );
};
