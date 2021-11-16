import request from '@/utils/request';

//获取渠化数据
export async function info(params: any): Promise<any> {
  return request(`/api/v1/wechat/openId`, {
    method: 'GET',
  });
}
