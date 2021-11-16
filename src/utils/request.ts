/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '服务器找不到请求',
  406: '无法使用请求的内容特性响应请求',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '您的网络发生异常, 连接超时。',
};

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    // @ts-ignore
    const errorText = codeMessage[response.status] || response.statusText;
    message.error(errorText);
  } else if (!response) {
    message.error('您的网络发生异常，无法连接服务器');
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  maxCache: 0,
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  },
  errorHandler,
});

// @ts-ignore
request.interceptors.request.use((url, options) => {
  return {
    options: {
      ...options,
      headers: {},
    },
  };
});

// @ts-ignore
request.interceptors.response.use(async (response) => {
  const status = response.status;

  if (status === 200) {
    return response;
  }
  return response;
});

export default request;
