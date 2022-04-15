<template>
  <div class="app-container">
    <div style="width: 100%; height: 200px" ref="chart" id="chart1"></div>
    <div style="width: 100%; height: 100px" ref="chart" id="chart2"></div>
    <div style="width: 100%; height: 300px" ref="chart" id="chart3"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    this.init()
  },
  methods: {
    // 初始化图表
    init() {
      const chart1 = document.getElementById('chart1');
      const chart2 = document.getElementById('chart2');
      const chart3 = document.getElementById('chart3');
      const myChart1 = echarts.init(chart1);
      const myChart2 = echarts.init(chart2);
      const myChart3 = echarts.init(chart3);
      let option1 = {
        graphic: {
          elements: [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: '江西拓荒者科技有限公司',
                fontSize: 100,
                fontWeight: 'bold',
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: 'transparent',
                stroke: '#409EFF',
                lineWidth: 1
              },
              keyframeAnimation: {
                duration: 5000,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    style: {
                      fill: 'transparent',
                      lineDashOffset: 200,
                      lineDash: [200, 0]
                    }
                  },
                  {
                    // Stop for a while.
                    percent: 0.5,
                    style: {
                      fill: 'transparent'
                    }
                  },
                  {
                    percent: 1,
                    style: {
                      fill: '#409EFF'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
      let option2 = {
        graphic: {
          elements: [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: 'JIANGXI PIONEER TECHNOLOGY CO.,LTD.',
                fontSize: 52,
                fontWeight: 'bold',
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: 'transparent',
                stroke: '#409EFF',
                lineWidth: 1
              },
              keyframeAnimation: {
                duration: 5000,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    style: {
                      fill: 'transparent',
                      lineDashOffset: 200,
                      lineDash: [200, 0]
                    }
                  },
                  {
                    // Stop for a while.
                    percent: 0.5,
                    style: {
                      fill: 'transparent'
                    }
                  },
                  {
                    percent: 1,
                    style: {
                      fill: '#409EFF'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
      let option3 = {
        graphic: {
          elements: [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: '科技拓荒\t创新先行',
                fontSize: 120,
                fontWeight: 'bold',
                fontFamily: '华文楷体',
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: 'transparent',
                stroke: '#409EFF',
                lineWidth: 1
              },
              keyframeAnimation: {
                duration: 5000,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    style: {
                      fill: 'transparent',
                      lineDashOffset: 200,
                      lineDash: [200, 0]
                    }
                  },
                  {
                    // Stop for a while.
                    percent: 0.5,
                    style: {
                      fill: 'transparent'
                    }
                  },
                  {
                    percent: 1,
                    style: {
                      fill: 'black'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
      option1 && myChart1.setOption(option1);
      option2 && myChart2.setOption(option2);
      option3 && myChart3.setOption(option3);
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
  width: 100%;
  height: 100%;
}
</style>
