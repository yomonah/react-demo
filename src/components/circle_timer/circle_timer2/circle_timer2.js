/**
 * 类似音乐播放器里的进度，可手动暂停
 */
import './circle_timer2.less';
import React, {Component} from 'react';

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            start:true
        }
        this.currentTime = 0;
        this.currentValue = 0;
    }

    componentDidMount(){
        this.draw();
    }

    start(){
        this.setState({start:false});
        this.timer = setInterval(()=>{
            this.count();
        },10);
    }

    pause(){
        this.setState({start:true});
        this.timer && clearInterval(this.timer);
    }

    componentWillUnmount(){
        this.timer && clearInterval(this.timer);
    }

    count(){
        let {time} = this.props
        this.currentTime += 10;
        this.currentValue = 2*this.currentTime/time;
        this.draw();
    }

    draw(){
        let {width, height, radius, defaultColor, ringColor, lineWidth} = this.props;
        if(this.currentValue > 2){  //判断是否已到时
            this.currentValue = 0;
            this.currentTime = 0;
            this.setState({start:true})
            this.timer && clearInterval(this.timer);
        }
        var canvas = this.refs.circle;
        var ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        var circle = {
            x: width/2,
            y: height/2,
            r: radius > Math.min(width, height)/2 ? Math.min(width, height)/2-10:radius
        };
        //画底部背景
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI*2, false);
        ctx.strokeStyle = defaultColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        //画圆环进度条
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI*this.currentValue, false);
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    render(){
        let {start} = this.state;
        return(
            <div className='canvas-wrapper'>
                <canvas ref='circle' />
               { start ? 
               <i className="fa fa-play start-btn" onClick={this.start.bind(this)}></i> : <i className="fa fa-pause pause-btn" onClick={this.pause.bind(this)}></i>}
            </div>
        )
    }
}

Main.defaultProps= {
    width:100,  //canvas宽度
    height:100,  //canvas高度
    radius:20,   //圆半径
    time:30*1000,  //计时时长
    lineWidth: 5,   //圆外边框宽度
    ringColor:'#999',  //进度色
    defaultColor:'#333' //圆的底色
}