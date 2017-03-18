import React, {Component} from 'react';
import List from './list';
import Title from '../../../components/title/title';
import {INTRODUCTION} from './introduce';

export default class Demo extends Component{
    constructor(props){
      super(props);
      this.state = {
          data:[
            {id:0, value:0.2, data:[12,23,15,35,8,44,62,11,2,13,24,32,12,23,15,35,8,44,62,11,2,13,24,32], name:'Tonny', title:'Today is Sunny day', time:'08:23:30'},
            {id:1, value:0.76, data:[1,19,35,8,28,44,62,13,2,33,21,38,1,19,35,8,28,44,62,13,2,33,21,38], name:'Sanny', title:'Today is Rainy day', time:'11:23:30'},
            {id:2, value:0.33, data:[42,5,15,35,8,44,25,11,2,19,24,37,42,5,15,35,8,44,25,11,2,19,24,37], name:'Miky', title:'Tomorrow is SunDay', time:'14:23:30'},
            {id:3, value:0.25, data:[18,23,45,5,38,14,32,11,2,13,24,32,18,23,45,5,38,14,32,11,2,13,24,32], name:'Lily', title:'Please take a look', time:'09:23:30'},
            {id:4, value:0.93, data:[12,23,15,35,8,44,62,11,2,13,24,32,12,23,15,35,8,44,62,11,2,13,24,32], name:'Nick', title:'Money is no more money', time:'20:23:30'},
            {id:5, value:0.54, data:[1,19,35,8,28,44,62,13,2,33,21,38,1,19,35,8,28,44,62,13,2,33,21,38], name:'Arya', title:'What are you talking about', time:'16:23:30'}
        ],
      }
    }

    getProps(){
        let props = {
            data:this.state.data,
            duration:5000,
            activeIndex:2
        }
        return props;
    }

    render(){
       let listProps = this.getProps();
       return <div>
                <Title {...INTRODUCTION}/>
                <div className='demo-wrapper'>
                    <List {...listProps}/>
                </div>
            </div>
    }
}