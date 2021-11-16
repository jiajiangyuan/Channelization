import React from 'react';
import { Form, Input, InputNumber, message, Modal, Select } from 'antd';
import style from '../../index.less';
import { positionArray } from '../../data.d';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

/**
 *
 * @param visible {  是否显示 }
 * @param Cancel { 弹窗关闭 }
 * @param positions { 方位数据 }
 * @param handlePositionOk { 成功回调 }
 * @param positionArr { 后端方位参数 }
 * @param unitId { 道路ID }
 * @returns {JSX.Element}
 * @constructor
 */
const PositionModal = ({
  visible,
  Cancel,
  handlePositionOk,
  positions,
  maxLength,
  CfgLaneInfo,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((value) => {
      const num = value.number;
      const arr = {
        id: 18620,
        direction: positions.length + 1,
        directionValue: value.directionValue,
        roadData: [],
        along: [],
        inverse: [],
        sidewalk: [],
        uiConfig: positionArray[positions.length].uiConfig,
      };

      let index = 0;
      if (num > 0) {
        for (let i = 0; i < num; i++) {
          index = index + 1;
          arr.along.push(newData('along', value, index));
        }
        for (let i = 0; i < num; i++) {
          index = index + 1;
          arr.inverse.push(newData('inverse', value, index));
        }
      }
      if (handlePositionOk) handlePositionOk(arr);
    });
  };
  /**
   * 生成道路数据
   * @param type
   * @param direction
   * @returns {{uiUnitConfig: {isView: null, uiTypeId: number, configCode: number, deviceId: null, uiImageName: null, pTop: number, uiHight: number, uiWidth: number, rotationAngle: number, pLeft: number, uiId: null, unitId: 道路ID, detail: null, id: null}, detectorTwo: {img: string, id: null}, detectorThree: {img: string, id: null}, detectorOne: {img: string, id: null}, cfgLaneInfo: {featureValue: string, feature: number, attributeValue: (string), movementValue: null, laneno: null, unitId: 道路ID, attribute: number, detail: null, id: number, movement: null, direction, directionValue: string}, lamp: {img: string, id: null}, id: number, device: boolean, lampType: number}}
   */
  const newData = (type, direction, index) => {
    return {
      id:
        Math.floor(new Date().getTime() / 1000000) +
        Math.floor(Math.random() * 100),
      laneno: maxLength
        ? maxLength.laneno + index + 1
        : CfgLaneInfo.length + index + 1,
      featureValue: '机动车车道',
      feature: 1,
      attribute: type === 'along' ? 1 : 2,
      attributeValue: type === 'along' ? '进口' : '出口',
      movement: 11,
      movementValue: '直行',
      detail: null,
    };
  };

  return (
    <Modal
      forceRender
      title="添加方位"
      visible={visible}
      onOk={handleOk}
      onCancel={() => Cancel()}
      destroyOnClose={true}
    >
      <Form {...layout} form={form}>
        <Form.Item label="道路名称" name={'directionValue'}>
          <Input placeholder={'道路名称'} />
        </Form.Item>
        <Form.Item initialValue={3} label="道路数量" name={'number'}>
          <InputNumber min={1} max={10} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PositionModal;
