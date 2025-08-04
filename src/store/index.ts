/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-04 13:33:45
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-04 13:38:58
 * @FilePath: /react-jike/src/store/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { configureStore } from '@reduxjs/toolkit'
import baseReducer from './modules/base'

const store = configureStore({
  reducer: {
    base: baseReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store