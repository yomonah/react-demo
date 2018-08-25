import React, {Component} from 'react';
import { Router, Route, hashHistory, IndexRoute,IndexRedirect } from 'react-router';

import Head from './components/head/head';
import Nav from './components/nav/nav';
import Bar from './components/bar/demo';
import ListBanner from './components/list_banner/demo';
import Load from './components/load/demo';
import ClipPath from './components/clip/clip';
import CircleTimer from './components/circle_timer/demo';
import WaterBall from './components/water_ball/demo';
import Pagination from './components/pagination/demo';
import CountNumber from './components/count_num/demo';
import CardBanner from './components/card_banner/demo';
import WebGLBall from './components/webGL_ball/ball';
import WebGLIcos from './components/webGL_icosahedron/icosahedron';
import Lottery from './components/lottery/lottery';
import WeChart from './components/wechart/wechart';
import WebGLImg from './components/webGL_img/main';
import Earth3d from './components/webGL_earth/earth';
import Wanzi from './components/wanzi/wanzi';
import Car from './components/car/car';
import Location from './components/picture/main';
import Wave from './components/wave/wave';
import WaveLine from './components/wave_line/main';
import Mosaic from './components/mosaic/mosaic';
import Filter from './components/filter/filter';
import Test from './components/test/test';
import Family from './components/family_relation/family';

export default class Container extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='app-content'>
                <Router history={hashHistory}>
                <Route path="/" component={Nav}>
                    <IndexRedirect to="/mosaic" />
                    <Route path="/bar" component={Bar}/>
                    <Route path="/listBanner" component={ListBanner}/>
                    <Route path="/load" component={Load}/>
                    <Route path="/clip-path" component={ClipPath}/>
                    <Route path="/circle-timer" component={CircleTimer}/>
                    <Route path='/water-ball' component={WaterBall}/>
                    <Route path='/pagination' component={Pagination}/>
                    <Route path='/count-number' component={CountNumber}/>
                    <Route path='/card-banner' component={CardBanner}/>
                    <Route path='/webGL-ball' component={WebGLBall}/>
                    <Route path='/webGL-icosahedron' component={WebGLIcos}/>
                    <Route path='/lottery' component={Lottery}/>
                    <Route path='/webGL-img' component={WebGLImg}/>
                    <Route path='/webGL-earth' component={Earth3d}/>
                    <Route path='/wanzi' component={Wanzi}/>
                    <Route path='/car' component={Car}/>
                    <Route path='/location' component={Location}/>
                    <Route path='/wave' component={Wave}/>
                    <Route path='/wave-line' component={WaveLine}/>
                    <Route path='/mosaic' component={Mosaic}/>
                    <Route path='/filter' component={Filter}/>
                    <Route path='/test' component={Test}/>
                    <Route path='/family' component={Family}/>
                </Route>
                    {/* <Route path='/wechart' component={WeChart}/> */}
                </Router>
            </div>
        )
    }
}