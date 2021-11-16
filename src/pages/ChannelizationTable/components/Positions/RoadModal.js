import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { attribute, feature, featureType } from '../../data.d';
const Option = Select.Option;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const RoadModal = ({
  visible,
  cancel,
  data,
  directionNum,
  position,
  handlePositionChange,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data && JSON.stringify(data) !== '{}') {
      form.setFieldsValue({ ...data });
    } else {
      form.setFieldsValue({
        direction: 1,
        attribute: '',
        movement: '',
        feature: '',
      });
    }
  }, [data]);

  const handleOk = () => {
    form.validateFields().then((value) => {
      const obj = {
        ...data,
        ...value,
      };
      const arr = position.map((item, index) => {
        if (directionNum === index) {
          const along = item.along.map((value) => {
            if (value.laneno === obj.laneno) {
              return obj;
            }
            return value;
          });

          const inverse = item.inverse.map((value) => {
            if (value.laneno === obj.laneno) {
              return obj;
            }
            return value;
          });

          return {
            ...item,
            along,
            inverse,
          };
        }
        return item;
      });

      handlePositionChange && handlePositionChange(arr);
      cancel && cancel('road');
    });
  };

  return (
    <Modal
      forceRender
      title="道路信息"
      visible={visible}
      onOk={handleOk}
      onCancel={() => cancel('road')}
    >
      <Form {...layout} form={form}>
        <Form.Item label="车道类型" name={'feature'}>
          <Select>
            {feature.map((item) => {
              return (
                <Option value={item.cCode} key={item.cCode}>
                  {item.codeName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="车道流向" name={'movement'}>
          <Select placeholder="车道流向">
            {attribute.map((item) => {
              return (
                <Option value={item.cCode} key={item.cCode}>
                  {item.codeName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoadModal;
