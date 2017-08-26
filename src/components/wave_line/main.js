import React, {Component} from 'react';
// import './wave.less';
import raf from 'raf';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
// import {INTRODUCTION} from './introduce';


export default class WaveLine extends Component{
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
  
  draw(){
		if (this.stop) return;
		this.phase = (this.phase+this.speed)%(Math.PI*64);
		this.clear();
		this.drawLine(-2, 'rgba(255,255,255,0.5)');
		// this.drawLine(-6, 'rgba(184,255,139,1)');
		this.drawLine(4, 'rgba(255,255,255,0.3)');
		// this.drawLine(2, 'rgba(255,255,255,0.6)');
		// this.drawLine(1, 'rgba(255,255,255,1)', 1.5);

		raf(this.draw.bind(this));
  }

  drawLine(attenuation, color, width){
		this.ctx.moveTo(0,0);
		this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
		this.ctx.lineWidth = width || 1;
		var x, y;
		for (var i=-this.K; i<=this.K; i+=0.01) {
			x = this.width*((i+this.K)/(this.K*2));
			y = this.height/2 + this.noise * this._globalAttenuationFn(i) * (1/attenuation) * Math.sin(this.F*i-this.phase);
      this.ctx.lineTo(x, y);
    }
    this.ctx.lineTo(this.width,this.height);
    this.ctx.lineTo(0,this.height);
    this.ctx.lineTo(0,0);
    this.ctx.stroke();
    this.ctx.fill();
  }
  
  _globalAttenuationFn(x){
		return Math.pow(this.K*4/(this.K*4+Math.pow(x,4)),this.K*2);
  }
  
  clear(){
		this.ctx.globalCompositeOperation = 'destination-out';
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.globalCompositeOperation = 'source-over';
  }
  render(){
    return(
      <div className='wave-wrapper'>
         {/* <Title {...INTRODUCTION}/>  */}
          <canvas ref="waveCvs" style={{background:'#FF69B4', border:'1px solid #f1f1f1'}}></canvas>
         {/* <Introduce {...INTRODUCTION}/>  */}
      </div>
    )
  }
}

WaveLine.defaultProps ={
  width: 375,
  height: 400,
  speed:0.1,
  noise:0.3,
  phase:0,
}