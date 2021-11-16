import React, { useEffect, useState } from 'react';
import {
  Col,
  Empty,
  Form,
  InputNumber,
  message,
  Modal,
  Row,
  Switch,
  Table,
  Tabs,
} from 'antd';
import { ExclamationCircleOutlined, MenuOutlined } from '@ant-design/icons';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import style from '../../index.less';
import PositionModal from './PositionModal';
import { feature } from '../../data.d';

const { TabPane } = Tabs;
const { confirm } = Modal;

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999999' }} />
));
const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

//渠化图
const Positions = ({
  position, //处理后的方位数据
  handleChange, //切换方位
  activeKey, //方位key
  directionNum, //方位索引
  positionChange, //变更方位
  handleAjax,
}) => {
  const [visible, setVisible] = useState(false); //添加方位弹窗
  const [CfgLaneInfo, setInfo] = useState([]);
  const [maxLength, setMax] = useState(1);

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

  /**
   * 切换车标
   * @param activeKey
   */
  const onChange = (activeKey) => {
    let directionNum = 0;
    position.forEach((item, index) => {
      if (item.direction === parseInt(activeKey)) {
        directionNum = index;
      }
    });
    if (handleChange) handleChange(activeKey, directionNum);
  };

  /**
   * Tab事件触发
   * @param targetKey { tabKey }
   * @param action { remove , add }
   */
  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      confirm({
        title: '确认删除吗?',
        icon: <ExclamationCircleOutlined />,
        onOk: () => {
          const arr = [...position];
          const num = directionNum - 1 > 0 ? directionNum - 1 : 0;
          arr.splice(directionNum, 1);
          if (positionChange) positionChange(arr);
          if (handleChange && arr.length > 0)
            handleChange(arr[num].direction, num);
        },
      });
    } else if (action === 'add') {
      if (position.length < 8) {
        setVisible(true);
        return;
      }
      message.destroy();
      message.warning('超过道路创建数');
    }
  };

  /**
   * 道路变更
   * @param value
   * @param type
   */
  const roadChange = (value, type) => {
    if (value <= 6 && value >= 0) {
      const arr = [...position];
      if (position[directionNum][type].length < value) {
        let arrList = [];
        const len = value - position[directionNum][type].length;
        if (len === 1) {
          const obj = {
            id:
              Math.floor(new Date().getTime() / 1000000) +
              Math.floor(Math.random() * 100),
            laneno: maxLength ? maxLength.laneno + 1 : CfgLaneInfo.length + 1,
            featureValue: '机动车车道',
            feature: 1,
            attribute: type === 'along' ? 1 : 2,
            attributeValue: type === 'along' ? '进口' : '出口',
            movement: 11,
            movementValue: '直行',
            detail: null,
          };
          arrList.push(obj);
        } else {
          for (let i = 0; i < len; i++) {
            const obj = {
              id:
                Math.floor(new Date().getTime() / 1000000) +
                Math.floor(Math.random() * 100),
              laneno: maxLength ? maxLength.laneno + 1 : CfgLaneInfo.length + 1,
              featureValue: '机动车车道',
              feature: 1,
              attribute: type === 'along' ? 1 : 2,
              attributeValue: type === 'along' ? '进口' : '出口',
              movement: 11,
              movementValue: '直行',
              detail: null,
            };
            arrList.push(obj);
          }
        }
        arr[directionNum][type] = [...arr[directionNum][type], ...arrList];
      } else {
        arr[directionNum][type] = arr[directionNum][type].filter(
          (item, index) => index + 1 < value,
        );
      }

      if (positionChange) positionChange(arr);
    }
  };

  /**
   * 行人道 && 二次过街
   * @param value
   * @param key
   */
  const sidewalkFun = (value, key) => {
    const arr = [...position];
    if (value) {
      const obj = {
        id:
          Math.floor(new Date().getTime() / 1000000) +
          Math.floor(Math.random() * 100),
        laneno: maxLength ? maxLength.laneno + 1 : CfgLaneInfo.length + 1,
        featureValue: null,
        feature: null,
        attribute: null,
        attributeValue: null,
        movement: 39,
        movementValue: '人行道',
        detail: null,
      };
      arr[directionNum].sidewalk.push(obj);
    } else {
      const dest = arr[directionNum].sidewalk[key === 'sidewalk' ? 0 : 1];
      if (dest) {
        arr[directionNum].sidewalk.splice(0, 1);
        if (key === 'sidewalk' && arr[directionNum].sidewalk.length > 1) {
          arr[directionNum].sidewalk.splice(
            0,
            arr[directionNum].sidewalk.length,
          );
        }
      }
    }
    if (positionChange) positionChange(arr);
  };

  /**
   * ui更改
   * @param value
   * @param key
   */
  const uiConfigFun = (value, key) => {
    const arr = [...position];
    arr[directionNum].uiConfig[key] = value;
    if (positionChange) positionChange(arr);
  };

  /**
   * 添加方位
   * @param params
   */
  const handlePositionOk = (params) => {
    const arr = [...position, params];
    let directionNum = 0;
    let dest = arr.sort((a, b) => {
      return a['positionId'] - b['positionId'];
    });
    dest.forEach((item, index) => {
      if (item.direction === parseInt(params.direction)) {
        directionNum = index;
      }
    });
    if (positionChange) positionChange(dest);
    if (handleChange) handleChange(params.direction, directionNum);
    setVisible(false);
  };

  //===================拖拽代码开始==========================
  const onSortEnd = ({ oldIndex, newIndex }, type) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        [].concat(position[directionNum][type]),
        oldIndex,
        newIndex,
      ).filter((el) => !!el);
      const arr = [...position];
      arr[directionNum][type] = newData;
      arr[directionNum].alongSort = newData.map((item) => item.laneno);
      arr[directionNum].inverseSort = newData.map((item) => item.laneno);
      positionChange && positionChange(arr);
    }
  };

  const DraggableContainer = (props, type) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass={style['row-dragging']}
      onSortEnd={(e) => onSortEnd(e, type)}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }, type) => {
    const index = position[directionNum][type].findIndex((x) => {
      return x.id === restProps['data-row-key'];
    });
    return <SortableItem index={index} {...restProps} type={type} />;
  };
  //===================拖拽结束==========================

  //方位表格列表
  const columns = [
    {
      title: '',
      dataIndex: 'sort',
      width: 50,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: '车道编号',
      render: (value, res, index) => {
        return <span>{res.laneno}</span>;
      },
    },
    {
      title: '类型',
      render: (value, res, index) => {
        const featureValue = feature.find((item) => item.cCode === res.feature);
        return <span>{featureValue?.codeName}</span>;
      },
    },
    {
      title: '车道流向',
      render: (values, res, index) => {
        return <span>{res.movementValue}</span>;
      },
    },
    {
      title: '车道属性',
      render: (values, res, index) => {
        return <span>{res.attributeValue}</span>;
      },
    },
    {
      title: '车道标识',
      render: (value, res, index) => {
        return (
          <img
            style={{ width: 7, height: 25 }}
            src={require(`@/pages/ChannelizationTable/images/${res.movement}.png`)}
            alt={''}
          />
        );
      },
    },
  ];

  //选中方位
  const {
    along = [],
    inverse = [],
    uiConfig = {},
    sidewalk = [],
  } = position.length > 0 && position[directionNum]
    ? position[directionNum]
    : {};

  const {
    x = 0,
    y = 0,
    rotation = 0,
    roadWide = 0,
    roadLength = 450,
  } = uiConfig;

  return (
    <div className={style.position}>
      <Tabs
        className={style.Tabs}
        type={'editable-card'}
        onChange={onChange}
        onEdit={onEdit}
        activeKey={String(activeKey)}
      >
        {position.map((item, index) => {
          const { directionValue, direction } = item;
          return <TabPane tab={directionValue} key={direction} />;
        })}
      </Tabs>
      {position.length > 0 ? (
        <>
          <Row gutter={16}>
            <Col>
              <Form.Item label={`行人道`}>
                <Switch
                  checked={sidewalk.length > 0}
                  onChange={(value) => sidewalkFun(value, 'sidewalk')}
                />
              </Form.Item>
            </Col>
            {sidewalk.length > 0 && (
              <Col linejoin={2}>
                <Form.Item label={`二次过街`}>
                  <Switch
                    checked={sidewalk.length > 1}
                    onChange={(value) => sidewalkFun(value, 'sidewalkTwo')}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>
          <Row gutter={16}>
            <Col>
              <Form.Item label={`正向车道`}>
                <InputNumber
                  min={0}
                  max={10}
                  value={along.length}
                  onChange={(value) => roadChange(value, 'along')}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label={`逆向车道`}>
                <InputNumber
                  min={0}
                  max={10}
                  value={inverse.length}
                  onChange={(value) => roadChange(value, 'inverse')}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <Form.Item label={`坐标X`}>
                <InputNumber
                  value={x}
                  onChange={(value) => uiConfigFun(value, 'x')}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label={`坐标Y`}>
                <InputNumber
                  value={y}
                  onChange={(value) => uiConfigFun(value, 'y')}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label={`角度`}>
                <InputNumber
                  value={rotation}
                  onChange={(value) => uiConfigFun(value, 'rotation')}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label={`道路宽度`}>
                <InputNumber
                  min={10}
                  value={roadWide}
                  onChange={(value) => uiConfigFun(value, 'roadWide')}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label={`道路长度`}>
                <InputNumber
                  min={100}
                  step={20}
                  value={roadLength}
                  onChange={(value) => uiConfigFun(value, 'roadLength')}
                />
              </Form.Item>
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={along}
            pagination={false}
            rowKey={(value) => value.id}
            components={{
              body: {
                wrapper: (e) => DraggableContainer(e, 'along'),
                row: (e) => DraggableBodyRow(e, 'along'),
              },
            }}
          />
          <Table
            style={{ marginTop: 20, minHeight: 200 }}
            bordered
            columns={columns}
            dataSource={inverse}
            pagination={false}
            rowKey={(value) => value.id}
            components={{
              body: {
                wrapper: (e) => DraggableContainer(e, 'inverse'),
                row: (e) => DraggableBodyRow(e, 'inverse'),
              },
            }}
          />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <PositionModal
        visible={visible}
        Cancel={() => setVisible(false)}
        positions={position}
        handlePositionOk={handlePositionOk}
        handleAjax={handleAjax}
        maxLength={maxLength}
        CfgLaneInfo={CfgLaneInfo}
      />
    </div>
  );
};

export default Positions;
