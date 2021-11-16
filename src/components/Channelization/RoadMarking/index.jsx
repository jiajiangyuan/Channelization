import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';

export const Identification = ({
  location: { x = 0, y = 0 },
  movement,
  width = 20,
  height,
  rotation = 0,
  onClick,
  onChange,
  onDragEnd,
  draggable = false,
  offset = {
    x: 0,
    y: 0,
  },
  dragBoundFunc,
}) => {
  const [imageState, setImageState] = useState(null);
  useEffect(() => {
    if (movement) {
      let imageObj = new window.Image();
      imageObj.src =
        typeof movement !== 'number'
          ? movement
          : require(`@/pages/ChannelizationTable/images/${movement}.png`);
      imageObj.alt = '图片地址错误';
      imageObj.onload = () => setImageState(imageObj);
    }
  }, [movement]);

  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  const handleDragEnd = (e) => {
    if (onDragEnd) onDragEnd(e);
  };

  return (
    <Image
      x={x}
      y={y}
      image={imageState}
      width={width}
      height={height || width * 2.5}
      rotation={rotation}
      onClick={handleClick}
      onDragEnd={handleDragEnd}
      draggable={draggable}
      onChange={handleChange}
      offset={offset}
      dragBoundFunc={(pos) => {
        if (dragBoundFunc) {
          return dragBoundFunc(pos);
        } else {
          return {
            x: pos.x,
            y: pos.y,
          };
        }
      }}
    />
  );
};
