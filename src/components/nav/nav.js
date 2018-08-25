import './nav.less';
import React, {Component} from 'react';
import {Link} from 'react-router';
import Head from '../head/head';

export default class Nav extends Component{
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
            {name:'分页表格',path:'/pagination'},
            {name:'跳动数字', path:'/count-number'},
            {name:'随机翻牌轮播', path:'/card-banner'},
            {name:'WebGL－球体落地运动', path:'/webGL-ball'},
            {name:'WebGL－旋转运动', path:'/webGL-icosahedron'},
            {name:'轮盘抽奖', path:'/lottery'},
            {name:'WebGL - 贴图', path:'/webGL-img'},
            {name:'3D地球', path:'/webGL-earth'},
            {name:'css3动画－樱桃小丸子', path:'/wanzi'},
            {name:'css3动画－旅行的小车', path:'/car'},
            {name:'图片智能对比',path:'/location'},
            {name:'canvas水波浪效果', path:'/wave'},
            {name:'canvas马赛克画笔',path:'/mosaic'},
            {name:'简单滤镜功能',path:'/filter'},
            {name:'家族图谱',path:'/family'}
            // {name:'开发测试', path:'/test'}
            // {name:'canvas无限运动波浪线', path:'/wave-line'},
        ].reverse();
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
              <Head/>
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