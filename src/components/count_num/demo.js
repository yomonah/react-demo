import './demo.less';
import React, {Component} from 'react';
import Count from './count';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';

export default class Demo extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 100,
            thousandsType:false
        }
    }

    getProps(){
        let {value, thousandsType} = this.state;
        let props ={
            duration:1000,
            value:this.state.value,
            thousandsType:thousandsType
        };
        return props;
    }

    changeCount(){
        this.setState({value:Math.floor(Math.random()*10000000)});
    }

    componentDidMount(){
        let self = this;
        this.timer = setInterval(self.changeCount.bind(this), 2000); //自定义随机数据
    }
    
    componentWillUnmount(){
        this.timer && clearInterval(this.timer);
        this.timer = null;
    }

    changeType(){
        let {thousandsType} = this.state;
        this.setState({thousandsType:!thousandsType});
    }

	render() {
		return (
            <div className='app-count'>
                <Title {...INTRODUCTION}/>
                <div className='demo-wrapper'>
                    <button className='default-btn' onClick={this.changeType.bind(this)}>change type</button>
                    <Count {...this.getProps()}/>
                </div>
                <Introduce {...INTRODUCTION}/>
            </div>
		);
	}
}

