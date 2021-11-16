import React, { useEffect, useState } from 'react';
import { Group, Line, Rect, Text } from 'react-konva';
import Sidewalk from '../Sidewalk';
import { Identification } from '../RoadMarking';
import addImg from '../img/addNew.png';
import deleteImg from '../img/delete.png';
import { message } from 'antd';
import {
  LaneTypeDivision,
  LaneTypeNoVehicle,
  LaneTypeTide,
  LaneTypeTideExport,
  LaneTypeTransit,
  LaneTypeTransitExport,
  LaneTypeVariable,
  LaneTypeVehicle,
} from './components/LaneType';

const Retrograde = ({
  index, //方位索引
  dataConnector, //方位数据
  fatherChange,
  handleChange, //切换方位
  setObjet, //对应方位路口索引
  setIdentVisible, //标识弹窗
  deleteEditing = false, //是否显示删除
  position, //方位数据
  handleCancel,
  isModify = false,
  addEditing,
  handlePositionChange,
  dragBoundFunc,
}) => {
  const { uiConfig, along, inverse, direction, sidewalk = [] } = dataConnector;
  const { rotation, x, y, offset, roadWide, roadLength } = uiConfig;
  const [auxiliaryLine, setLine] = useState(false);
  const [CfgLaneInfo, setInfo] = useState([]);
  const [maxLength, setMax] = useState(1);

  const roadTotalWide = roadWide * (along.length + inverse.length);

  useEffect(() => {
    let num = [];
    position.forEach((item) => {
      num = [...num, ...item.along, ...item.inverse, ...item.sidewalk];
    });
    const max =
      num.length > 0 &&
      num.reduce((a, b) => {
        return b.laneno > a.laneno ? b : a;
      });
    setMax(max);
    setInfo(num);
  }, [position]);

  const handleStageClick = (e) => {
    if (isModify) {
      if (handleChange) handleChange(dataConnector.direction, index);
    }
  };

  const onChange = (evt) => {
    if (isModify) {
      const rect = evt.target;
      var lines = {
        x: Math.ceil(rect.x()),
        y: Math.ceil(rect.y()),
        rotation: Math.ceil(rect.rotation()),
        width: rect.width(),
        height: rect.height(),
        scaleX: rect.scaleX(),
        scaleY: rect.scaleY(),
        offset: { ...rect.offset() },
      };
      if (fatherChange) fatherChange(lines, index);
      setLine(false);
    }
  };

  /**
   * 点击事件合并
   * @param type 标识类型
   * @param arrType  进口还是出口
   * @param i 数组索引
   */
  const onClick = (type, arrType, i) => {
    if (isModify) {
      //路标
      if (type === 'roadSigns') {
        if (setIdentVisible) {
          setIdentVisible(true);
          if (setObjet)
            setObjet({
              index,
              type,
              typeIndex: i,
              arrType,
            });
        }
      }
      //删除道路
      if (type === 'delete') {
        //删除
        const arr = [...position];
        arr[index][arrType].splice(i, 1);
        if (handlePositionChange) handlePositionChange(arr);
      }

      //增加道路
      if (type === 'add') {
        const arr = [...position];
        let item = arr[index][arrType][i];
        const obj = {
          laneno: maxLength ? maxLength.laneno + 1 : CfgLaneInfo.length + 1,
          featureValue: '机动车车道',
          feature: 1,
          attributeValue: '进口',
          movement: 11,
          movementValue: '直行',
          detail: null,
          attribute: item.attribute,
          id:
            Math.floor(new Date().getTime() / 1000000) +
            Math.floor(Math.random() * 100),
        };

        if (type === 'along') {
          i === 0
            ? arr[index][arrType].unshift(obj)
            : arr[index][arrType].splice(i - 1, 0, obj);
        } else {
          arr[index][arrType].splice(i, 0, obj);
        }

        handlePositionChange && handlePositionChange(arr);
      }
    }
  };

  /**
   * 车道编号
   * @param item { 车道数据 }
   * @param y { 编号位置  }
   * @param size { 文字大小 }
   * @param listIndex
   * @returns {JSX.Element}
   */
  const roadNumber = (item, y, size) => {
    let rotationNew = 0;
    let nX = roadLength + 5;
    let nY = y;
    if (rotation >= 0 && rotation < 90) {
      rotationNew = 0;
    }
    if (rotation >= 90 && rotation < 180) {
      rotationNew = 270;
      nY = item.laneno > 9 ? y + 20 : y + 20;
    }
    if (rotation >= 180 && rotation < 270) {
      rotationNew = 180;
      nY = y + 20;
      nX = roadLength + 25;
    }
    if (rotation >= 270 && rotation < 360) {
      rotationNew = 90;
      nX = roadLength + 20;
    }
    return (
      <Text
        x={nX}
        y={nY}
        text={item.laneno}
        fontSize={size}
        fill={'#ffffff'}
        rotation={rotationNew}
        onClick={() => handleCancel && handleCancel('road', true, item)}
      />
    );
  };

  /**
   * 删除按钮
   * @param type
   * @param index
   * @param sizeNum
   * @param size
   * @returns {JSX.Element}
   */
  const delComponent = (type, index, sizeNum) => {
    const size = 25;
    return (
      <Identification
        location={{ x: roadLength, y: sizeNum - 2 }}
        movement={deleteImg}
        width={size}
        height={size}
        rotation={180}
        onClick={() => onClick('delete', type, index)}
      />
    );
  };

  /**
   * 添加道路
   * @param type
   * @param index
   * @param sizeNum
   * @returns {JSX.Element}
   */
  const addComponent = (type, index, sizeNum) => {
    const size = 25;
    return (
      <Identification
        location={{ x: roadLength, y: sizeNum - 2 }}
        movement={addImg}
        width={size}
        height={size}
        rotation={180}
        onClick={() => onClick('add', type, index)}
      />
    );
  };

  return (
    <Group
      offset={{
        x: offset.x,
        y: offset.y,
      }}
      rotation={rotation}
      x={x}
      y={y}
      onDragStart={(e) => {
        setLine(true);
      }}
      onTransformEnd={onChange}
      onDragEnd={onChange}
      onClick={(e) => handleStageClick(e)}
      draggable={isModify}
      name={`group-${index}`}
      dragBoundFunc={dragBoundFunc}
    >
      {auxiliaryLine && (
        <>
          <Line
            //道路描边
            points={[0, roadTotalWide / 2, -2000, roadTotalWide / 2]}
            strokeWidth={2}
            fill={'#ff0000'}
            stroke={'#ff0000'}
          />
        </>
      )}

      <Line
        //道路描边
        points={[0, 0, roadLength, 0]}
        strokeWidth={10}
        fill={'#404855'}
        stroke={'#ffffff'}
      />
      <Line
        //道路描边
        points={[roadLength, roadTotalWide, 0, roadTotalWide]}
        strokeWidth={10}
        fill={'#404855'}
        stroke={'#ffffff'}
      />
      <Rect
        x={-3}
        y={0}
        width={60}
        height={roadTotalWide}
        fill={'#404855'}
        hitStrokeWidth={'auto'}
      />

      {
        //人行道
        sidewalk.length > 0 && (
          <Sidewalk
            sidewalk={sidewalk}
            length={roadTotalWide}
            handleCancel={handleCancel}
            isModify={isModify}
          />
        )
      }

      {along.map((item, index) => {
        const { feature, movement } = item;
        const num = (index + 1) * roadWide;
        //x坐标距离
        const x = sidewalk.length > 0 ? 50 : 0;
        //车道灯组等大小
        const size = 25;
        const interval = roadWide - size;
        const sizeNum = num - interval / 2;

        return (
          <Group x={0} key={num}>
            <Line
              x={x - 1}
              y={index * roadWide}
              points={[0, 0, 0, roadWide]}
              stroke={'#ffffff'}
              strokeWidth={2}
            />

            <Rect
              width={roadLength - x}
              height={roadWide + 1}
              x={x}
              y={index * roadWide}
              fill={'#404855'}
              hitStrokeWidth={'auto'}
            />

            {isModify && roadNumber(item, sizeNum - 25, 20)}

            {
              //删除按钮
              deleteEditing && delComponent('along', index, sizeNum)
            }

            {addEditing && addComponent('along', index, sizeNum)}

            {
              //路标
              movement?.uiId !== 183 && (
                <Identification
                  location={{ x: 150, y: sizeNum - 2.5 }}
                  movement={movement}
                  width={20}
                  height={20 * 1.8}
                  rotation={-90}
                  onClick={() => onClick('roadSigns', 'along', index)}
                />
              )
            }
            {
              //自行车道路标
              movement?.uiId === 183 && (
                <Identification
                  location={{ x: 150 + size * 1.8, y: sizeNum }}
                  movement={movement}
                  width={size * 1.8}
                  height={size}
                  rotation={180}
                  onClick={() => onClick('roadSigns', 'along', index)}
                />
              )
            }

            {
              //非机动车线条
              feature === 2 && (
                <LaneTypeNoVehicle x={x} num={num} roadLength={roadLength} />
              )
            }

            {
              //分割线
              index === along.length - 1 && feature !== 6 && (
                <LaneTypeDivision x={x} num={num} roadLength={roadLength} />
              )
            }

            {
              //机动车 或者 机非混合线条
              (feature === 1 || feature === 3) &&
                index !== along.length - 1 && (
                  <LaneTypeVehicle x={x} num={num} roadLength={roadLength} />
                )
            }

            {
              //可变车道
              feature === 4 && index !== along.length - 1 && (
                <LaneTypeVariable
                  x={x}
                  num={index}
                  roadWide={roadWide}
                  roadLength={roadLength}
                />
              )
            }

            {
              //公交车道
              feature === 5 && (
                <LaneTypeTransit
                  x={x}
                  index={index}
                  num={num}
                  roadLength={roadLength}
                  roadWide={roadWide}
                  len={along.length}
                />
              )
            }

            {
              //潮汐车道
              feature === 6 && index !== 0 && (
                <LaneTypeTide
                  x={x}
                  num={num}
                  index={index}
                  roadWide={roadWide}
                  roadLength={roadLength}
                />
              )
            }
          </Group>
        );
      })}
      {inverse.map((item, index) => {
        const { attribute, movement, feature } = item;
        const num = (along.length + index) * roadWide;
        const x = sidewalk.length > 0 ? 50 : 0;
        //车道灯组等大小
        const size = 25;
        const interval = roadWide - size;
        const sizeNum = num + interval / 2;

        return (
          <Group x={0} key={num}>
            <Rect
              width={roadLength - x}
              height={roadWide + 1}
              x={x}
              y={num}
              fill={'#404855'}
              hitStrokeWidth={'auto'}
            />

            {isModify && roadNumber(item, sizeNum + 5, 20)}

            {
              //删除按钮
              deleteEditing &&
                delComponent('inverse', index, sizeNum + size, size)
            }

            {addEditing && addComponent('inverse', index, sizeNum + size)}

            {
              //车道标识
              <Identification
                attribute={attribute}
                location={{ x: 150 + 20 * 1.8, y: sizeNum }}
                movement={movement}
                width={20}
                height={20 * 1.8}
                rotation={90}
                onClick={() => onClick('roadSigns', 'inverse', index)}
              />
            }

            {
              //非机动车线条
              index !== 0 && feature === 2 && (
                <LaneTypeNoVehicle
                  x={x}
                  num={(along.length + index) * roadWide}
                  roadLength={roadLength}
                />
              )
            }
            {
              //机动车 或者 机非混合线条
              (feature === 1 || feature === 3) && (
                <Line
                  x={x}
                  y={(along.length + index + 1) * roadWide}
                  points={[0, 0, roadLength - x, 0]}
                  stroke={'#ffffff'}
                  strokeWidth={1}
                  dash={[30, 20]}
                />
              )
            }

            {
              //公交车道
              feature === 5 && (
                <LaneTypeTransitExport
                  x={x}
                  num={num}
                  thisLen={inverse.length}
                  len={along.length}
                  index={index}
                  roadWide={roadWide}
                  roadLength={roadLength}
                />
              )
            }

            {
              //潮汐车道
              feature === 6 && (
                <LaneTypeTideExport
                  x={x}
                  len={along.length}
                  index={index}
                  roadWide={roadWide}
                  roadLength={roadLength}
                />
              )
            }
          </Group>
        );
      })}
    </Group>
  );
};

export default Retrograde;
