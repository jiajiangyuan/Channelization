import React, { Component } from 'react';
import Channelization from '../../components/Channelization';
import style from './index.less';
import { Tabs } from 'antd';
import Positions from './components/Positions';
import { channel } from './data.d';
import RoadModal from './components/Positions/RoadModal';

const { TabPane } = Tabs;

class ChannelizationClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abnormal: false,
      componentKey: '1',
      directionNum: 0, //方位索引
      signalVisible: false, //信号机弹窗
      deviceVisible: false, //监控弹窗
      lampVisible: false, //灯组弹窗
      intersectionVisible: false, //路口关系弹窗
      newVisible: false, //新建渠化图弹窗
      detectorVisible: false, //检测器
      roadVisible: false, //道路弹窗
      popupData: {}, //弹窗数据
      data: {}, //方向数据
      LampGroup: [], //灯组
      Device: [], //监控器
      position: [], //车道数据
      activeKey: '', //选中的方位
      lanesSelected: '4', //车道数量
      positive: 0, //正向车道数
      signal: [], //信号机
      connector: [], //连接器info
      intersection: [], //路口关系标识
      unitId: props.unitId,
    };
  }

  componentDidMount() {
    this.handleAjax(channel);
  }

  /**
   * 初始化获取数据
   */
  handleAjax = (position) => {
    const { directionNum } = this.state;
    const arr = position.sort((a, b) => {
      return a['direction'] - b['direction'];
    });
    //按照存储排序
    const positionNew = arr.map((item) => {
      const obj = { ...item };
      const { alongSort = [], inverseSort = [] } = item;
      if (alongSort.length > 0) {
        let list = [];
        let arr = [];
        alongSort.forEach((id) => {
          const value = item.along.find((value) => value.laneno === id);
          if (value) {
            arr.push(value);
          }
        });

        item.along.forEach((value) => {
          const index = alongSort.findIndex((id) => value.laneno === id);
          if (index === -1 && value) {
            list.push(value);
          }
        });

        obj.along = [...list, ...arr];
      } else {
        obj.along.sort((a, b) => {
          return a['laneno'] - b['laneno'];
        });
      }

      if (inverseSort.length > 0) {
        let list = [];
        let arr = [];
        inverseSort.forEach((id) => {
          const value = item.inverse.find((value) => value.laneno === id);
          if (value) {
            arr.push(value);
          }
        });
        item.inverse.forEach((value) => {
          const index = inverseSort.findIndex((id) => value.laneno === id);
          if (index === -1 && value) {
            list.push(value);
          }
        });
        obj.inverse = [...arr, ...list];
      } else {
        obj.inverse.sort((a, b) => {
          return a['laneno'] - b['laneno'];
        });
      }
      return obj;
    });
    let num =
      position.length - 1 < directionNum ? position.length - 1 : directionNum;
    num = num < 0 ? 0 : num;
    const active = position[num]?.direction
      ? position[num]?.direction
      : position.length > 0
      ? position[0].direction
      : '';
    this.setState({
      activeKey: active,
      position: positionNew,
      directionNum: num,
    });
  };

  /**
   * 切换方位
   * @param activeKey
   * @param directionNum
   */
  handleChange = (activeKey, directionNum) => {
    this.setState({
      activeKey,
      directionNum,
    });
  };

  /**
   * 道路数据更改
   * @param position // 方位数据
   * @param type
   */
  handlePositionChange = (position) => {
    this.setState({ position });
  };

  /**
   * 方位坐标修改
   * @param params
   * @param index
   */
  uiChange = (params, index) => {
    const { position } = this.state;
    const arr = [...position];
    arr[index].uiConfig = {
      ...arr[index].uiConfig,
      ...params,
    };
    this.handlePositionChange(arr);
  };

  /**
   * 弹窗func
   * @param type{ 弹窗类型 }
   * @param flag { 是否打开 }
   * @param record { 弹窗数据 }
   */
  handleCancel = (type, flag, record) => {
    if (type === 'device') {
      //监控弹窗
      this.setState({
        deviceVisible: !!flag,
        popupData: record || {},
      });
    }
    if (type === 'lamp') {
      //灯组
      this.setState({
        lampVisible: !!flag,
        popupData: record || {},
      });
    }
    if (type === 'intersection') {
      //路口关系
      this.setState({
        intersectionVisible: !!flag,
        popupData: record || {},
      });
    }
    if (type === 'signal') {
      //信号机
      this.setState({
        signalVisible: !!flag,
      });
    }
    if (type === 'new') {
      //信号机
      this.setState({
        newVisible: !!flag,
      });
    }
    if (type === 'detector') {
      //路口关系
      this.setState({
        detectorVisible: !!flag,
        popupData: record || {},
      });
    }
    if (type === 'road') {
      //路口关系
      this.setState({
        roadVisible: !!flag,
        popupData: record || {},
      });
    }
  };

  /**
   * 渠化、信号机 模块切换触发
   * @param key
   */
  handleComponent = (key) => {
    this.setState({
      componentKey: key,
    });
  };

  render() {
    const {
      position = [],
      directionNum,
      activeKey,
      radianEditing,
      popupData,
      unitId,
      roadVisible,
      componentKey,
    } = this.state;
    return (
      <div className={style.ChannelizationClass}>
        <div className={style.content}>
          <div className={style.left}>
            <Channelization
              isModify={true}
              scale={0.5}
              position={position}
              radianEditing={radianEditing}
              handleCancel={this.handleCancel}
              uiChange={this.uiChange}
              handleChange={this.handleChange}
              handleAjax={this.handleAjax}
              unitId={unitId}
              componentKey={componentKey}
              handlePositionChange={this.handlePositionChange}
            />
          </div>
          <div className={style.right}>
            <Tabs
              defaultActiveKey="1"
              onChange={(key) => this.handleComponent(key)}
            >
              <TabPane tab="渠化图" key="1">
                <Positions
                  position={position}
                  handleAjax={this.handleAjax}
                  handleChange={this.handleChange}
                  positionChange={this.handlePositionChange}
                  activeKey={activeKey}
                  directionNum={directionNum}
                  handleCancel={this.handleCancel}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
        <RoadModal
          visible={roadVisible}
          data={popupData}
          cancel={this.handleCancel}
          handlePositionChange={this.handlePositionChange}
          position={position}
          directionNum={directionNum}
        />
      </div>
    );
  }
}

export default ChannelizationClass;
