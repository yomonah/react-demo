import './head.less';
import React, {Component} from 'react';
var imgSrc = require('../../img/head_pic.jpg');

export default class Head extends Component{
    constructor(props){
        super(props);
        this.state = {
          username:'mia yu',
          text:'welcome to visit my personal home page!'
        }
    }

    render(){
        let {username, text} = this.state;
        return(
            <div className='app-head'>
              <div className='roller'>
                <span className='roller-item'>{text}</span>
                <span className='roller-item'>{text}</span>
              </div>
              <img src={imgSrc} alt='photo'/>
              <span className='name'>{username}</span>
            </div>
        )
    }
}