/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-04 10:43:06
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-04 14:02:42
 * @FilePath: /react-jike/src/pages/Login/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import type { FormProps } from 'antd'
import logo from '@/assets/logo.png'
import { fetchToken } from '@/store/modules/base'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { AppDispatch, RootState } from '@/store'


type LoginForm = {
  mobile: string
  code: string
}

export default function Login() {
  const dispatch: AppDispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.base)
  const navigate = useNavigate()

  const onFinish: FormProps<LoginForm>['onFinish'] = async (values) => {
    await dispatch(fetchToken(values))
    if (token) {
      navigate('/')
      message.success('登录成功')
    }
  };
  return (
    <div>
      <div className="login">
        <Card className="login-container">
          <img className="login-logo" src={logo} alt="" />
          {/* 登录表单 */}
          <Form validateTrigger={['onBlur', 'onChange']} onFinish={onFinish}>
            <Form.Item<LoginForm> name="mobile" rules={[{ required: true, message: '请输入手机号' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不对' }]}>
              <Input size="large" placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item<LoginForm> name="code" rules={[{ required: true, message: '请输入验证码' }]}>
              <Input size="large" placeholder="请输入验证码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}
