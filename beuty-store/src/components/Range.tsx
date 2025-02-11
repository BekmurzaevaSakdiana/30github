'use client'
import React, { useEffect, useState } from "react";
import DoubleRange from './DoubleRange'

const Range = () => {
  const MIN = 0;
  const MAX = 700;

  const [range,setRange]=useState<number[]>([100,500])

 

  return (
    <div className="range_wrap w-72 mx-auto ">
      <DoubleRange min={MIN} max={MAX} onChange={setRange} step={1} value={range} />
    </div>
  );
};

export default Range;
