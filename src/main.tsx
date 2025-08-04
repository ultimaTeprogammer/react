/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-04 10:15:41
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-04 13:39:24
 * @FilePath: /react-jike/src/main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import router from '@/router'
import store from '@/store'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* <App /> */}
  </StrictMode>,
)
