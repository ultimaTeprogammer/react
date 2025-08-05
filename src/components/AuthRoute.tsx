/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-05 09:21:44
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-05 09:25:08
 * @FilePath: /react-jike/src/components/AuthRoute.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 封装高阶组件

import { getTokenKey } from "@/utils/token";
import { Navigate } from "react-router-dom";
import React from "react";

// 核心逻辑: 有token 正常跳转 无token跳转到登录页面
export function AuthRoute({ children }: { children: React.ReactNode }) {
  const token = getTokenKey()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" />
  }
}