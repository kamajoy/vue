<template>
  <div>
    <div id="chart-bar" style="width: 100%;height: 600px" />
    <div id="status-bar" style="width: 100%;height: 600px" />
    <div id="name-bar" style="width: 100%;height: 600px" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'

const carList = {
  data: ['一大队', '二大队', '三大队', '四大队', '五大队', '六大队', '丹江口市队', '房县大队',
    '邵阳去大队', '竹山县大队', '绍西县大队', '竹溪县大队']
}

const drawEchartBar = () => {
  const echartBarDom = document.getElementById('chart-bar')
  const echartBar = echarts.init(echartBarDom)
  const option = {
    color: ['#31c35d', '#3ea2ff'],
    title: {
      text: '车辆统计'
    },
    tooltip: { // 提示框组件
      trigger: 'item'
      // trigger: 'axis',
      // axisPointer: {
      //   type: 'shadow'
      // }
    },
    legend: {
      data: [
        { name: '小型汽车' },
        { name: '大型汽车' }
      ]
    },
    xAxis: {
      type: 'category',
      data: ['一大队', '二大队', '三大队', '四大队', '五大队', '六大队', '丹江口市队', '房县大队',
        '邵阳去大队', '竹山县大队', '绍西县大队', '竹溪县大队'],
      axisLabel: {
        interval: 0,
        formatter(value) {
          let ret = ''
          const maxLength = 3
          const rowNum = Math.ceil(value.length / maxLength)

          if (rowNum > 1) {
            for (let i = 0; i < rowNum; i++) {
              let temp = ''
              const start = i * maxLength
              const end = start + maxLength

              temp = value.substring(start, end) + '\n'
              ret += temp
            }
            return ret
          } else {
            return value
          }
        }
      },
      axisTick: {
        alignWithLabel: true,
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '小型汽车',
        type: 'bar',
        data: [96, 89, 236, 452, 123, 56, 68, 89, 126, 123, 453, 85],
        barGap: 0,
        barWidth: 30,
        label: {
          normal: {
            show: 'true',
            position: 'top'
          }
        }
      },
      {
        name: '大型汽车',
        type: 'bar',
        data: [66, 119, 136, 552, 223, 106, 50, 109, 186, 128, 483, 85],
        barGap: 0,
        barWidth: 30,
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        }
      }
    ]
  }
  echartBar.setOption(option)
}

const drawEchartStatus = () => {
  const echartBarDom = document.getElementById('status-bar')
  const echartBar = echarts.init(echartBarDom)
  const option = {
    color: ['#3ea2ff', '#334b5c', '#6ab0b8', '#e98f6f', '#9fdabf'],
    title: {
      text: '车牌的状态'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      // 堆叠图中显示具体的百分比
      formatter(params) {
        let relVal = params[0].name
        let value = 0
        for (let i = 0; i < params.length; i++) {
          value += params[i].value
        }
        for (let i = 0; i < params.length; i++) {
          relVal += `<br/>${params[i].seriesName}: ${(100 * parseFloat(params[i].value) / parseFloat(value)).toFixed(2)}%(${params[i].value})`

        }
        return relVal
      }
    },
    legend: {
      data: [
        {
          name: '正常'
        },
        {
          name: '注销'
        },
        {
          name: '转出'
        },
        {
          name: '停驶'
        },
        {
          name: '被盗抢'
        }
      ]
    },
    xAxis: {
      type: 'category',
      data: ['一大队', '二大队', '三大队', '四大队', '五大队', '六大队', '丹江口市队', '房县大队', '邵阳去大队', '竹山县大队', '绍西县大队', '竹溪县大队'],
      axisLabel: {
        interval: 0,
        formatter(value) {
          let ret = ''
          const maxLength = 3
          const rowNum = Math.ceil(value.length / maxLength)

          if (rowNum > 1) {
            for (let i = 0; i < rowNum; i++) {
              let temp = ''
              const start = i * maxLength
              const end = start + maxLength

              temp = value.substring(start, end) + '\n'
              ret += temp
            }
            return ret
          } else {
            return value
          }
        }
      },
      axisTick: {
        alignWithLabel: true,
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '正常',
        type: 'bar',
        stack: '总量',
        data: [96, 189, 176, 252, 293, 146, 150, 189, 116, 178, 283, 185],
        barWidth: 60,
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      },
      {
        name: '注销',
        type: 'bar',
        stack: '总量',
        data: [2, 10, 1, 8, 3, 16, 11, 19, 6, 8, 2, 5],
        barWidth: 60,
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      },
      {
        name: '转出',
        type: 'bar',
        stack: '总量',
        data: [2, 10, 1, 8, 3, 16, 11, 19, 6, 8, 2, 5],
        barWidth: 60,
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      },
      {
        name: '停驶',
        type: 'bar',
        stack: '总量',
        data: [2, 10, 1, 8, 3, 16, 11, 19, 6, 8, 2, 5],
        barWidth: 60,
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      },
      {
        name: '被盗抢',
        type: 'bar',
        stack: '总量',
        data: [2, 10, 1, 8, 3, 16, 11, 19, 6, 8, 2, 5],
        barWidth: 60,
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      }
    ]
  }
  echartBar.setOption(option)
}

const drawEchartName = () => {
  const echartBarDom = document.getElementById('name-bar')
  const echartBar = echarts.init(echartBarDom)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      data: ['小王', '小李', '小赵', '小马', '小刘', '小张', '小齐'],
      splitLine: { show: false },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      offset: 10,
      nameTextStyle: {
        fontSize: 15
      }
    },
    series: [
      {
        name: '数量',
        type: 'bar',
        data: [3100, 2142, 1218, 581, 431, 383, 163],
        barWidth: 14,
        barGap: 10,
        smooth: true,
        label: {
          normal: {
            show: true,
            position: 'right',
            offset: [5, -2],
            textStyle: {
              color: '#F68300',
              fontSize: 13
            }
          }
        },
        itemStyle: {
          emphasis: {
            barBorderRadius: 7
          },
          normal: {
            barBorderRadius: 7,
            color: new echarts.graphic.LinearGradient(
              0, 0, 1, 0,
              [
                { offset: 0, color: '#3977E6' },
                { offset: 1, color: '#37BBF8' }

              ]
            )
          }
        }
      }
    ]
  }
  echartBar.setOption(option)
}

const drawEcharts = () => {
  drawEchartBar()
  drawEchartStatus()
  drawEchartName()
}

onMounted(() => {
  drawEcharts()
})
</script>

<style lang="scss" scoped>
</style>

