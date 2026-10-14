import request from './index';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams extends LoginParams {
  email: string;
}

// 用户登录
export const login = (data: LoginParams) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  });
};

// 用户注册
export const register = (data: RegisterParams) => {
  return request({
    url: '/auth/register',
    method: 'post',
    data,
  });
};

// 获取用户信息
export const getUserInfo = (userId: number) => {
  return request({
    url: `/users/${userId}`,
    method: 'get',
  });
};

// 更新用户信息
export const updateUserInfo = (userId: number, data: Partial<User>) => {
  return request({
    url: `/users/${userId}`,
    method: 'put',
    data,
  });
};

// 获取用户列表
export const getUserList = (params?: { page: number; limit: number }) => {
  return request({
    url: '/users',
    method: 'get',
    params,
  });
};
