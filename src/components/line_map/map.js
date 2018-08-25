/**
 * @create by Mia Yu
 * @date 2018-8-25
 */
import React, {Component} from 'react';
import echarts from 'echarts';
import '../../../node_modules/echarts/map/js/china';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';

export default class Map extends Component{
  constructor(props){
    super(props);
    this.state={
    }
    this.series = []; 
    this.color = '#35c882';
  }

  render(){
    let {width, height} = this.props;
    let {title, context} = INTRODUCTION;
    return (
      <div>
        <Title {...INTRODUCTION}/>
        <div className='demo-wrapper'>
          <div ref="lineMap" style={{width:`${width}px`, height:`${height}px`, background:'#000'}}></div>
        </div>
        <Introduce context={context}/>
      </div>
    )
  }

  componentDidMount(){
    this.renderMap();
  }

  componentWillReceiveProps(nextProps){
  }

  //数据转换
  convertData(data){
    let res = [];
    for ( let i=0; i< data.length; i++){
      let dataItem = data[i];
      let fromCoord = dataItem.from;
      let toCoord =  dataItem.to;
      if(fromCoord && toCoord){
        res.push({
          fromName: dataItem.fName,
          toName: dataItem.tName,
          coords: [fromCoord, toCoord]
        });
      }
    }      
    return res;
  }

  getSeries(){
    let {data,lineColor} = this.props;
    let self = this;
    self.series = [
      {
        map: 'china',
        name: '飞线',
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.6,
          color: new echarts.graphic.LinearGradient(0,1,0,0,[{
            offset:0,
            color:lineColor || "#35c882"
          },{
            offset:0.25,
            color:lineColor || "#2dd885"
          },{
            offset:0.5,
            color:lineColor || "#2dd885"
          },{
            offset:0.7,
            color:"#fff"
          },{
            offset:1,
            color:"#fff"
          }]),
          symbolSize: 3
        },
        lineStyle:{
          color:self.color,
          width: 0, 
          curveness: 0.2
        },
        data: self.convertData(data)
      },{
        name:'',
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        symbolSize: function(val){
          return val[2]/5 > 25? 25:val[2]/5;
        },
        itemStyle:{
          color: lineColor || '#2dd885'
        },
        data: data.map(function(dataItem){
          return{
            name: dataItem.fName,
            value: dataItem.from.concat([dataItem.value])
          };
        })
      }
    ]
  }

  //渲染地图
  renderMap(){
    this.getSeries();
    let {roam,areaColor,borderColor} = this.props;

    let myChart = echarts.init(this.refs.lineMap);
    let option = {
      geo:{
        map:'china',
        label:{
          emphasis:{
            show:false
          }
        }, 
        roam: roam,
        itemStyle:{
          normal:{
            areaColor: {
              type: 'radial',
                    x: .5,
                    y: .5,
                    r: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(0,56,114, 0)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(0,56,114, .2)' // 100% 处的颜色
                    }],
            },
            borderColor: borderColor || '#294a3a',
            shadowColor: 'rgba(0, 255, 255, 1)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 10
          },
          emphasis:{
            areaColor: '#008080'
          }
        }
      },
      series: this.series
    };
    myChart.setOption(option, true);
  }

}
Map.defaultProps= {
  data:[
    { from:[116.4551, 40.2539], fName:'北京', to:[121.4648,31.2891], tName:'上海', value:10},
    { from:[114.4995, 38.1006], fName:'石家庄', to:[121.4648,31.2891], tName:'上海', value:23},
    { from:[102.9199, 25.4663], fName:'昆明', to:[121.4648,31.2891], tName:'上海', value:65},
    { from:[87.9236, 43.5883], fName:'乌鲁木齐', to:[121.4648,31.2891], tName:'上海', value:40},
  ],
  
  roam: true,  //是否支持拖拽，缩放
  borderColor: '#1b908b', //各省份边界线颜色
  lineColor: '#12ede7',  //飞线颜色
  width: 600,  //图谱容器宽度
  height: 600  //图谱容器高度
}