// 引入mockjs
const Mock = require('mockjs')

// 设备-电场
Mock.mock('/mainPage/map/axiosGetElectricFieldStations', (req, res) => {
  const data = [
    {
      num: 'CH010',
      devicename: '岳阳站',
      latitude: 28.3769,
      longitude: 111.2462,
      elevation: null,
      manufaceture: null,
      installtime: '2010-12-16T16:00:00.000+00:00',
      lastinspect: '2010-12-16T16:00:00.000+00:00',
      lastrepair: '2010-12-16T16:00:00.000+00:00',
      cityid: '',
      status: '0',
      lastalarmtime: '2010-12-16T16:00:00.000+00:00',
      laststatustime: '2010-12-16T16:00:00.000+00:00',
      efvalue: null,
      alarmlevel: null,
      version: '',
      correction: null,
      seconddata: null,
      changerate1: null,
      changerate2: null,
      province: '430000',
      district: null,
      country: null,
      correction2: 0,
      statusStr: '停运（大于6小时无数据）'
    },
    {
      num: 'CH011',
      devicename: '岳阳站2',
      latitude: 28.9269,
      longitude: 111.6862,
      elevation: null,
      manufaceture: null,
      installtime: '2010-12-16T16:00:00.000+00:00',
      lastinspect: '2010-12-16T16:00:00.000+00:00',
      lastrepair: '2010-12-16T16:00:00.000+00:00',
      cityid: '',
      status: '1',
      lastalarmtime: '2010-12-16T16:00:00.000+00:00',
      laststatustime: '2010-12-16T16:00:00.000+00:00',
      efvalue: null,
      alarmlevel: null,
      version: '',
      correction: null,
      seconddata: null,
      changerate1: null,
      changerate2: null,
      province: '430000',
      district: null,
      country: null,
      correction2: 0,
      statusStr: '停运（大于6小时无数据）'
    }
  ]
  return data
})

// 设备-闪电
Mock.mock('/mainPage/map/axiosGetThunderStations', (req, res) => {
  const data = [
    {
      id: 73,
      num: '57669',
      devicename: '安化站',
      latitude: 29.3769,
      longitude: 110.2462,
      elevation: 0.2,
      manufaceture: 'HYDF',
      installtime: '2021-01-4T16:00:00.000+00:00',
      cityid: '0',
      status: '1',
      laststatustime: '2021-01- 21T07:05:58.000+00:00',
      version: 'DDW1',
      height: 1.5,
      province: '430000',
      district: ' ',
      country: ' ',
      statusStr: '正常'
    },
    {
      id: 73,
      num: '57669',
      devicename: '安化2站',
      latitude: 29.9769,
      longitude: 110.6462,
      elevation: 0.2,
      manufaceture: 'HYDF',
      installtime: '2021-01-4T16:00:00.000+00:00',
      cityid: '0',
      status: '0',
      laststatustime: '2021-01- 21T07:05:58.000+00:00',
      version: 'DDW1',
      height: 1.5,
      province: '430000',
      district: ' ',
      country: ' ',
      statusStr: '正常'
    }
  ]
  return data
})

// 雷电-散点
Mock.mock('/mainPage/map/axiosGetLightningScatter', (req, res) => {
  const data = {
    '2021-03-13T22:00:00': [
      {
        id: 921771,
        longtitude: 113.0712,
        latitude: 26.1774,
        datetime: '2020-01- 21T16:40:12.000+00:00',
        slope: 0,
        intens: -15.86,
        location: '',
        hour: 0,
        minute: 40,
        second: 12,
        minisecond: 7333403,
        error: null,
        province: '湖南省',
        district: '郴州 市',
        country: '宜章县',
        usdids: '6;7;1;2;4',
        height: 2.21,
        flashflag: null,
        inputtime: '2020-01- 21T16:41:11.000+00:00',
        typeName: '负闪',
        polarityType: '2'
      }
    ],
    '2021-03-13T23:00:00': [
      {
        id: 921771,
        longtitude: 113.0712,
        latitude: 26.1774,
        datetime: '2020-01- 21T16:40:12.000+00:00',
        slope: 0,
        intens: -15.86,
        location: '',
        hour: 0,
        minute: 40,
        second: 12,
        minisecond: 7333403,
        error: null,
        province: '湖南省',
        district: '郴州 市',
        country: '宜章县',
        usdids: '6;7;1;2;4',
        height: 2.21,
        flashflag: null,
        inputtime: '2020-01- 21T16:41:11.000+00:00',
        typeName: '正闪',
        polarityType: '2'
      }
    ]
  }
  return data
})

// 电场-色斑图
Mock.mock('/mainPage/map/axiosGetElectricFieldPattern', (req, res) => {
  const data = {
    '2021-03-13T22:00:00': {
      text: '雷电密度',
      url: '/common/file/getImage/8ce8f987-130a-4702-8cd3-951756f72e2a',
      area: [
        [
          108.8086,
          24.6533
        ],
        [
          114.2578,
          30.1465
        ]
      ]
    },
    '2021-03-13T23:00:00': {
      text: '雷电密度',
      url: '/common/file/getImage/8ce8f987-130a-4702-8cd3-951756f72e2a',
      area: [
        [
          108.8086,
          24.6533
        ],
        [
          114.2578,
          30.1465
        ]
      ]
    }
  }
  return data
})

// 组合反射率-色斑图
Mock.mock('/mainPage/map/axiosGetRadarPuzzle', (req, res) => {
  const data = {
    '2021-03-13T22:00:00': {
      text: '组合反射率拼图',
      url: '/common/file/getImage/8ce8f987-130a-4702-8cd3-951756f72e2a',
      area: [
        [
          108.8086,
          24.6533
        ],
        [
          114.2578,
          30.1465
        ]
      ]
    },
    '2021-03-13T23:00:00': {
      text: '雷电密度',
      url: '/common/file/getImage/8ce8f987-130a-4702-8cd3-951756f72e2a',
      area: [
        [
          108.8086,
          24.6533
        ],
        [
          114.2578,
          30.1465
        ]
      ]
    }
  }
  return data
})

// 统计-电场曲线和散点图
Mock.mock('/mainPage/map/axiosGetElectricChartData', (req, res) => {
  const data = {
    dataX: [
      '2018-04-15 14:35',
      '2018-04-15 15:35',
      '2018-04-15 16:35'
    ],
    dataY1: [
      [
        0,
        12
      ],
      [
        1,
        5
      ],
      [
        2,
        8
      ]
    ],
    dataY2: [
      [
        0,
        52.06,
        1
      ],
      [
        1,
        15.06,
        0
      ],
      [
        2,
        25.06,
        2
      ]
    ]
  }
  return data
})

// 统计-雷电数量
Mock.mock('/mainPage/detail2/axiosGetLightningFrequencyChartTable', (req, res) => {
  const data = {
    chartData: {
      dataX: [
        '10', '11', '12', '13', '14', '15', '16'
      ],
      dataY1: [
        5
      ],
      dataY2: [
        2
      ],
      dataY3: [7, 9, 5, 4, 2, 6, 11]
    },
    tableData: [
      {
        id: '1',
        date: '1',
        positiveFlash: '5',
        negativeFlash: '2',
        totalFlash: '7',
        positiveFlashRate: '71.43',
        negativeFlashRate: '28.57'
      }
    ]
  }
  return data
})

// 预警-预警色斑图
Mock.mock('/warning/map/axiosGetWarningProduct', (req, res) => {
  const data = {
    '2021-03-13T22:00:00': {
      text: '预警产品',
      url: '/common/file/getImage/8ce8f987-130a-4702-8cd3-951756f72e2a',
      area: [
        [
          108.8086,
          24.6533
        ],
        [
          114.2578,
          30.1465
        ]
      ]
    },
    '2021-03-13T23:00:00': {
      text: '预警产品',
      url: '/common/file/getImage/8ce8f987-130a-4702-8cd3-951756f72e2a',
      area: [
        [
          108.8086,
          24.6533
        ],
        [
          114.2578,
          30.1465
        ]
      ]
    }
  }
  return data
})
