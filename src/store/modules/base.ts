/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-04 13:37:39
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-05 10:44:53
 * @FilePath: /react-jike/src/store/modules/base.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSlice } from '@reduxjs/toolkit'
import type { AppDispatch } from '..'
import { getToken, getUserInfo } from '@/apis/jike'
import { setTokenKey, getTokenKey, removeToken } from '@/utils/token'

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

export interface UserInfoInterface {
  id?: string
  photo?: string
  name?: string
  mobile?: string
  birthday?: string
  gender?: number | string
}


const baseStore = createSlice({
  name: 'base',
  initialState: {
    token: getTokenKey() ?? '',
    userInfo: {
      name: ''
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      setTokenKey(action.payload)
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {
        name: ''
      }
      removeToken()
    }
  }
})

const { setToken, setUserInfo, clearUserInfo } = baseStore.actions


const fetchToken = (formParams: LoginParams) => {
  return async (dispatch: AppDispatch) => {
    const res = await getToken({ ...formParams }) as RespTemp
    const { token } = res.data
    dispatch(setToken(token))
  }
}
interface UserResp {
  data: {
    id: string
    photo: string
    name: string
    mobile: string
    birthday: string
    gender: number | string
  },
  message: string
}
const fetchUserInfo = () => {
  return async (dispatch: AppDispatch) => {
    const res = await getUserInfo() as UserResp
    dispatch(setUserInfo(res.data))
  }
}

const reducer = baseStore.reducer

export {
  setToken,
  fetchToken,
  fetchUserInfo,
  clearUserInfo
}

export default reducer