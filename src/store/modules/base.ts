/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-04 13:37:39
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-04 13:56:01
 * @FilePath: /react-jike/src/store/modules/base.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSlice } from '@reduxjs/toolkit'
import type { AppDispatch } from '..'
import { getToken } from '@/apis/jike'

interface LoginParams {
  mobile: string
  code: string
  [key: string]: string
}

interface RespTemp {
  data: {
    token: string
    refresh_token: string
  }
  message: string
}


const baseStore = createSlice({
  name: 'base',
  initialState: {
    token: ''
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    }
  }
})

const { setToken } = baseStore.actions


const fetchToken = (formParams: LoginParams) => {
  return async (dispatch: AppDispatch) => {
    const res = await getToken({ ...formParams }) as RespTemp
    const { token } = res.data
    dispatch(setToken(token))
  }
}

const reducer = baseStore.reducer

export {
  setToken,
  fetchToken
}

export default reducer