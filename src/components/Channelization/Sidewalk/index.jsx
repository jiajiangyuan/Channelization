import React from 'react';
import { Group, Line, Rect, Text } from 'react-konva';

const Sidewalk = ({
  length, ///道路总长度
  sidewalk, //人行道数据
  width = 30, //人行道宽度
  handleCancel, //信息弹窗
  isModify, //是否显示模式
}) => {
  let len = sidewalk.length > 1 ? (length - 30) / 2 : length;
  let color = '#ffffff';
  let colorTwo = '#ffffff';
  let arr = [];
  let arr1 = [];

  for (let i = 1; i < len; i++) {
    if (i % 10 === 0) {
      arr.push(
        <Line
          key={i}
          x={0}
          y={i}
          points={[0, 0, width, 0]}
          stroke={color}
          strokeWidth={2}
        />,
      );
    }
  }
  if (sidewalk.length > 1) {
    for (let i = 0; i < len; i++) {
      if (i % 10 === 0) {
        arr1.push(
          <Line
            key={i}
            x={0}
            y={length - i}
            points={[0, 0, width, 0]}
            stroke={colorTwo}
            strokeWidth={2}
          />,
        );
      }
    }
  }

  return (
    <Group x={0}>
      {arr.map((item) => item)}
      {sidewalk.length > 1 && (
        <Rect
          width={width}
          height={20}
          x={0}
          y={len + 5}
          stroke={color}
          strokeWidth={3}
        />
      )}
      {sidewalk.length > 1 && arr1.map((item) => item)}

      {sidewalk.length > 0 && isModify && (
        <Text
          x={-30}
          y={0}
          text={sidewalk[0].laneno}
          fontSize={20}
          fill={'#ffffff'}
          rotation={0}
          onClick={() =>
            handleCancel && handleCancel('road', true, sidewalk[0])
          }
        />
      )}

      {sidewalk.length > 1 && isModify && (
        <Text
          x={-30}
          y={length - 20}
          text={sidewalk[1].laneno}
          fontSize={20}
          fill={'#ffffff'}
          rotation={0}
          onClick={() =>
            handleCancel && handleCancel('road', true, sidewalk[1])
          }
        />
      )}
    </Group>
  );
};

export default Sidewalk;
