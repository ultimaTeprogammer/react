

import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  type RadioChangeEvent
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { saveArticle } from '@/apis/jike';
import { Link, useSearchParams } from 'react-router-dom'
import type { FormProps } from 'antd';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getArticleById } from '@/apis/jike';

import './index.scss'
import { useEffect, useState } from 'react';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import useChannel from '@/hook/useChannel';

const { Option } = Select

type FieldType = {
  title: string;
  content: string;
  channel_id: string
};

type ArticleParams = {
  data: {
    id: string
    pub_date: string
    title: string
    cover: {
      type: number
      images: string[]
    }
    content: string
    channel_id: string
  }
}

export default function Publish() {
  const { options } = useChannel()

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { title, content, channel_id } = values
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map(item => item?.response?.data?.url)
      },
      channel_id
    }
    const res = await saveArticle({ ...reqData })
    console.log(res)
  };

  const [imageList, setImageList] = useState<UploadFile[]>([]);

  const onUploadChange = (info: UploadChangeParam<UploadFile>) => {
    setImageList(info.fileList);
  };
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e: RadioChangeEvent) => {
    setImageType(e.target.value)
  }
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [form] = Form.useForm()
  useEffect(() => {
    const getArticleDetail = async () => {
      if (articleId) {
        const res = await getArticleById(articleId) as ArticleParams
        form.setFieldsValue({
          ...res.data,
          type: res.data.cover.type
        })
        setImageType(res.data.cover.type)
        setImageList(res.data.cover.images.map((url) => ({
          uid: String(Math.random()),
          name: 'image.png',          // 可选默认名称
          url,
        })))
      }
    }
    getArticleDetail()
  }, [articleId, form])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          validateTrigger={['onBlur', 'onChange']}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {options.map(item => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 &&
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                onChange={onUploadChange}
                maxCount={imageType}
                multiple={imageType > 1}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              theme='snow'
              className='publish-quill'
              placeholder='请输入文章内容'
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
