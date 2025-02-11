"use client";
import React, {
  Dispatch,
  SetStateAction,
  FC,
  useRef,
  useEffect,
  ChangeEvent,
} from "react";

interface DoubleRangeProps {
  min: number;
  max: number;
  onChange?: Dispatch<SetStateAction<number[]>>;
  step: number;
  value: number[];
}

const DoubleRange: FC<DoubleRangeProps> = ({
  min,
  max,
  onChange,
  step,
  value,
}): JSX.Element => {
  const [minValue, setMinValue] = React.useState(value[0]);
  const [maxValue, setMaxValue] = React.useState(value[1]);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const minInputRef = useRef<HTMLInputElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (onChange) {
      onChange([minValue, maxValue]);
    }
  }, [minValue, maxValue, onChange]);

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  const handleChangeMin = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = Math.min(Number(event.target.value), maxValue);
    setMinValue(newValue);
  };

  const handleChangeMax = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = Math.max(Number(event.target.value), minValue);
    setMaxValue(newValue);
  };

  useEffect(() => {
    if (trackRef.current) {
      const minLeft = `${((minValue - min) / (max - min)) * 100}%`;
      const maxRight = `${((max - maxValue) / (max - min)) * 100}%`;
      trackRef.current.style.left = minLeft;
      trackRef.current.style.right = maxRight;
    }
  }, [minValue, maxValue, min, max]);

  return (
    <div className="range_slider_container w-[230px] mt-6">
      <div className="range_slider relative h-2 bg-gray-300 rounded-xl">
        <div
          className="track h-full absolute bg-buttonPink rounded-lg"
          ref={trackRef}
        ></div>
        <input
          className="inputFcck input_min"
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleChangeMin}
          step={step}
          ref={minInputRef}
        />
        <input
          className="inputFcck input_max"
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleChangeMax}
          step={step}
          ref={maxInputRef}
        />
      </div>
      <div className="container_values mt-4 flex items-center justify-between w-full">
        <div className="container_value container_value_min">{minValue}</div>
        <div className="container_value container_value_max">{maxValue}</div>
      </div>
    </div>
  );
};

export default DoubleRange;
