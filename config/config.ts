import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    //设置 node_modules 目录下依赖文件的编译方式。
    type: 'none',
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    baseNavigator: false,
  },
  dva: {},
  routes: [{ path: '/', component: '@/pages/ChannelizationTable' }],
  fastRefresh: {},
});
