import React, { useEffect, useState } from 'react';
import { Circle, Group, Layer, Shape, Stage } from 'react-konva';
import style from './index.less';
import Retrograde from './Retrograde';
import { Identification } from './RoadMarking';
import { message } from 'antd';
import IdentificationModal from './IdentificationModal';
import compass from './img/compass.png';
import cerame from './img/cerame.png';
import AuxiliaryLine from './AuxiliaryLine';

/**
 *
 * @param scale //缩放比例
 * @param width //宽
 * @param height //高
 * @param isModify {是否是编辑模式}
 * @param position { 方位数据 }
 * @param handlePositionChange {方位数据变更}
 * @param handleCancel { 弹窗调用方法 }
 * @param uiChange  { 修改ui样式,比如道路挪动、弧线改变 }
 * @param handleAjax  { 更新道路数据方法 }
 * @param handleChange  { 切换方向 }
 * @param primitiveInfo  { interConfig数据 }
 * @param devicePiclist  { interConfig数据 }
 * @param interCfgLaneInfo { 相位状态数据 }
 * @param componentKey  { tab当前类型key }
 * @param unitId  { 当前路口id }
 * @param handleDirDragEnd { 渠化图整体移动回调 }
 * @param popUiConfig { 渠化图位置信息 }
 * @returns {JSX.Element}
 * @constructor
 */
const Channelization = ({
  scale = 1,
  width = 800,
  height = 735,
  isModify = false, //是否是编辑模式
  position = [],
  handlePositionChange,
  handleCancel,
  uiChange,
  handleAjax,
  handleChange, //切换方位
  componentKey = '',
  unitId,
  handleDirDragEnd,
  popUiConfig = {},
}) => {
  const { stage = null } = popUiConfig;
  const [identVisible, setIdentVisible] = useState(false); //标识弹窗
  const [obj, setObjet] = useState({}); //改变数据的标识 索引
  const [radianEditing, setEdit] = useState(false); //弧度编辑
  const [deleteEditing, setDel] = useState(false); //删除开启
  const [addEditing, setAdd] = useState(false); //增加开启
  const [auxiliary, setAuxiliary] = useState(false); //辅助线
  const [newScale, setScale] = useState(scale);

  //判定渠化图缩放比例
  useEffect(() => {
    stage && setScale(stage.scaleX);
  }, [stage]);

  /**
   * 点击事件
   * @param e
   * @param type
   * @param data
   */
  const handleStageClick = (e, type, data) => {
    if (handleCancel) handleCancel(type, true, data);
  };

  /**
   * 拖拽事件
   * @param evt konva方法
   * @param type 事件类型
   * @param params 传递数据
   * @param x 坐标
   */
  const handleStageChange = (evt, type, params, x) => {
    if (isModify) {
      message.destroy();
      //编辑模式
      const rect = evt.target;
      if (type === 'lamp') {
        let obj = {
          ...params,
          uiUnitConfig: {
            ...params.uiUnitConfig,
            pLeft: Math.ceil(rect.x()),
            pTop: Math.ceil(rect.y()),
          },
        };
      }

      //============拖拽添加=================

      if (type === 'dragLamp') {
        //灯组
        let obj = {
          deviceInfo: {
            deviceCode: 0,
            deviceModel: 0,
            deviceName: '灯组',
            deviceType: 2,
            unitId,
          },
          uiUnitConfig: {
            isView: 0,
            pLeft: Math.ceil(rect.x()),
            pTop: Math.ceil(rect.y()),
            rotationAngle: 0,
            uiHight: 0,
            uiId: params.id,
            uiImageName: params.uiImageName,
            uiWidth: 0,
            unitId,
          },
          cfgLampgroup: {
            direction: 1,
            directionValue: '',
            lampgroupno: LampGroup.length + 1,
            signalId: '',
            type: null,
            typeValue: '',
            unitId,
          },
        };
        if (handleCancel) handleCancel('lamp', true, obj);
        rect.y(10);
        rect.x(x);
      }
    }
  };

  /**
   * 变更方位ui
   * @param params { uiCongig }
   * @param index { 方位索引 }
   */
  const onChange = (params, index) => {
    if (uiChange) uiChange(params, index);
  };

  //渠化图整体拖动
  const stageChange = (evt) => {
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
    handleDirDragEnd && handleDirDragEnd(lines);
  };

  /**
   * 弧度改变
   * @param evt
   * @param item
   * @param index
   */
  const radianChange = (evt, item, index) => {
    const rect = evt.target;
    const obj = {
      ...item.uiConfig,
      radianX: Math.ceil(rect.x()),
      radianY: Math.ceil(rect.y()),
    };
    onChange(obj, index);
  };

  /**
   * 滚轮放大缩小
   * @param e
   */
  const handleWheel = (e) => {
    if (!isModify) {
      if (e.nativeEvent.deltaY <= 0) {
        if (newScale > 0.3) {
          let num = newScale - 0.01;
          setScale(Math.floor(num * 100) / 100);
        }
      } else {
        if (newScale < 1) {
          let num = newScale + 0.01;
          setScale(Math.floor(num * 100) / 100);
        }
      }
    }
  };

  /**
   * 滑动区域限制
   * @param pos
   */
  const dragBoundFunc = (pos) => {
    let newX = pos.x;
    let newY = pos.y;
    if (newX > width - 20) {
      newX = width - 20;
    }
    if (newY > height - 20) {
      newY = height - 20;
    }
    if (newX < 10) {
      newX = 10;
    }
    if (newY < 10) {
      newY = 10;
    }
    return {
      x: newX,
      y: newY,
    };
  };

  return (
    <div className={style.container} onWheel={handleWheel}>
      {isModify && (
        <>
          <div
            className={style.icon}
            onClick={() => setAuxiliary(!auxiliary)}
            style={{
              right: 10,
              top: 60,
            }}
          >
            <img
              src={
                auxiliary ? require('./img/05.png') : require('./img/01.png')
              }
              alt={''}
            />
          </div>

          <div
            className={style.icon}
            onClick={() => setEdit(!radianEditing)}
            style={{
              right: 10,
              top: 85,
            }}
          >
            <img
              src={
                radianEditing
                  ? require('./img/06.png')
                  : require('./img/02.png')
              }
              alt={''}
            />
          </div>

          <div
            className={style.icon}
            onClick={() => {
              setAdd(!addEditing);
              if (!addEditing) setDel(false);
            }}
            style={{
              right: 10,
              top: 110,
            }}
          >
            <img
              src={
                addEditing ? require('./img/07.png') : require('./img/03.png')
              }
              alt={''}
            />
          </div>
          <div
            className={style.icon}
            onClick={() => {
              setDel(!deleteEditing);
              if (!deleteEditing) setAdd(false);
            }}
            style={{
              right: 10,
              top: 135,
            }}
          >
            <img
              src={
                deleteEditing
                  ? require('./img/08.png')
                  : require('./img/04.png')
              }
              alt={''}
            />
          </div>
        </>
      )}
      <img
        src={compass}
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
          width: 30,
          height: 30,
        }}
        alt={''}
      />
      <Stage
        width={width}
        height={height}
        scaleX={newScale}
        scaleY={newScale}
        name={'stage'}
        x={stage?.x || 0}
        y={stage?.y || 0}
        onDragEnd={stageChange}
        draggable={!isModify}
        offset={!isModify ? { x: -(width - 100) / 2, y: height / 4 } : {}}
      >
        <Layer>
          {auxiliary && isModify && (
            <AuxiliaryLine width={width} height={height} />
          )}

          {
            //描绘路口
            position.length > 1 && (
              <Shape
                sceneFunc={(context, shape) => {
                  context.strokeStyle = '#ffffff';
                  context.lineWidth = 10;
                  context.beginPath();
                  position.forEach((item, index) => {
                    const {
                      uiConfig: { x, y, rotation, roadWide, radianX, radianY },
                      along,
                      inverse,
                    } = item;
                    let radian = (-rotation * Math.PI) / 180;
                    let endPointX =
                      x +
                      roadWide *
                        (along.length + inverse.length) *
                        Math.sin(radian);
                    let endPointY =
                      y +
                      roadWide *
                        (along.length + inverse.length) *
                        Math.cos(radian);

                    if (index === 0) {
                      context.moveTo(x, y);
                    }
                    context.lineTo(endPointX, endPointY);
                    if (index + 1 < position.length) {
                      const { uiConfig } = position[index + 1];
                      context.quadraticCurveTo(
                        radianX,
                        radianY,
                        uiConfig.x,
                        uiConfig.y,
                      );
                    } else {
                      const { uiConfig } = position[0];
                      context.quadraticCurveTo(
                        radianX,
                        radianY,
                        uiConfig.x,
                        uiConfig.y,
                      );
                    }
                  });
                  context.stroke();
                  context.closePath();
                  context.fillStrokeShape(shape);
                }}
                fill={'#404855'}
              />
            )
          }
          {componentKey === '5' &&
            lampArr.map((item, index) => {
              return (
                <Group key={item.id}>
                  <Identification
                    location={{ x: 30 * (index + 1) * 2, y: 10 }}
                    movement={item.uiImageName}
                    width={30}
                    height={30 / 0.375}
                    rotation={0}
                  />
                  <Identification
                    location={{ x: 30 * (index + 1) * 2, y: 10 }}
                    movement={item.uiImageName}
                    width={30}
                    height={30 / 0.375}
                    rotation={0}
                    onDragEnd={(e) =>
                      isModify &&
                      handleStageChange(
                        e,
                        'dragLamp',
                        item,
                        30 * (index + 1) * 2,
                      )
                    }
                    draggable={isModify}
                    dragBoundFunc={dragBoundFunc}
                  />
                </Group>
              );
            })}

          {
            //道路绘制
            position.map((item, index) => {
              const {
                uiConfig: { radianX, radianY },
              } = item;
              return (
                <Group key={item.id}>
                  <Retrograde
                    fatherChange={onChange}
                    key={item.id}
                    dataConnector={item}
                    index={index}
                    handleChange={handleChange}
                    setObjet={setObjet}
                    setIdentVisible={setIdentVisible}
                    position={position}
                    deleteEditing={deleteEditing}
                    addEditing={addEditing}
                    handleCancel={handleCancel}
                    isModify={isModify}
                    handleAjax={handleAjax}
                    handlePositionChange={handlePositionChange}
                    dragBoundFunc={dragBoundFunc}
                  />
                  {radianEditing && (
                    <Circle
                      key={item.positionId}
                      x={radianX}
                      y={radianY}
                      radius={70}
                      width={40}
                      height={40}
                      fill={'#ffffff'}
                      draggable
                      onDragEnd={(evt) => radianChange(evt, item, index)}
                      dragBoundFunc={dragBoundFunc}
                    />
                  )}
                </Group>
              );
            })
          }
        </Layer>
      </Stage>

      <IdentificationModal
        handleCancel={setIdentVisible}
        visible={identVisible}
        handleAjax={handleAjax}
        position={position}
        obj={obj}
        handlePositionChange={handlePositionChange}
      />
    </div>
  );
};

export default Channelization;
