import React, {Component} from 'react';
import './wechart.less';
import {dataSet} from './data';
import Clipboard from 'clipboard';
let imgPath = require('../../img/wechart_bg.jpeg');
var clipboard = new Clipboard('.btn');
import Alert from '../alert/alert';

export default class Lottery extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeIndex: this.getRnd(0,dataSet.length),
      alert:false
    }
  }

  getRnd(m,n){
    let curr = parseInt(Math.random()*(n-m))+m;
    return curr;
  }
  
  copy(){
    this.setState({alert:true});
  }

  close(flag){
    this.setState({alert:flag});
  }
  
  getProps(){
    let {alert} = this.state;
    let props ={
      text:'复制成功',
      duration:1500,
      type:'info',
      show:alert
    }
    return props;
  }

  render() {
    let {activeIndex, alert} = this.state;
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
        <Alert {...this.getProps()} close={this.close.bind(this)}/>
      </div>
    );
  }
}
