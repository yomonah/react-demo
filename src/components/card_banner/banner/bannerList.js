import Banner from './banner';
import raf from 'raf';
import React, {Component} from 'react';

export default class BannerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: this.props.activeIndex || 0
        };
    }

    getConfig(data){
        let props = {
            data: data,
            transitionDuration: this.props.transitionDuration
        }
        return props;
    }

    getItems(){
        let {data} = this.props;
        let {activeIndex} = this.state;

        let item = data && data.map((item,i)=>{
            if(activeIndex === i){
                return <Banner key={'banner'+i} active {...this.getConfig(item)}/> 
            }
            return <Banner key={'banner'+i} {...this.getConfig(item)}/>
        })
        return item;
    }

     componentDidMount(){
        this.start = Date.now();
		raf(this.changeIndex.bind(this));
    }

    componentWillUnmount(){
        this.stop = true;
    }

    changeIndex(){
        if(this.stop){
            return;
        }
        let {duration} = this.props;
        var now = Date.now();
        if(now - this.start >= duration*1000){
            this.setState({activeIndex:Math.floor(Math.random()*5)});
            this.start = now;
        }
		raf(this.changeIndex.bind(this));  
    }

    render() {
        return (
            <div className="bannerList-wrapper">
               {this.getItems()}
            </div>
        );
    }
}
BannerList.defaultProps={
    activeIndex:0, 
    duration:5, //翻牌间隔时长
    transitionDuration:0.5  //翻牌动效时长
}