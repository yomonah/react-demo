import React, {Component} from 'react';
import './wanzi.less';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';

export default class Main extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  render(){
    return(
      <div className='wanzi-wrapper'>
        <Title {...INTRODUCTION}/>
            <div className='demo-wrapper'>
              <div className='wanzi'>
                  <div className='head'></div>
                  <div className='hair'>
                      <div className='hair-bottom'></div>
                      <div className='chi chi-1'></div>
                      <div className='chi chi-2'></div>
                      <div className='chi chi-3'></div>
                      <div className='chi chi-4'></div>
                      <div className='chi chi-5'></div>
                      <div className='chi chi-6'></div>
                  </div>
                  <div className='hair-1'></div>
                  <div className='hair-2'></div>
                  <div className='hair-3'></div>
                  <div className='eyes'>
                      <div className='meimao left-meimao'></div>
                      <div className='eye left-eye'>
                          <div className='eye-ball'></div>
                      </div>
                      <div className='meimao right-meimao'></div>
                      <div className='eye right-eye'>
                          <div className='eye-ball'></div>
                      </div>
                  </div>
                  <div className='left-ear'></div>
                  <div className='right-ear'></div>
                  <div className='face left-face'></div>
                  <div className='face right-face'></div>
                  <div className='left-shy'>
                      <div className='shy1'></div>
                      <div className='shy2'></div>
                      <div className='shy3'></div>
                  </div>
                  <div className='right-shy'>
                      <div className='shy1'></div>
                      <div className='shy2'></div>
                      <div className='shy3'></div>
                  </div>
                  <div className='mouth'></div>
                </div>

                <div className='text'>鼠标放她大脸上</div>
            </div>
          <Introduce {...INTRODUCTION}/>
      </div>
    )
  }
}