/*
 * @Author: tianjingyuan 2297526156@qq.com
 * @Date: 2025-08-05 11:15:13
 * @LastEditors: tianjingyuan 2297526156@qq.com
 * @LastEditTime: 2025-08-05 14:49:27
 * @FilePath: /react-jike/src/components/Echarts.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'

interface ChartProps {
  option: echarts.EChartsOption
  style?: React.CSSProperties
  className?: string
  onChartReady?: (instance: EChartsType) => void
  onEvents?: Record<string, (params: echarts.ECElementEvent) => void>
}

export interface ChartRef {
  getInstance: () => EChartsType | undefined
  setOption: (option: echarts.EChartsOption, notMerge?: boolean) => void
}

const Chart = forwardRef<ChartRef, ChartProps>((props, ref) => {
  const { option, style, className, onChartReady, onEvents } = props
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<EChartsType>(null)

  // 初始化图表
  useEffect(() => {
    if (chartRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current)
      onChartReady?.(chartInstanceRef.current)

      // 绑定事件
      if (onEvents) {
        Object.keys(onEvents).forEach(eventName => {
          chartInstanceRef.current?.on(eventName, onEvents[eventName])
        })
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose()
        chartInstanceRef.current = null
      }
    }
  }, [])

  // 更新图表配置
  useEffect(() => {
    if (chartInstanceRef.current && option) {
      chartInstanceRef.current.setOption(option, true)
    }
  }, [option])

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    getInstance: () => chartInstanceRef.current ?? undefined,
    setOption: (newOption: echarts.EChartsOption, notMerge = false) => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.setOption(newOption, notMerge)
      }
    }
  }))

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%', ...style }}
      className={className}
    />
  )
})

export default Chart