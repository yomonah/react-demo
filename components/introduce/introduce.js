import './introduce.less';
import React, {Component} from 'react';

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    formatText(text){
        let textArr = text.split('&');
        let item = textArr && textArr.map((item,i)=>{
            if(i === textArr.length-1){
                return <a key={i} href={item} target="_blank">源码链接:{item}</a>
            }
            return <span key={i}>{item}</span>
        });
        return item;
    }

    shouldComponentUpdate(){
        return false;
    }

    render(){
        let {context} = this.props;
        let text = this.formatText(context);
        return(
            <div className='introduce-wrapper'>
                <p>{text}</p>
            </div>
        )
    }
}