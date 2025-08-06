/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-04 13:29:19
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-06 09:38:51
 * @FilePath: /react-jike/src/apis/jike.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { post, get } from "@/utils/request";

interface LoginParams {
  mobile: string;
  code: string;
}

export function getToken(params: LoginParams) {
  return post('/authorizations', params);
}


export function getUserInfo() {
  return get('/user/profile');
}

export function getChannelOptions() {
  return get('/channels');
}

interface ArticleParams {
  id?: string;
  title?: string;
  content?: string;
  cover?: {
    type: number;
    images: string[];
  };
  channel_id?: string;
  type?: number;
}

export function saveArticle(params: ArticleParams) {
  return post('/mp/articles?draft=false', params);
}

interface ArticleListParams {
  page?: number;
  per_page?: number;
  begin_pubdate?: string
  end_pubdate?: string
  status?: string,
  channel_id?: string
}

export function getArticleList(params?: ArticleListParams) {
  return get('/mp/articles', params)
}

export function getArticleById(id: string) {
  return get(`/mp/articles/${id}`)
}