import React, {Component} from 'react';
import WaterBall from './water_ball';

export default class Demo extends Component{
    constructor(props){
      super(props);
      this.state = {
          data:{id:1, value:0.9}
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
        let {data} = this.state;
        let id = data.id+1;
        data = {id:id, value:Math.random()};
        this.setState({data});
    }

    _getCircleProps(){
        let props={
            idDom:'circleWaterBall',
            textColor:"#C2E2F9",
            waveTextColor:"#C2E2F9",
            textSize:0.7,
            outerCircle:{
                r:50,
                fillColor:'#35a1e8'
            },
            innerCircle:{
                r:50,
                fillColor:'rgba(53, 161, 232,0.8)'
            }
        };
        return props;
    }

    render(){
        let {data} = this.state;
       {/*} return <WaterBall data={data} config={this._getCircleProps()}/>*/}
       return <div>on working...</div>
    }
}