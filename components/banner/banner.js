import './banner.less';
import React, {Component} from 'react';

export default class Banner extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.raf = window.requestAnimationFrame;
    }

    componentDidMount(){
        // this.animateFunc();
    }

    animateFunc(){
        let listDom = document.getElementById('list');
        listDom.style.top = parseInt(listDom.style.top.replace('px','')) - 31 + 'px' ;
        if(parseInt(listDom.style.top.replace('px','')) < -124){
            listDom.style.top = '0px';
        }
        this.raf(animateFunc());
    }

    render(){
        let {data} = this.props;
        return(
            <div className='text-banner'>
                <span className='roller-content'>{data}</span>
                <span className='roller-content'>{data}</span>
            </div>
        )
    }
}
Banner.defaultProps={
    duration: 3*1000,
    fontColor: '#fff',
    fontSize: 14
}