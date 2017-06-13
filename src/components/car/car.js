import React, {Component} from 'react';
import './car.less';
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
      <div className='car-wrapper'>
        <Title {...INTRODUCTION}/>
            <div className='demo-wrapper'>
              <div className='car'>
                  <div className='car-body'>
                      <div className='adorn1'></div>
                      <div className='adorn2'></div>
                      <div className='adorn3'></div>
                  </div>
                  <div className='tube'></div>
                  <div className='wheel left-wheel'>
                      <div className='line1'></div>
                      <div className='line2'></div>
                      <div className='line3'></div>
                      <div className='line4'></div>
                      <div className='line5'></div>
                  </div>
                  <div className='wheel right-wheel'>
                      <div className='line1'></div>
                      <div className='line2'></div>
                      <div className='line3'></div>
                      <div className='line4'></div>
                      <div className='line5'></div>
                  </div>
                  <div className='car-head'>
                      <div className='left-wind'></div>
                      <div className='right-wind'></div>
                  </div>
                  <div className='ball1'></div>
                  <div className='ball2'></div>
                  <div className='ball3'></div>
                  <div className='weiqi1'></div>
                  <div className='weiqi2'></div>
              </div>
              <div className='street-wrap'>
                  <div className='street street1'>
                      <div className='stone'>
                          <div className='stone1'></div>
                          <div className='stone2'></div>
                          <div className='stone3'></div>
                          <div className='stone4'></div>
                      </div>
                  </div>
                  <div className='street street2'>
                      <div className='stone'>
                          <div className='stone1'></div>
                          <div className='stone2'></div>
                          <div className='stone3'></div>
                          <div className='stone4'></div>
                      </div>
                  </div>
              </div>
              <div className='cloud-wrap'>
                    <div className='cloud1'></div>
                    <div className='cloud2'></div>
                    <div className='cloud3'></div>
                    <div className='cloud4'></div>
              </div>
            </div>
          <Introduce {...INTRODUCTION}/>
      </div>
    )
  }
}