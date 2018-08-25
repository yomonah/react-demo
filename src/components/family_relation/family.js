/**
 * @create by Mia Yu
 * @date 2018-8-25
 */
import React, {Component} from 'react';
import echarts from 'echarts';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';
import AlertMsg from '../alert/alert';
import _ from 'lodash';

var nanImg = require('../../img/nan.jpg');
var nvImg = require('../../img/nv.jpg');

const ROOT_X = 10;
const ROOT_Y = 20;
const DISTANCE = 5; //节点间单位间距
const MAX_NODE_TEXT_LEN = 6;

export default class Family extends Component{
  constructor(props){
    super(props);
    this.state={
      data: props.data,
      node: [],
      links: [],

      alert:false,
      alertType:'',
      alertMsg:''
    }
    this.nodes = []; //存放节点
    this.links = []; //存放节点连线
  }

  render(){
    let {data} = this.state;
    let {width, height} = this.props;
    let {title, context} = INTRODUCTION;
    return (
      <div>
        <Title {...INTRODUCTION}/>
        <div className='demo-wrapper'>
          <div ref="familyRelationChart" style={{width:`${width}px`, height:`${height}px`}}></div>
        </div>
        <AlertMsg {...this.getProps()} close={this.close.bind(this)}/>
        <Introduce context={context}/>
      </div>
    )
  }

  componentDidMount(){
    this.draw();
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEqual(nextProps.data, this.props.data)){
      this.setState({
        data: nextProps.data
      },() => {
        this.draw();
      })
    }
  }

  //处理数据格式
  handleData(data){
    if(!data || !data.length) return null;
    let dataNodes = {
      self: null,
      parents: [],
      spouse: [],
      children: []
    };
    data.map((item,i) => {
      if(0 === item.type){
        dataNodes.self = item;
      }else if(1 === item.type){
        dataNodes.parents.push(item);
      }else if(2 === item.type){
        dataNodes.spouse.push(item);
      }else if(3 === item.type){
        dataNodes.children.push(item);
      }
    })
    if(!dataNodes.self) return null; //中心人物不存在则不渲染
    return dataNodes;
  }

  //绘制关系图谱
  draw(){
    let { roam, symbolSize, color } = this.props;
    let data = this.handleData(this.state.data);
    
    if(!data || !this.refs.familyRelationChart){
      return;
    }

    //重新渲染前先清空上一轮的数据
    this.links = [];
    this.nodes = [];

    this.myChart = echarts.init(this.refs.familyRelationChart);
    //注册点击事件
    this.myChart.on('click', this.nodeClick.bind(this));

    //渲染自身节点
    this.drawSelf(data.self);
    //渲染父母节点
    this.drawRelationNodes(data.parents, 'parents', DISTANCE);
    //渲染配偶节点
    this.drawRelationNodes(data.spouse, 'spouse', DISTANCE*2);
    //渲染子女节点
    this.drawRelationNodes(data.children, 'children', DISTANCE);

    //连接中心任务和父母节点
    this.nodes.push({
      x: ROOT_X,
      y: ROOT_Y - DISTANCE,
      itemStyle: {
        opacity: 0
      },
      name: "parent_node"
    });

    //连接中心人物和子女节点
    this.nodes.push({
      x: ROOT_X,
      y: ROOT_Y + DISTANCE,
      itemStyle :{
        opacity: 0
      },
      name: "mate_node"
    });

    if(data.parents && data.parents.length){
      this.links.push({
        source: 'self',
        target : 'parent_node'
      });
    }

    if(data.children && data.children.length){
      this.links.push({
        source: 'self',
        target: 'mate_node'
      })
    }

    let option = {
      series:[{
        type: 'graph',
        symbolSize : symbolSize,
        roam: roam,
        zoom: 0.9,
        hoverAnimation: false,
        label: {
            show:true,
        },
        data: this.nodes,
        links: this.links,
        lineStyle: {
          color: color.lineColor || '#f16301',
          opacity: 1, 
          width:1
        }
      }]
    };
    this.myChart.setOption(option);
  }

  //渲染中心人物节点
  drawSelf(data){
    let { symbolSize, color, font } = this.props;
    this.nodes.push({  //背景层
      x: ROOT_X, 
      y: ROOT_Y, 
      symbol: 'rect',
      symbolSize: symbolSize + 6,
      cursor: 'none',
      label: {
        show: false
      },
      itemStyle: {
        color: '#f16301',
        borderWidth: 2,
        borderColor: color.borderColor || '#f16301',
        cursor: 'none'
      },
      emphasis: {
        color: "rgba(0,0,0,0)"
      },
      name: "selfbg",
      value:data
    });
    this.nodes.push({
      x: ROOT_X, 
      y: ROOT_Y, 
      symbol: data.photo ? `image://${data.photo}` : 0===data.sex ? `image://${nanImg}` : `image://${nvImg}`,
      symbolSize: symbolSize,
      label:{
        position: 'right',
        fontSize: 20,
        formatter: function(params){
          if(!params.value || !params.value.name){
            return '{name|}\n {relation|}';
          }
          let name  = params.value.name.length > 3 ? params.value.name.substr(0,3)+'...' : params.value.name;
          return '{name| '+name+'}\n {relation|}';
        },
        rich:{
          name:{
            color: color.nameColor || '#f16301',
            fontSize: font.nameFont || 18,
            padding: 4
          }
        }
      },
      name: 'self',
      value: data
    })
  }

  //渲染家族其他成员节点
  drawRelationNodes(data, type, distance){
    let {symbolSize, color, font} = this.props;
    let self = this;
    data.forEach((item,i) => {
      //处理仅有一个节点的情况
      let x = ROOT_X;
      if(data.length === 1){
        if(type === 'parents' || type === 'children'){
          x = ROOT_X;
        }else{
          x = ROOT_X+ distance;
        }
      }
      self.nodes.push({  //背景层
        x: data.length === 1 ? x : i%2 === 0 ? ROOT_X+distance*(i+1) : ROOT_X-distance*i,
        y: type === 'parents' ? ROOT_Y-DISTANCE  : type === 'children' ? ROOT_Y+DISTANCE : ROOT_Y,
        symbol: 'rect',
        symbolSize: symbolSize+2,
        cursor: 'none',
        label: {
          show: false
        },
        itemStyle: {
          color: '#f16301',
          borderWidth: 2,
          borderColor: color.borderColor || '#f16301',
          curosor: 'none'
        },
        emphasis:{
          color: 'rgba(0,0,0,0)'
        },
        name: type+i.toString()+'bg',
        value: item
      });

      self.nodes.push({
        x: data.length === 1 ? x : i%2 === 0 ? ROOT_X+distance*(i+1) : ROOT_X-distance*i,
        y: type === 'parents' ? ROOT_Y-DISTANCE  : type === 'children' ? ROOT_Y+DISTANCE : ROOT_Y,
        symbol: item.photo ? `image://${item.photo}` : 0===data.sex ? `image://${nanImg}` : `image://${nvImg}`,
        symbolSize: symbolSize,
        label: {
          position:'right',
          fontSize: 20,
          formatter:function(params){
            if(!params.value || !params.value.name){
              return '{name|}\n {relation|}';
            }
            let name  = params.value.name.length > 3 ? params.value.name.substr(0,3)+'...' : params.value.name;
            return '{name| '+name+'}\n {relation|'+params.value.relation+'}';
          },
          rich:{
            name:{
              color: color.nameColor || '#f16301',
              fontSize: font.nameFont || 18,
              padding:4
            },
            relation:{
              color: color.relationColor || '#fff',
              fontSize: font.relationFont ||12,
              padding:4, 
              backgroundColor: color.bgColor || '#f16301'
            }
          }
        },
        name: type+i.toString(),
        value: item
      });

      //添加相邻节点间连线
      if(type !== 'spouse'){
        self.links.push({
          source:`${type}0`,
          target: type + i.toString()
        });
      }else{
        if(i === 0){
          self.links.push({
            source: 'self',
            target: `${type}0`
          });
        }else{
          self.links.push({
            source: `${type}0`,
            target: type+i.toString()
          });
        }
      }
    });
  }

  nodeClick(param){
    //点击节点的样式处理
    this.nodes && this.nodes.map((item,i) => {
      if(_.isEqual(item.value, param.value) && item.symbol === 'rect'){  //当前选中的节点高亮处理
        item.symbolSize = this.props.symbolSize+6;
        item.itemStyle.borderWidth = 4;
      }else{
        if(item.symbol === 'rect'){
          item.symbolSize = this.props.symbolSize + 2;
          item.itemStyle.borderWidth = 2;
        }else{
          item.symbolSize = this.props.symbolSize;
        }
      }
    })
    if(param.data && param.data.value){
      this.setState({
        alert:true, 
        alertType:'success', 
        alertMsg:'当前选中：'+param.data.value.name
      },()=>{
        this.setChartsOption();
      });
    }
  }

  setChartsOption(){
    let {roam, symbolSize, color} = this.props;
    let option = {
      series:[{
        type: 'graph',
        symbolSize: symbolSize,
        roam: roam,
        zoom: 0.9, 
        hoverAnimation: false,
        label:{
          show: true
        },
        data: this.nodes,
        links: this.links,
        lineStyle: {
          color: color.lineColor || '#f16301',
          opacity: 1,
          width: 1
        }
      }]
    };
    this.myChart.setOption(option);
  }

  close(flag){
    this.setState({alert:flag});
  }

  getProps(){
    let {alert, alertType, alertMsg} = this.state;
    let props ={
      text:alertMsg,
      duration:2000,
      type:alertType,
      show:alert
    }
    return props;
  }
}
Family.defaultProps= {
  //type用于身份标识： 0为中心人物，1为父辈，2为平辈，3为子辈
  //sex: 0男 1女
  data:[
    { id:'1001', name:'张亚飞', type:1, photo:'', relation:'父亲', sex:0 },
    { id:'1002', name:'高胜娟', type:1, photo:'', relation:'母亲', sex:1 },
    { id:'1003', name:'张翰', type:0, photo:'', relation:'', sex:0 },
    { id:'1004', name:'吴秀芳', type:2, photo:'', relation:'配偶', sex:1 },
    { id:'1005', name:'张紫婷', type:3, photo:'', relation:'女儿', sex:1 },
    { id:'1006', name:'张元', type:3, photo:'', relation:'儿子', sex:0 },
    { id:'1007', name:'张旭峰', type:3, photo:'', relation:'儿子', sex:0 }
  ],
  color:{
    lineColor: '#f16301',   //节点连线颜色
    borderColor: '#f16301',  //节点边框颜色
    highLight: '#f16301',  //点击高亮色
    nameColor: '#f16301',  //名字字体颜色
    relationColor: '#FFF',  //关系字体颜色
    bgColor: '#f16301'  //关系标签背景色
  },
  font:{
    nameFont: 18,  //名字字体大小
    relationFont: 12  //关系字体大小
  },
  roam: true,  //是否支持拖拽，缩放
  symbolSize: 50,  //节点大小
  width: 580,  //图谱容器宽度
  height: 270  //图谱容器高度
}