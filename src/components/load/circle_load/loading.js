import React, {Component} from 'react';
import './loading.less'

export default class Load extends Component{
   constructor(props){
        super(props);
        this.state = {
            deg : 0
        }
    }

  componentDidMount(){
      var canvas = document.getElementById('loading1');
      var cans = canvas.getContext('2d');
      cans.beginPath();
      var circle ={
          x:40,
          y:40,
          r:25
      };
      cans.arc(circle.x,circle.y,circle.r,0,Math.PI/2, true);

      var linear_gradient = cans.createLinearGradient(0, 10, 170, -120);
      linear_gradient.addColorStop(0, '#262626');
      linear_gradient.addColorStop(0.25, '#797979');
      linear_gradient.addColorStop(0.4, '#FFFFFF');
      linear_gradient.addColorStop(0.75, '#FFFFFF');
      cans.strokeStyle = linear_gradient;
      cans.lineWidth=8;
      cans.stroke();

      let self = this;
      this.timer = setInterval(function(){
        self.changeDeg();
      },50);
  }

  changeDeg(){
    let {deg} = this.state;
    if(deg >= 360){
      deg = 0;
    }else{
      deg = deg+18;
    }
    this.setState({deg});
  }

  componentWillUnmount(){
    this.timer && clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    let {deg} = this.state;
    let sty = {
      transform:'rotate('+deg+'deg)'
    }
    return (
      <div className='app-loading1' style={sty}>
        <canvas width='80' height='80' id='loading1'/>  
    </div>
    );
  }
}

