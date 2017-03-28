import React, {Component} from 'react';
import BannerList from './banner/bannerList';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';

export default class Demo extends Component{
    constructor(props){
      super(props);
      this.state = {
          data:[
                [
                    {text:'春装',img:require('./banner/img/1.jpg')},
                    {text:'学院风',img:require('./banner/img/2.jpg')},
                    {text:'气质长裙',img:require('./banner/img/3.jpg')}
                ],
                [
                    {text:'春装',img:require('./banner/img/4.jpg')},
                    {text:'学院风',img:require('./banner/img/5.jpg')},
                    {text:'气质长裙',img:require('./banner/img/6.jpg')}
                ],
                [
                    {text:'春装',img:require('./banner/img/7.jpg')},
                    {text:'学院风',img:require('./banner/img/8.jpg')},
                    {text:'气质长裙',img:require('./banner/img/9.jpg')}
                ],
                [
                    {text:'春装',img:require('./banner/img/10.jpg')},
                    {text:'学院风',img:require('./banner/img/11.jpg')},
                    {text:'气质长裙',img:require('./banner/img/12.jpg')}
                ],
                [
                    {text:'春装',img:require('./banner/img/13.jpg')},
                    {text:'学院风',img:require('./banner/img/14.jpg')},
                    {text:'气质长裙',img:require('./banner/img/15.jpg')}
                ],
            ],
      }
    }

     getProps(){
        let {data}=  this.state;
        if(!data){
            return;
        }
        var props={
            data: data,
            activeIndex: 2, 
            duration:5,
            transitionDuration:0.5  //翻牌动效时长
        };
        return props;
    }

    render(){
        let {title, context} = INTRODUCTION;
        return <div>
            <Title title={title}/>
            <div className='demo-wrapper big-demo'>
                <BannerList {...this.getProps()}/>
            </div>
            <Introduce context={context}/>
        </div>
    }
}