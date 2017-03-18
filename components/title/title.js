import './title.less';
import React, {Component} from 'react';

export default class Title extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    formatText(text){
        let textArr = text.split('&');
        let item = textArr && textArr.map((item,i)=>{
            console.log(item)
            return <span key={i}>{item}</span>
        });
        return item;
    }

    shouldComponentUpdate(){
        return false;
    }

    render(){
        let {title, context} = this.props;
        let text = this.formatText(context);
        return(
            <div className='title-wrapper'>
                <h5>{title}</h5>
                <p>{text}</p>
            </div>
        )
    }
}