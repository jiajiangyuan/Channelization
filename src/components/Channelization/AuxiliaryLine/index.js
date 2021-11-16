import React from 'react';
import { Line } from 'react-konva';

const AuxiliaryLine = ({ width, height }) => {
  let size = 3;
  let arr = [];
  let arr1 = [];

  for (let i = 0; i < width / 10; i++) {
    if (i % size === 0) {
      arr.push(
        <Line
          key={i}
          x={i * size * 10}
          y={0}
          points={[0, 0, 0, height * 2]}
          stroke={'#ffffff'}
          strokeWidth={1}
        />,
      );
    }
  }

  for (let i = 0; i < height / 10; i++) {
    if (i % size === 0) {
      arr1.push(
        <Line
          key={i}
          x={0}
          y={i * size * 10}
          points={[0, 0, width * 2, 0]}
          stroke={'#ffffff'}
          strokeWidth={1}
        />,
      );
    }
  }

  return (
    <>
      {arr.map((item) => item)}
      {arr1.map((item) => item)}
    </>
  );
};

export default AuxiliaryLine;
