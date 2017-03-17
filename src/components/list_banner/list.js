import React, {Component} from 'react';
import './list.less';
import Bar from '../bar/bar';

export default class MoveList extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:this.props.activeIndex
        }
    }

    getRows(){
        let self = this;
        let {data} = this.props;
        let {activeIndex} = this.state;
        let row = data && data.map(function(item,i){
            if(activeIndex === i){
                return <li key={'move-list-item'+i} className='detail-item'>
                        <div className='detail-hide'>
                            <div className='detail-show'>
                                <span className='item-time'>{item.time}</span>
                                <span className='item-name'>{item.name}</span>
                                <Bar {...self.getBarProps(item.data)}/>
                            </div>
                        </div>
                    </li>
            }
            return <li key={'move-list-item'+i} className='move-list-item'>
                        <span className='item-time'>{item.time}</span>
                        <span className='item-name'>{item.name}</span>
                        <span className='item-value'>{item.value}</span>
                    </li>
        })
        return row;
    } 

    getBarProps(data){
        if(!data){
            return;
        }
        var props={
            width:450,
            height:100,
            duration:1000, //柱子动效时长
            data:data,
            fillColor:"#668B8B",
            strokeColor:'#668B8B',
            textSize:12,
            label:false,
            rectPadding:8,
            xAxisConfig:{
                display:false
            },
            yAxisConfig:{
                display:false
            }
        };
        return props;
    }

    componentDidMount(){
        let {duration} = this.props;
        this.timer = setInterval(()=>{
            this.changeIndex();
        },duration);
    }

    componentWillUnmount(){
        this.timer && clearInterval(this.timer);
    }

    changeIndex(){
        let {data} = this.props;
        let {activeIndex} = this.state;
        if(activeIndex === data.length-1){
            activeIndex = 0;
        }else{
            activeIndex = activeIndex+1;
        }
        this.setState({activeIndex});
    }

    getMoveBoxSty(){
        let {activeIndex} = this.state;
        let initTop = 28,curTop=0;
        if(activeIndex === 0){
            curTop = initTop;
        }else{
            curTop = 28+activeIndex*42;
        }
        let sty = {
            top:curTop+'px'
        }
        return sty;
    }

    render(){ 
        let self = this;
        let rows = this.getRows();
        let sty = this.getMoveBoxSty();
        return(
            <div className='app-move-list'>
            <div className='move-box' style={sty}><div className='move-box-hide'></div></div>
                <ul className='item-wrapper'>
                {rows}
                </ul>
            </div>
        );
    }
}
MoveList.defaultProps= {
    duration:5000,  //动效时长
    activeIndex:0
}
