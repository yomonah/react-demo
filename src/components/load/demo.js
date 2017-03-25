import React, {Component} from 'react';
import Load1 from './circle_load/loading';
import Load2 from './bar_load/load';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';

export default class Demo extends Component{
    constructor(props){
      super(props);
      this.state = {
      }
    }

    render(){
       return <div>
         <Title {...INTRODUCTION}/>
         <div className='demo-wrapper'>
          <Load2/>
          </div>
          <Introduce {...INTRODUCTION}/>
       </div>
    }
}