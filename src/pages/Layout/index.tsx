/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-04 10:42:44
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-05 11:05:16
 * @FilePath: /react-jike/src/pages/Layout/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Layout, Menu, Popconfirm, message } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/base'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store'
const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]
export default function GeekLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo, token } = useSelector((state: RootState) => state.base)
  const dispatch: AppDispatch = useDispatch()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([location.pathname]) // 添加状态管理选中项

  // 监听路由变化，更新选中菜单项
  useEffect(() => {
    setSelectedKeys([location.pathname])
  }, [location.pathname])
  const menuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  const onConfirm = () => {
    navigate('/login')
    message.success('退出成功')
    dispatch(clearUserInfo())
  }


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo?.name ?? '未知人员'}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKeys}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={menuClick}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}
