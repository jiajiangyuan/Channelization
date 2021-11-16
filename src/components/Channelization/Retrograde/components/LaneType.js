import { Line, Rect, Text } from 'react-konva';
import React from 'react';

//机动车 或者 机非混合线条
export const LaneTypeVehicle = ({ num, x, roadLength }) => {
  return (
    <>
      <Line
        x={x}
        y={num}
        points={[0, 0, 50, 0]}
        stroke={'#ffffff'}
        strokeWidth={1}
      />
      <Line
        x={x + 50}
        y={num}
        points={[0, 0, roadLength - x - 50, 0]}
        stroke={'#ffffff'}
        strokeWidth={1}
        dash={[30, 20]}
      />
    </>
  );
};

//机动车 或者 机非混合线条
export const LaneTypeDivision = ({ num, x, roadLength }) => {
  return (
    <>
      <Line
        x={x}
        y={num - 3}
        points={[0, 0, roadLength - x, 0]}
        stroke={'#fffb04'}
        strokeWidth={1}
      />
      <Line
        x={x}
        y={num}
        points={[0, 0, roadLength - x, 0]}
        stroke={'#fffb04'}
        strokeWidth={1}
      />
    </>
  );
};

//非机动车
export const LaneTypeNoVehicle = ({ num, x, roadLength }) => {
  return (
    <Line
      x={x}
      y={num}
      points={[0, 0, roadLength - 50, 0]}
      stroke={'#ffffff'}
      strokeWidth={1}
    />
  );
};

//可变车道
export const LaneTypeVariable = ({ num, x, roadLength, roadWide }) => {
  let len = Math.ceil((roadLength - 100) / 20);

  let arr = [];
  let arr1 = [];

  for (let i = 1; i < len; i++) {
    arr.push(
      <Line
        key={i}
        x={i * 20 + 50}
        y={num * roadWide}
        points={[0, 0, 8, 0]}
        stroke={'#ffffff'}
        strokeWidth={1}
        rotation={130}
      />,
    );

    arr1.push(
      <Line
        key={i}
        x={i * 20 + 50}
        y={(num + 1) * roadWide}
        points={[0, 0, -8, 0]}
        stroke={'#ffffff'}
        strokeWidth={1}
        rotation={40}
      />,
    );
  }

  return (
    <>
      {arr.map((item) => item)}
      <Line
        x={x}
        y={(num + 1) * roadWide}
        points={[0, 0, roadLength - 50, 0]}
        stroke={'#ffffff'}
        strokeWidth={1}
      />
      {arr1.map((item) => item)}
    </>
  );
};

//公交车道
export const LaneTypeTransit = ({
  num,
  x,
  roadLength,
  roadWide,
  index,
  len,
}) => {
  return (
    <>
      {len !== index + 1 && (
        <Line
          x={x}
          y={num}
          points={[0, 0, roadLength - x, 0]}
          stroke={'#fffb04'}
          strokeWidth={2}
          dash={[30, 20]}
        />
      )}
      <Line
        x={x}
        y={index * roadWide}
        points={[0, 0, roadLength - x, 0]}
        stroke={'#fffb04'}
        strokeWidth={2}
        dash={[30, 20]}
      />
      <Text
        //描述
        x={x + 200}
        y={num - roadWide / 2 - 8}
        text={'公交车道'}
        rotation={-90}
        width={26}
        fontSize={26}
        stroke={'#fdf408'}
        strokeWidth={2}
        fill={'#fdf408'}
        offset={{
          x: roadWide / 2,
          y: 0,
        }}
      />
    </>
  );
};

//潮汐车道
export const LaneTypeTide = ({ x, roadLength, roadWide, index }) => {
  const num = roadWide * (index + 1);
  return (
    <>
      <Rect
        width={roadLength - x}
        height={5}
        x={x}
        y={num - 2}
        fill={'#404855'}
        hitStrokeWidth={'auto'}
      />
      <Line
        x={x}
        y={num - 7}
        points={[0, 0, roadLength - x, 0]}
        stroke={'#fffb04'}
        strokeWidth={1}
        dash={[20, 30]}
      />
      <Line
        x={x}
        y={num - 2}
        points={[0, 0, roadLength - x, 0]}
        stroke={'#fffb04'}
        strokeWidth={1}
        dash={[20, 30]}
      />
    </>
  );
};

//出口潮汐车道
export const LaneTypeTideExport = ({ len, x, roadLength, roadWide, index }) => {
  const num = roadWide * (len + index + 1);
  return (
    <>
      <Rect
        width={roadLength - x}
        height={10}
        x={x}
        y={num - 5}
        fill={'#404855'}
        hitStrokeWidth={'auto'}
      />
      <Line
        x={x}
        y={num - 5}
        points={[0, 0, roadLength - x, 0]}
        stroke={'#fffb04'}
        strokeWidth={1}
        dash={[20, 30]}
      />
      <Line
        x={x}
        y={num}
        points={[0, 0, roadLength - x, 0]}
        stroke={'#fffb04'}
        strokeWidth={1}
        dash={[20, 30]}
      />
    </>
  );
};

//出口公交车道
export const LaneTypeTransitExport = ({
  len,
  x,
  roadLength,
  roadWide,
  index,
  thisLen,
}) => {
  const num = (len + index + 1) * roadWide;
  return (
    <>
      {thisLen !== index + 1 && (
        <Line
          x={x}
          y={num}
          points={[0, 0, roadLength - x, 0]}
          stroke={'#fffb04'}
          strokeWidth={2}
          dash={[30, 20]}
        />
      )}

      {index !== 0 && (
        <Line
          x={x}
          y={(len + index) * roadWide}
          points={[0, 0, roadLength - x, 0]}
          stroke={'#fffb04'}
          strokeWidth={2}
          dash={[30, 20]}
        />
      )}

      <Text
        //描述
        x={x + 300}
        y={num - roadWide / 2 + 8}
        text={'公交车道'}
        rotation={90}
        width={26}
        fontSize={26}
        stroke={'#fdf408'}
        strokeWidth={2}
        fill={'#fdf408'}
        offset={{
          x: roadWide / 2,
          y: 0,
        }}
      />
    </>
  );
};
