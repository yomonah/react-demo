import React, {Component} from 'react';
import './wechart.less';
import {dataSet} from './data';
import Clipboard from 'clipboard';
let imgPath = require('../../img/wechart_bg.jpeg');
var clipboard = new Clipboard('.btn');

export default class Lottery extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeIndex: this.getRnd(0,dataSet.length)
    }
  }

  getRnd(m,n){
    let curr = parseInt(Math.random()*(n-m))+m;
    return curr;
  }
  
  copy(){
    alert('复制成功');
  }
  

  render() {
    let {activeIndex} = this.state;
    let scaleH = document.documentElement.clientHeight;
    return (
      <div className='wechart-container'>
        <div className="wrapper" style={{height:scaleH}}>
          <img src={imgPath}/>
          <p id='text'>{dataSet[activeIndex]}</p>
          <button className="btn copy-btn" data-clipboard-target="#text" onClick={this.copy.bind(this)}>点我复制</button>
          <p className='line1'>长按二维码扫描</p>
          <p className='line2'>关注HiPee糖糖</p>
        </div>
      </div>
    );
  }
}
