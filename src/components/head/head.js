import './head.less';
import React, {Component} from 'react';

export default class Head extends Component{
    constructor(props){
        super(props);
        this.state = {
          username:'MIA YU',
          title:'REACT DEMO'
        }
    }

    render(){
        let {username, title} = this.state;
        return(
            <div className='app-head'>
              <span className='title'>{title}</span>
              <span className='name'>{username}</span>
              <a className='jianshu' href='http://www.jianshu.com/u/b344d2977570' target="_blank">SIMPLE BOOK</a>
              <a className='blog' href='https://yomonah.github.io/' target="_blank">BLOG</a>
              <a className='home'>HOME</a>

              {/*} <div className='roller'>
                <span className='roller-item'>{text}</span>
                <span className='roller-item'>{text}</span>
              </div>*/}
            </div>
        )
    }
}