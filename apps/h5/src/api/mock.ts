import { request } from '@/app/utils';

export function mockLogin(data) {
  return request({
    url: '/mock/user/login',
    method: 'post',
    data,
  });
}

export function mockFetchUserInfo() {
  return request({
    url: '/mock/user/info',
    method: 'get',
  });
}

export function mockFetchUserList(params = {}) {
  return request({
    url: '/mock/user/list',
    method: 'get',
    params,
  });
}
