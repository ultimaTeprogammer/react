/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-05 09:49:56
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-06 09:29:05
 * @FilePath: /react-jike/src/pages/Article/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import useChannel from '@/hook/useChannel'

// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import { getArticleList } from '@/apis/jike'



interface ArticleItem {
  id: string
}

const { Option } = Select
const { RangePicker } = DatePicker
export default function Article() {
  const navigate = useNavigate()
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover: { images: string[] }) => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: () => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: (data: { id: string }) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]
  const [article, setArticleList] = useState<{ list: ArticleItem[], count: number }>({
    list: [],
    count: 0
  })

  const [params, setParams] = useState({
    page: 1,
    per_page: 4,
    begin_pubdate: '',
    end_pubdate: '',
    status: '',
    channel_id: ''
  })
  const { options } = useChannel()
  useEffect(() => {
    const getList = async () => {
      const res = await getArticleList(params) as { data: { results: ArticleItem[], total_count: number } }
      const { results, total_count } = res.data
      setArticleList({
        list: results,
        count: total_count
      })
    }
    getList()
  }, [params])
  const onPaginationChange = (page: number) => {
    setParams({
      ...params,
      page
    })
  }


  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 180 }}
            >
              {options.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
        <Table
          rowKey="id"
          dataSource={article.list}
          columns={columns}
          pagination={
            {
              total: article.count,
              pageSize: params.per_page,
              onChange: onPaginationChange,
            }
          }
        />
      </Card>
    </div>
  )
}
