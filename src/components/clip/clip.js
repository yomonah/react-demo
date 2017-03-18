import './clip.less';
import React, {Component} from 'react';
import {category} from './data';
import Title from '../../../components/title/title';
import {INTRODUCTION} from './introduce';

export default class Clip extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        }
    }

    componentDidMount(){
        this.timer = setInterval(()=>{
            this.changeIndex();
        },2000);
    }

    changeIndex(){
        let {activeIndex} = this.state;
        if(activeIndex === category.length-1){
            activeIndex = 0;
        }else{
            activeIndex = activeIndex+1;
        }
        this.setState({activeIndex});
    }

    componentWillUnmount(){
        this.timer && clearInterval(this.timer);
    }

    render(){
        return(
            <div className='app-clip'>
             <Title {...INTRODUCTION}/>
             <div className='demo-wrapper'>
              <div className='container'>
                <div className={`content ${category[this.state.activeIndex].type}`}></div>
                <span className='title'>{category[this.state.activeIndex].type}</span>
              </div>
              <div className='container'>
                <div className='animate-com'></div>
                <span className='title'>mouse hover me</span>
              </div>
              </div> 
            </div>
        )
    }
}