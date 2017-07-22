import './main.less';
import React, {Component} from 'react';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';

//导入图片
var img1_1 = require('../../img/demo1_1.jpg');
var img1_2 = require('../../img/demo1_2.jpg');

export default class Main extends Component{
  constructor(props){
    super(props);
    this.state = {    
      demo1Hide : "450px",  //demo1遮盖图的当前宽度
      demo2Hide : "205px"
    }
  }

  putOn(e){
    let ev = e || event;
    let realW = ev.pageX - this.refs.demo1.offsetLeft;
    this.setState({demo1Hide:realW+'px'});
  }

  move(e){
    let ev = e || event;
    let currentX =ev.pageX - this.refs.demo1.offsetLeft> 900 ? 900 : ev.pageX - this.refs.demo1.offsetLeft;
    this.setState({demo1Hide:currentX+'px'});
  }

  over(e){
    let ev = e || event;
    let realH = ev.pageY - this.refs.demo2.offsetTop;
    this.setState({demo2Hide:realH+'px'});
  }

  getMove(e){
    let ev = e || event;
    let currentY =ev.pageY - this.refs.demo2.offsetTop> 409 ? 409 : ev.pageY - this.refs.demo2.offsetTop;
    this.setState({demo2Hide:currentY+'px'});
  }

  render() {
    let {demo1Hide, demo2Hide} = this.state;
    return (
      <div className='pic-container'>
        <Title {...INTRODUCTION}/>
        <h4>水平滑动</h4>
        <div className='demo1' ref='demo1' onMouseOver={this.putOn.bind(this)} onMouseMove={this.move.bind(this)}>
          <img src={img1_2} width='100%' height ='409px' className='demo1_1' />
          <div className='demo1_2' style={{width:demo1Hide}} ></div>
          <span className='title1'>经典黑白</span>
          <span className='title2'>怀旧泛黄</span>
        </div>
        <h4>垂直滑动</h4>
        <div className='demo2' ref='demo2' onMouseOver={this.over.bind(this)} onMouseMove={this.getMove.bind(this)}>
          <img src={img1_2} width='100%' height ='409px' className='demo2_1' />
          <div className='demo2_2' style={{height:demo2Hide}} ></div>
          <span className='title1'>经典黑白</span>
          <span className='title2'>怀旧泛黄</span>
        </div>
        <Introduce {...INTRODUCTION}/>
    </div>
    );
  }
}
