/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-04 13:29:19
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-04 13:44:43
 * @FilePath: /react-jike/src/apis/jike.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { post } from "@/utils/request";

interface LoginParams {
  mobile: string;
  code: string;
}

export function getToken(params: LoginParams) {
  return post('/authorizations', params);
}