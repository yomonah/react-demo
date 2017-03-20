import './nav.less';
import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Head extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.pathProps = [
            {name:'柱图', path:'/bar'},
            {name:'轮播列表', path:'/listBanner'},
            {name:'进度条', path:'/load'},
            {name:'剪裁遮罩', path:'/clip-path'},
            {name:'环形倒计时', path:'/circle-timer'},
            {name:'水波球', path:'/water-ball'},
            {name:'分页表格',path:'/pagination'}
        ]
    }

    getLinks(){
        let link = this.pathProps && this.pathProps.map((item,i) => {
            return (<li key={'link'+i} className='menu-item'>
                        <Link to={item.path} activeClassName="active">{item.name}</Link>
                    </li>);
        })
        return link;
    }

    render(){
        let links = this.getLinks();
        return(
            <div className='app-wrapper'>
              <div className='component-wrapper'>
                 {this.props.children}
               </div>
               <div className='menu-wrapper'>
                <ul className='link-wrapper'>
                  {links}
                 </ul>
              </div>
            </div>
        )
    }
}