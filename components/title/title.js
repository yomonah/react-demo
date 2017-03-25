import './title.less';
import React, {Component} from 'react';

export default class Title extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    shouldComponentUpdate(){
        return false;
    }

    render(){
        let {title} = this.props;
        
        return(
            <div className='title-wrapper'>
                <h5>{title}</h5>
            </div>
        )
    }
}