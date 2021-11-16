import React from 'react';
import { Col, Modal, Row } from 'antd';
import style from '../index.less';
import { attribute } from '../../../pages/ChannelizationTable/data.d';

const IdentificationModal = ({
  visible,
  handleCancel,
  obj: { arrType, type, index, typeIndex }, //对应数据索引 type
  position, //方位数据
  handlePositionChange, //数据刷新
}) => {
  /**
   * 改变标识
   */
  const onClick = (uiId) => {
    const arr = [...position];
    if (type === 'roadSigns') {
      arr[index][arrType][typeIndex].movement = uiId;
      handlePositionChange && handlePositionChange(arr);
      handleCancel(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="请选择标识"
      onCancel={() => handleCancel(false)}
      footer={null}
      className={style.modalComponents}
      style={{ top: 200, left: 290, margin: 0 }}
    >
      <Row gutter={[16, 24]}>
        {type === 'roadSigns' &&
          attribute.map((item) => {
            return (
              <Col key={item.id}>
                <div
                  className={style.identification}
                  onClick={() => onClick(item.cCode)}
                >
                  <img
                    src={require(`@/pages/ChannelizationTable/images/${item.cCode}.png`)}
                    alt={''}
                  />
                </div>
              </Col>
            );
          })}
      </Row>
    </Modal>
  );
};

export default IdentificationModal;
