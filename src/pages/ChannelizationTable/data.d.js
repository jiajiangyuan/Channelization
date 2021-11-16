//方位默认值
export const positionArray = [
  {
    value: '北',
    uiConfig: {
      height: 0,
      offset: { x: 0, y: 0 },
      rotation: 270,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 650,
      y: 530,
      radianX: 970, //弧度
      radianY: 560,
      roadWide: 35, // 道路宽
      roadLength: 400, //道路长度
      sidewalk: true, //人行道
      sidewalkTwo: false, //人行道二次过街
    },
    checked: false,
  },
  {
    value: '东北',
    uiConfig: {
      height: 0,
      offset: { x: 0, y: 0 },
      rotation: 315,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 896,
      y: 532,
      radianX: 1000,
      radianY: 670,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true, //人行道
      sidewalkTwo: false, //人行道二次过街
    },
    checked: false,
  },
  {
    value: '东',
    uiConfig: {
      height: 0,
      offset: { x: 0, y: 0 },
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 1060,
      y: 650,
      radianX: 1000,
      radianY: 1000,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true, //人行道
      sidewalkTwo: false, //人行道二次过街
    },
    checked: false,
  },
  {
    value: '东南',
    uiConfig: {
      height: 0,
      offset: { x: 0, y: 0 },
      rotation: 45,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 1150,
      y: 1000,
      radianX: 880,
      radianY: 1160,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true, //人行道
      sidewalkTwo: false, //人行道二次过街
    },
    checked: false,
  },
  {
    value: '南',
    uiConfig: {
      height: 0,
      offset: { x: 0, y: 0 },
      rotation: 90,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 880,
      y: 950,
      radianX: 610,
      radianY: 1000,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true, //人行道
      sidewalkTwo: false, //人行道二次过街
    },
    checked: false,
  },
  {
    value: '西南',
    uiConfig: {
      height: 0,
      offset: { x: 0, y: 0 },
      rotation: 135,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 550,
      y: 1200,
      radianX: 380,
      radianY: 1020,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true, //人行道
      sidewalkTwo: false, //人行道二次过街
    },
    checked: false,
  },
  {
    value: '西',
    uiConfig: {
      height: 0,
      offset: { x: 0, y: 0 },
      rotation: 180,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 520,
      y: 950,
      radianX: 580,
      radianY: 560,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true, //人行道
      sidewalkTwo: false, //人行道二次过街
    },
    checked: false,
  },
  {
    value: '西北',
    uiConfig: {
      height: 0,
      offset: { x: 0, y: 0 },
      rotation: 225,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 350,
      y: 550,
      radianX: 560,
      radianY: 380,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true, //人行道
      sidewalkTwo: false, //人行道二次过街
    },
    checked: false,
  },
];

export const channel = [
  {
    id: 18621,
    direction: 1,
    directionValue: '道路1',
    roadData: [],
    along: [
      {
        id: 1636998,
        laneno: 2,

        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1636973,
        laneno: 3,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1636997,
        laneno: 4,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    inverse: [
      {
        id: 1636985,
        laneno: 5,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637049,
        laneno: 6,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637057,
        laneno: 7,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    sidewalk: [
      {
        id: 1637087,
        laneno: 64,
        feature: null,
        attribute: null,
        attributeValue: null,
        movement: 39,
        movementValue: '人行道',
        detail: null,
      },
      {
        id: 1637102,
        laneno: 65,
        feature: null,
        attribute: null,
        attributeValue: null,
        movement: 39,
        movementValue: '人行道',
        detail: null,
      },
    ],
    uiConfig: {
      height: 0,
      offset: {
        x: 0,
        y: 0,
      },
      rotation: 270,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 645,
      y: 492,
      radianX: 857,
      radianY: 482,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true,
      sidewalkTwo: false,
    },
  },
  {
    id: 18622,
    direction: 2,
    directionValue: '道路2',
    roadData: [],
    along: [
      {
        id: 1637101,
        laneno: 9,
        feature: 4,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637071,
        laneno: 10,
        feature: 5,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637103,
        laneno: 11,
        feature: 6,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    inverse: [
      {
        id: 1637084,
        laneno: 12,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637032,
        laneno: 13,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637036,
        laneno: 14,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    sidewalk: [
      {
        id: 1637052,
        laneno: 63,
        feature: null,
        attribute: null,
        attributeValue: null,
        movement: 39,
        movementValue: '人行道',
        detail: null,
      },
      {
        id: 1637123,
        laneno: 66,
        feature: null,
        attribute: null,
        attributeValue: null,
        movement: 39,
        movementValue: '人行道',
        detail: null,
      },
    ],
    uiConfig: {
      height: 0,
      offset: {
        x: 0,
        y: 0,
      },
      rotation: 315,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 864,
      y: 496,
      radianX: 997,
      radianY: 641,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true,
      sidewalkTwo: false,
    },
  },
  {
    id: 18623,
    direction: 3,
    directionValue: '道路3',
    roadData: [],
    along: [
      {
        id: 1637057,
        laneno: 16,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637054,
        laneno: 17,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637035,
        laneno: 18,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    inverse: [
      {
        id: 1637057,
        laneno: 19,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637041,
        laneno: 20,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637120,
        laneno: 21,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    sidewalk: [
      {
        id: 1637112,
        laneno: 62,
        feature: null,
        attribute: null,
        attributeValue: null,
        movement: 39,
        movementValue: '人行道',
        detail: null,
      },
    ],
    uiConfig: {
      height: 0,
      offset: {
        x: 0,
        y: 0,
      },
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 1012,
      y: 653,
      radianX: 1018,
      radianY: 866,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true,
      sidewalkTwo: false,
    },
  },
  {
    id: 18624,
    direction: 4,
    directionValue: '道路4',
    roadData: [],
    along: [
      {
        id: 1637118,
        laneno: 23,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637060,
        laneno: 24,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637054,
        laneno: 25,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    inverse: [
      {
        id: 1637033,
        laneno: 26,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637102,
        laneno: 27,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637100,
        laneno: 28,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    sidewalk: [
      {
        id: 1637059,
        laneno: 61,
        feature: null,
        attribute: null,
        attributeValue: null,
        movement: 39,
        movementValue: '人行道',
        detail: null,
      },
    ],
    uiConfig: {
      height: 0,
      offset: {
        x: 0,
        y: 0,
      },
      rotation: 45,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 1010,
      y: 869,
      radianX: 860,
      radianY: 1023,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true,
      sidewalkTwo: false,
    },
  },
  {
    id: 18625,
    direction: 5,
    directionValue: '道路5',
    roadData: [],
    along: [
      {
        id: 1637028,
        laneno: 30,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637068,
        laneno: 31,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637095,
        laneno: 32,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    inverse: [
      {
        id: 1637123,
        laneno: 33,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637104,
        laneno: 34,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637072,
        laneno: 35,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    sidewalk: [
      {
        id: 1637096,
        laneno: 60,
        feature: null,
        attribute: null,
        attributeValue: null,
        movement: 39,
        movementValue: '人行道',
        detail: null,
      },
    ],
    uiConfig: {
      height: 0,
      offset: {
        x: 0,
        y: 0,
      },
      rotation: 90,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 855,
      y: 1017,
      radianX: 634,
      radianY: 1021,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true,
      sidewalkTwo: false,
    },
  },
  {
    id: 18626,
    direction: 6,
    directionValue: '道路6',
    roadData: [],
    along: [
      {
        id: 1637041,
        laneno: 37,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637072,
        laneno: 38,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637125,
        laneno: 39,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    inverse: [
      {
        id: 1637119,
        laneno: 40,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637044,
        laneno: 41,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637107,
        laneno: 42,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    sidewalk: [
      {
        id: 1637041,
        laneno: 59,
        feature: null,
        attribute: null,
        attributeValue: null,
        movement: 39,
        movementValue: '人行道',
        detail: null,
      },
    ],
    uiConfig: {
      height: 0,
      offset: {
        x: 0,
        y: 0,
      },
      rotation: 135,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 632,
      y: 1020,
      radianX: 492,
      radianY: 860,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true,
      sidewalkTwo: false,
    },
  },
  {
    id: 18628,
    direction: 7,
    directionValue: '道路7',
    roadData: [],
    along: [
      {
        id: 1637060,
        laneno: 44,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637038,
        laneno: 45,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637102,
        laneno: 46,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    inverse: [
      {
        id: 1637071,
        laneno: 47,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637046,
        laneno: 48,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637070,
        laneno: 49,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    sidewalk: [
      {
        id: 1637099,
        laneno: 58,
        feature: null,
        attribute: null,
        attributeValue: null,
        movement: 39,
        movementValue: '人行道',
        detail: null,
      },
    ],
    uiConfig: {
      height: 0,
      offset: {
        x: 0,
        y: 0,
      },
      rotation: 180,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 489,
      y: 860,
      radianX: 487,
      radianY: 653,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true,
      sidewalkTwo: false,
    },
  },
  {
    id: 18629,
    direction: 8,
    directionValue: '道路8',
    roadData: [],
    along: [
      {
        id: 1637053,
        laneno: 51,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637084,
        laneno: 52,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637035,
        laneno: 53,
        feature: 1,
        attribute: 1,
        attributeValue: '进口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    inverse: [
      {
        id: 1637048,
        laneno: 54,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637116,
        laneno: 55,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
      {
        id: 1637087,
        laneno: 56,
        feature: 1,
        attribute: 2,
        attributeValue: '出口',
        movement: 11,
        movementValue: '直行',
        detail: null,
      },
    ],
    sidewalk: [
      {
        id: 1637124,
        laneno: 57,
        feature: null,
        attribute: null,
        attributeValue: null,
        movement: 39,
        movementValue: '人行道',
        detail: null,
      },
    ],
    uiConfig: {
      height: 0,
      offset: {
        x: 0,
        y: 0,
      },
      rotation: 225,
      scaleX: 1,
      scaleY: 1,
      width: 0,
      x: 492,
      y: 643,
      radianX: 636,
      radianY: 493,
      roadWide: 35,
      roadLength: 400,
      sidewalk: true,
      sidewalkTwo: false,
    },
  },
];

export const featureType = [
  {
    cCode: 1,
    codeName: '进口',
  },
  {
    cCode: 2,
    codeName: '出口',
  },
  {
    cCode: 9,
    codeName: '其它',
  },
];

//车道类型
export const feature = [
  {
    cCode: 1,
    codeName: '机动车车道',
  },
  {
    cCode: 2,
    codeName: '非机动车车道',
  },
  {
    cCode: 3,
    codeName: '机非混合车道',
  },
  {
    cCode: 4,
    codeName: '可变车道',
  },
  {
    cCode: 5,
    codeName: '公交车道',
  },
  {
    cCode: 6,
    codeName: '潮汐车道',
  },
  {
    cCode: 9,
    codeName: '其它',
  },
];

//道路类型
export const attribute = [
  {
    cCode: 11,
    codeName: '直行',
  },
  {
    cCode: 12,
    codeName: '左转',
  },
  {
    cCode: 13,
    codeName: '右转',
  },
  {
    cCode: 21,
    codeName: '直左混行',
  },
  {
    cCode: 22,
    codeName: '直右混行',
  },
  {
    cCode: 23,
    codeName: '左右混行',
  },
  {
    cCode: 24,
    codeName: '直左右混行',
  },
  {
    cCode: 31,
    codeName: '掉头',
  },
  {
    cCode: 99,
    codeName: '非机动车',
  },
  {
    cCode: 35,
    codeName: '左直掉',
  },
  {
    cCode: 36,
    codeName: '左右掉',
  },
  {
    cCode: 37,
    codeName: '直右掉',
  },
  {
    cCode: 38,
    codeName: '左直右掉',
  },
  {
    cCode: 42,
    codeName: '直掉',
  },
  {
    cCode: 43,
    codeName: '左掉',
  },
  {
    cCode: 44,
    codeName: '右掉',
  },
];
