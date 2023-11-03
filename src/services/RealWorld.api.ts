import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUserDataUpdate } from '../types/api.types';

const baseURL = 'https://blog.kata.academy/api/';
const currentLocalStorage: string | null = localStorage.getItem('persist:MyBlog');
const currentUser: string = JSON.parse(currentLocalStorage!).user;
const userHasToken: string = JSON.parse(currentUser).user.token;

const enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const requestApi = async (
  url: string,
  data: object = {},
  params: object = {},
  method = Method.GET
) => {
  const headers: { [key: string]: string } = {};

  headers['X-Requested-With'] = 'XMLHttpRequest';
  headers['Content-Type'] = 'application/json';
  if (userHasToken !== 'undefined') headers['Authorization'] = `Token ${userHasToken}`;

  const response = await axios.request({
    baseURL,
    url,
    data,
    params,
    method,
    headers,
  });

  if (response.status > 300) {
    throw new Error(`${response.status}`);
  }

  return response;
};

export const fetchAnArticle = createAsyncThunk(
  'async/fetchAnArticle',
  async (slug: string) => {
    return await requestApi(`/articles/${slug}`);
  }
);

export const fetchArticles = createAsyncThunk(
  'async/fetchArticles',
  async ({ limit, offset }: { limit: number; offset: number }) => {
    const params = { limit, offset };

    return await requestApi('/articles', {}, params);
  }
);

export const createUser = createAsyncThunk(
  'async/createUser',
  async (user: { email: string; username: string; password: string }) => {
    return await requestApi('/users', { user }, {}, Method.POST);
  }
);

export const loginUser = createAsyncThunk(
  'async/loginUser',
  async (user: { email: string; password: string }) => {
    return await requestApi('/users/login', { user }, {}, Method.POST);
  }
);

export const updateUser = createAsyncThunk(
  'async/updateUser',
  async (user: IUserDataUpdate) => {
    return await requestApi('/user', { user }, {}, Method.PUT);
  }
);