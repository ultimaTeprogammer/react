/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-04 14:15:01
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-04 14:20:02
 * @FilePath: /react-jike/src/utils/token.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const TOKENKEY = 'token'
function setTokenKey(token: string) {
  localStorage.setItem(TOKENKEY, token)
}

function getTokenKey() {
  return localStorage.getItem(TOKENKEY)
}

function removeToken() {
  localStorage.removeItem(TOKENKEY)
}

export {
  setTokenKey,
  getTokenKey,
  removeToken,
  TOKENKEY
}