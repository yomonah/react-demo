import React, {Component} from 'react';
import './load.less'

export default class Load extends Component{
  constructor(props){
    super(props);
    this.state = {
        data : 0.8
    }
  }

  componentDidMount(){
      let self = this;
      this.timer = setInterval(function(){
        self.changeData();
      },2000);
  }

  changeData(){
      let {data} = this.state;
      let num = Math.random();
      data = data+num > 1? 0:data+num;
      this.setState({data});
  }

  componentWillUnmount(){
    this.timer && clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    let {data} = this.state;
    let sty = {
      width:264*data+'px'
    }
    let textSty = {};
    let showText = (data*100).toFixed()+'%';
    if(data === 0){
        textSty.color='#BDBDBD',
        textSty.float='none'
    }
    return (
      <div className='app-precision-bar'>
        <div className='precision-bar' style = {sty}>
        <i style={textSty} >{showText}</i>
        </div>
    </div>
    );
  }
}
