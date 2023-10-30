import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://blog.kata.academy/api/';

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
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

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
  async ({ limit, offset, tag }: { limit: number; offset: number; tag?: string }) => {
    const params = { limit, offset, tag };

    return await requestApi('/articles', {}, params);
  }
);
