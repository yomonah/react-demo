import React, {Component} from 'react';
import './lottery.less';
import AlertMsg from '../alert/alert';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';

export default class Lottery extends Component{
  constructor(props){
    super(props);
    this.state = {
      turnplate:{
        restaraunts:["50元代金券", "100积分", "谢谢参与", "美的电饭煲", "200积分", "ipad mini", "50积分 ", "500元代金券", "10元代金券", "iphone7"],             //大转盘奖品名称
        colors:["#f9e3df", "#FFFFFF", "#f9e3df", "#FFFFFF","#f9e3df", "#FFFFFF", "#f9e3df", "#FFFFFF","#f9e3df", "#FFFFFF"],                  //大转盘奖品区块对应背景颜色
        outsideRadius:192,          //大转盘外圆的半径
        textRadius:155,             //大转盘奖品位置距离圆心的距离
        insideRadius:68,            //大转盘内圆的半径
        startAngle:0,               //开始角度
      },
      angles:-108,
      activeIndex:null,
      times:3,
      alert:false,
      alertType:'',
      alertMsg:''
    }
  }

  componentDidMount(){
    this.init();
  }

  componentWillUnmount(){
      this.timer && clearTimeout(this.timer);
  }

  init(){
    let {turnplate} = this.state;
    var canvas = this.refs.wheelcanvas;    
    if (canvas.getContext) {
      //根据奖品个数计算圆周角度
      var arc = Math.PI*2 / (turnplate.restaraunts.length);  
      var ctx = canvas.getContext("2d");
      //在给定矩形内清空一个矩形
      ctx.clearRect(0,0,422,422);
      //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
      ctx.strokeStyle = "#FFBE04";
      //font 属性设置或返回画布上文本内容的当前字体属性
      ctx.font = '16px Microsoft YaHei';      
      for(var i = 0; i < turnplate.restaraunts.length; i++) {  
          var angle = turnplate.startAngle + i * arc;
          ctx.fillStyle = turnplate.colors[i];
          ctx.beginPath();
          //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
          ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);    
          ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
          ctx.stroke();  
          ctx.fill();
          //锁画布(为了保存之前的画布状态)
          ctx.save();   
          
          //----绘制奖品开始----
          ctx.fillStyle = "#E5302F";
          var text = turnplate.restaraunts[i];
          var line_height = 17;
          //translate方法重新映射画布上的 (0,0) 位置
          ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
          
          //rotate方法旋转当前的绘图
          ctx.rotate(angle + arc / 2 + Math.PI / 2);
          ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
          ctx.restore();
      }
    }
  }

  start(){
    let self=this;
    let {turnplate,angles,activeIndex,times} = this.state;
    activeIndex = Math.floor(Math.random()*turnplate.restaraunts.length+1);
    if(times === 0){
      // alert('抽奖机会已用光～');
      this.setState({alert:true, alertType:'warn', alertMsg:'抽奖机会已用完'});
      return;
    }else{
      times -= 1;
    }
    //计算对应奖品的角度并让转盘持续多转4圈
    let currentAng = 360-360/turnplate.restaraunts.length*(activeIndex-1) - 108;
    angles = currentAng + (angles-angles%360) + 360*4;

    this.setState({angles,activeIndex,times});
    this.timer = setTimeout(self.showPrize.bind(this), 6500); //自定义随机数据
  }

  showPrize(){
    let {turnplate, activeIndex} = this.state;
    let text = activeIndex === 2 ? turnplate.restaraunts[activeIndex-1] : '恭喜抽中'+turnplate.restaraunts[activeIndex-1];
    // alert(text);
    this.setState({alert:true, alertType:'success', alertMsg:text});
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

  render() {
    let {turnplate,angles,activeIndex,times} = this.state;
    return (
      <div className='lottery-container'>
        <Title {...INTRODUCTION}/>
        <div className='demo-wrapper'>
          <div className='label'>您还有<span>{times}</span>次抽奖机会！</div>
          <div className='main'>
              <canvas ref='wheelcanvas' style={{transform:`rotate(${angles}deg)`}} className='canvas-content' width="422px" height="422px"/>
          </div>
          <div className="btn" onClick={this.start.bind(this)}></div>
        </div>
        <AlertMsg {...this.getProps()} close={this.close.bind(this)}/>
        <Introduce {...INTRODUCTION}/>
    </div>
    );
  }
}
