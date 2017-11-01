import React, {Component} from 'react';
import './mosaic.less';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';

var canvas = null;
var context = null;

export default class Mosaic extends Component{
  constructor(props){
    super(props);
    this.state={
      penType : 0 ,//0为画笔，1为马赛克
      lastImgArr:[]
    }
    // this.lastImgArr=[];
  }

  componentDidMount(){
    let {quan,num} = this.props;
    canvas = this.refs.picture;  
    context = canvas.getContext("2d"); 
    
    //创建image对象
    let imgObj = new Image();
    imgObj.src = require('../../img/homin.jpeg');
    //待图片加载完后，将其显示在canvas上
    let self = this;
    imgObj.onload = function(){
      context.drawImage(this, 0, 0,canvas.width, canvas.height);//this即是imgObj,保持图片的原始大小
      self.start(this);
    }
  }

  revoked(){
    let {lastImgArr} = this.state;
    if(lastImgArr && lastImgArr.length){
      context.putImageData(lastImgArr.pop(), 0, 0);
      this.setState({lastImgArr});
    }
  }
  
  paint(){
    this.setState({penType:0});
  }
  mosaic(){
    this.setState({penType:1});
  }

  start(obj){
    let {quan,num} = this.props;
    let self = this;
    canvas.onmousedown = function(ev){
        let {penType} = self.state;
        //每次下笔前先保存
        let {lastImgArr} = self.state;
        lastImgArr.push(context.getImageData(0,0,canvas.width,canvas.height));
        self.setState({lastImgArr});

        var ev=ev || window.event;
        var dx = ev.pageX-canvas.offsetLeft;
        var dy = ev.pageY-canvas.offsetTop;
        if(penType == 0){
          context.beginPath();
          context.moveTo(dx,dy);
        }else{
          self.drawMosaic(obj,dx,dy);
        }

        document.onmousemove = function(ev){
            var ev = ev || window.event;
            var mx = ev.pageX-canvas.offsetLeft;
            var my = ev.pageY-canvas.offsetTop;
            if(penType == 0){
              context.lineWidth = 1;
              context.lineTo(mx,my);
              context.stroke();
              context.strokeStyle="red";
            }else{
              if(Math.pow(dx-mx,2)+Math.pow(dy-my,2)>= Math.pow(quan*num,2)){  //(quan*马赛克个数*2)的平方
                self.drawMosaic(obj,mx,my);
                dx = mx;
                dy = my;
              }
            }
        };
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }
  }

  drawMosaic(obj,dx,dy){
    let {num,quan} = this.props;
    //原始图像
    var originalImgData = context.getImageData(0,0,canvas.width,canvas.height);  
    var originalPxData = originalImgData.data;  
      
    //用于循环修改  
    var modifyImgData = context.getImageData(0,0,canvas.width,canvas.height);  
    var modifyPxData = modifyImgData.data;  

    for(var i=dx-quan*num;i<dx+quan*num;i = i+2*quan+1){  
      for(var j=dy-quan*num;j<dy+quan*num;j = j+2*quan+1){
        //中心点(dx,dy)
        //下面判断只是为了将马赛克画笔制作成圆形的，因为默认是正方形的，可有可无
        if(!((i==dx-quan*num&&j==dy-quan*num)||(i==dx-quan*num&&j==dy-quan*num+2*quan+1)||
          (i==dx-quan*num&&j==dy-quan*num+4*quan+2)||(i==dx-quan*num&&j==dy-quan*num+12*quan+6)||
          (i==dx-quan*num&&j==dy-quan*num+14*quan+7)||(i==dx-quan*num&&j==dy-quan*num+16*quan+8)||
          (i==dx-quan*num+16*quan+8&&j==dy-quan*num)||(i==dx-quan*num+16*quan+8&&j==dy-quan*num+2*quan+1)||
          (i==dx-quan*num+16*quan+8&&j==dy-quan*num+4*quan+2)||(i==dx-quan*num+16*quan+8&&j==dy-quan*num+12*quan+6)||
          (i==dx-quan*num+16*quan+8&&j==dy-quan*num+14*quan+7)||(i==dx-quan*num+16*quan+8&&j==dy-quan*num+16*quan+8)||
          (i==dx-quan*num+2*quan+1&&j==dy-quan*num)||(i==dx-quan*num+4*quan+2&&j==dy-quan*num)||
          (i==dx-quan*num+12*quan+6&&j==dy-quan*num)||(i==dx-quan*num+14*quan+7&&j==dy-quan*num)||
          (i==dx-quan*num+2*quan+1&&j==dy-quan*num+16*quan+8)||(i==dx-quan*num+4*quan+2&&j==dy-quan*num+16*quan+8)||
          (i==dx-quan*num+12*quan+6&&j==dy-quan*num+16*quan+8)||(i==dx-quan*num+14*quan+7&&j==dy-quan*num+16*quan+8))){
        var sumR = 0;  
        var sumG = 0;  
        var sumB = 0;  
        //找他周围的元素 
        for(var x = -quan;x<=quan;x++){  
            for(var y = -quan;y<=quan;y++){  
              var xx = i+x;  
              var yy = j+y;  
              var pp = yy*canvas.width+xx; //周围的元素。  
              sumR += originalPxData[pp*4+0];  
              sumG += originalPxData[pp*4+1];  
              sumB += originalPxData[pp*4+2];  
            }  
        }  
          
        var totlal = (2*quan+1)*(2*quan+1);  
        var avgR = sumR/totlal;  
        var avgG = sumG/totlal;  
        var avgB = sumB/totlal;  
          
        for(var x = -quan;x<=quan;x++){  
          for(var y = -quan;y<=quan;y++){  
            var xx = i+x;  
            var yy = j+y;  
            var pp = yy*canvas.width+xx; //周围的元素。  
            modifyPxData[pp*4+0] = avgR;  
            modifyPxData[pp*4+1] = avgG;  
            modifyPxData[pp*4+2] = avgB;  
          }  
        }  
      }  
    }
    } 
    context.putImageData(modifyImgData,0,0,0,0,canvas.width,canvas.height); 
  }


  render(){
    let {width,height} = this.props;
    let {penType,lastImgArr} = this.state;
    return(
      <div className='mosaic-wrapper'>
        <Title {...INTRODUCTION}/>
        <div className='demo-wrapper'>
          <div className='pen-wrapper'>
            <button className={lastImgArr.length > 0?'blank-btn':'blank-btn disable-btn'} onClick={this.revoked.bind(this)}><i className='fa fa-mail-reply'></i>撤销</button>
            <button className={penType==0?'blank-btn choose-btn':'blank-btn'} onClick={this.paint.bind(this)}><i className='fa fa-pencil'></i>画笔</button>
            <button className={penType==1?'blank-btn choose-btn':'blank-btn'} onClick={this.mosaic.bind(this)}><i className='fa fa-delicious'></i>马赛克</button>
          </div>
          <div className='img-wrapper'>
            <canvas ref="picture" width={width} height={height}></canvas>  
          </div>
        </div>
        <Introduce {...INTRODUCTION}/>
      </div>
    )
  }
}
Mosaic.defaultProps= {
  width:600,
  height:400,
  quan:3, //马赛克大小，值越小马赛克就越小
  num:6,  //一个马赛克画笔区域包含的马赛克单边个数

}