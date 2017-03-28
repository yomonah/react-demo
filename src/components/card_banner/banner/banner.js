import './banner.less';
import React, {Component} from 'react';

export default class Banner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex:0,
            type:'show',
            transitionDuration:0
        };
        this.update = false;
    }

    componentWillReceiveProps(){
        let {active, transitionDuration} = this.props;
        let self = this;
        if(active){
            this.update = true;
            this.setState({type:'hide',transitionDuration})
            this.timer = setTimeout(self.changeIndex.bind(this),transitionDuration*1000-50);
            
        }else{
            this.update = false;
        }
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    shouldComponentUpdate(){
        return this.update;
    }

    changeIndex(){
        let {data} = this.props;
        let {activeIndex} = this.state;

        if(data && activeIndex === data.length-1){
            activeIndex = 0;
        }else{
            activeIndex = activeIndex + 1;
        }
        this.setState({activeIndex,data,type:'show'});
    }

    getItems(){
        let {activeIndex,type,transitionDuration} = this.state;
        let {data} = this.props;

        let item = data && data.map((item,i)=>{
            if(activeIndex === i){
                let sty={
                    background:`url(${item.img}) no-repeat`,
                    backgroundSize:'cover',
                    animation:`${type} ${transitionDuration}s`
                }
                return (
                    <div key={'itme'+i} className='item' style={sty}>
                        <span className='item-text'>{item.text}</span>
                    </div>
                )
            }   
        });
        return item;
    }

    render() {
        return (
            <div className="banner-wrapper">
               {this.getItems()}
            </div>
        );
    }
}