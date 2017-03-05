import React, {Component} from 'react';
import Bar from './bar';

export default class Demo extends Component{
    constructor(props){
      super(props);
      this.state = {
          data:[21,23,45,1,34,2,29,33,14,25,43,49,23,12,8,10,18,43,25,22,13,42,28,9]
      }
    }

    componentDidMount(){
        let self = this;
        this.timer = setInterval(self._getData.bind(this), 2000); //自定义随机数据
    }

    componentWillUnmount(){
        this.timer && clearInterval(this.timer);
    }

     _getData(){
        let dataset=[];
        for(var i=0;i<24;i++){
            var number = Math.floor(Math.random()*50);
            dataset.push(number);
        }
        this.setState({data:dataset});
    }

     _getBarProps(){
        let {data}=  this.state;
        if(!data){
            return;
        }
        var props={
            width:600,
            hight:400,
            duration:1000, //柱子动效时长
            data:data,
            fillColor:"rgba(16,78,139,0.7)",
            strokeColor:'#104E8B',
            textColor:'#F5FFFA',
            textSize:14,
            label:true,
            rectPadding:8,
            xAxisConfig:{
                display:true,
                fontColor: '#868686',
                lineColor:'rgba(16,78,139,1)',
            },
            yAxisConfig:{
                display:false,
                fontColor: '#868686',
                lineColor:'rgba(16,78,139,1)'
            }
        };
        return props;
    }

    render(){
        return <Bar {...this._getBarProps()}/>
    }
}