/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-05 09:49:39
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-05 11:34:26
 * @FilePath: /react-jike/src/pages/Home/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useRef, useState } from 'react'
import Chart, { type ChartRef } from '@/components/Echarts'
import * as echarts from 'echarts'

export default function Home() {
  const chartRef = useRef<ChartRef>(null)
  const [chartOption, setChartOption] = useState<echarts.EChartsOption>({})
  useEffect(() => {
    // 示例数据
    const option: echarts.EChartsOption = {
      title: {
        text: '用户访问统计'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150],
          type: 'bar',
          name: '访问量'
        }
      ]
    }

    setChartOption(option)
  }, [])
  return (
    <div style={{ padding: 20 }}>
      <h2>数据统计</h2>
      <div style={{ width: '100%', height: 300 }}>
        <Chart
          ref={chartRef}
          option={chartOption}
          onChartReady={(instance) => {
            console.log('图表初始化完成', instance)
          }}
        />
      </div>
    </div>
  )
}
