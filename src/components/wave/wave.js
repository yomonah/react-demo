import React, {Component} from 'react';
import './wave.less';
import raf from 'raf';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';


export default class Wave extends Component{
  constructor(props){
    super(props);
    this.state={
    }
    this.step = 0;
  }

  componentDidMount(){
    this.init();
    this.draw();
  }

  componentWillUnmount(){
    this.stop = true;
  }

  init(){
    let {width,height,speed,noise,phase} = this.props;

    this.K = 2;
    this.F = 6;
    this.speed = speed || 0.1;
    this.phase = phase || 0;

    if (!devicePixelRatio) devicePixelRatio = 1;
    this.width = devicePixelRatio * (width || 320);
    this.height = devicePixelRatio * (height || 100);
    this.MAX = (this.height/2)-4;
    this.noise =noise ? Math.min(noise, 1)*this.MAX : 0;

    this.canvas = this.refs.waveCvs;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = (this.width/devicePixelRatio)+'px';
    this.canvas.style.height = (this.height/devicePixelRatio)+'px';
    this.ctx = this.canvas.getContext('2d');
    this.stop = false;
  }
  
  //实现波浪动效
  draw(){
    if(this.stop) return;
    let {lines} = this.props;
    this.clear();
    this.step++;
    //画3个不同颜色的矩形
    for(var j = lines.length - 1; j >= 0; j--) {
        this.ctx.fillStyle = lines[j];
        var angle = (this.step+j*90)*Math.PI/180;
        var deltaHeight   = Math.sin(angle) * 50;
        var deltaHeightRight   = Math.cos(angle) * 50;
        this.ctx.beginPath();
        if(j == 0){
          this.ctx.moveTo(0, this.height/2);
          this.ctx.bezierCurveTo(this.width/3, this.height/2-deltaHeight+10, this.width *3/5, this.height/2-deltaHeightRight, this.width, this.height/2);
          this.ctx.lineTo(this.width, this.height);
          this.ctx.lineTo(0, this.height);
          this.ctx.lineTo(0, this.height/2+deltaHeight);
          this.ctx.closePath();
          this.ctx.fill();
        }else{
          this.ctx.moveTo(0, this.height/2+deltaHeight-5);
          this.ctx.bezierCurveTo(this.width /3, this.height/2+deltaHeight-30, this.width *3/5, this.height/2+deltaHeightRight-30, this.width, this.height/2+deltaHeightRight);
          this.ctx.lineTo(this.width, this.height);
          this.ctx.lineTo(0, this.height);
          this.ctx.lineTo(0, this.height/2+deltaHeight);
          this.ctx.closePath();
          this.ctx.fill();
        }
    }
    raf(this.draw.bind(this));
}
  
  clear(){
		this.ctx.globalCompositeOperation = 'destination-out';
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.globalCompositeOperation = 'source-over';
  }
  render(){
    return(
      <div className='wave-wrapper'>
         <Title {...INTRODUCTION}/> 
        <div style={{height:'660px'}}>
          <div className='header'>
            <img src={require('../../img/webGL4.jpg')}/>
            <p>
              <li>金币 1388</li>
              <li>钻石 52</li>
              <li>贡献力 188</li>
            </p>
          </div>
          <canvas ref="waveCvs" style={{background:'rgb(129, 199, 255)', border:'1px solid #f1f1f1'}}></canvas>
          <div className='content'>
            <div className='top-nav'>
              <li><i className='fa fa-database'></i>金币任务</li>
              <li><i className='fa fa-diamond'></i>钻石任务</li>
            </div>
            <div className='task-nav'>
              <span>新手任务</span>
              <li><i className='fa fa-calendar-check-o'></i>连续签到</li>
              <li><i className='fa fa-exclamation'></i>帮助任务</li>
              <li><i className='fa fa-film'></i>观看广告</li>
              <li><i className='fa fa-user-plus'></i>添加好友</li>
            </div>
            <div className='message-nav'>
              <span className='title'>假期特惠</span>
                <li className='first-li'>
                  <span>农场托管－3天</span>
                  <button><i className='fa fa-diamond'></i>15</button>
                </li>
                <li>
                  <span>农场托管－5天</span>
                  <button><i className='fa fa-diamond'></i>20</button>
                </li>
                <li>
                  <span>农场托管－10天</span>
                  <button><i className='fa fa-diamond'></i>35</button>
                </li>
                <li>
                  <span>雇佣汤姆－3天</span>
                  <button><i className='fa fa-database'></i>4999</button>
                </li>
                <li>
                  <span>神秘宝箱－3个</span>
                  <button><i className='fa fa-database'></i>2999</button>
                </li>
            </div>
          </div>
        </div>
         <Introduce {...INTRODUCTION}/> 
      </div>
    )
  }
}

Wave.defaultProps ={
  width: 375,
  height: 400,
  lines:[
    "rgba(250,250,250,1)",
    "rgba(250,250,250,.2)",
    "rgba(250,250,250,.4)",
    "rgba(250,250,250,.6)"
    ]
}