import './ball.less';
import React, {Component} from 'react';
import THREE from 'three';
import raf from 'raf';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';


var lights =[];  //光源
var scene;
var camera;
var renderer;
var ball;
var v = 0; //球体下落初始速度
var a = -0.1; //球体下落加速度

export default class Ball extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            disabled : false
        }
        this.isMoving = false;
        this.maxHeight = 100;
    }

    componentDidMount(){
        this.draw();
    }

    draw(){
        this.init();
        this.createBall();
        this.animate();
    }

    //初始化场景、相机、渲染器
    init(){
        //创建场景
        scene = new THREE.Scene();

        //创建相机;
        camera = new THREE.PerspectiveCamera(45, this.refs.main.clientWidth/this.refs.main.clientHeight, 1, 10000);
        camera.position.set(0,0,200);
        camera.up.x=0;
        camera.up.y=1;
        camera.up.z=0;
        camera.lookAt({x:0, y:50, z:0});

        //创建光源
        lights['direct'] = new THREE.DirectionalLight(0xffffff);
        lights['direct'].position.set(40, 0,100);
        lights['amb'] = new THREE.AmbientLight(0x000080);
        scene.add(lights['direct'], lights['amb']);

        //创建渲染器
        let cvs = this.refs.main;
        renderer = new THREE.WebGLRenderer({
            canvas: cvs
        });
        renderer.setSize=(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff, 1.0);

    }

    //创造物体
    createBall(){
        var option = {r:10, segW:20, segH:20};
        let geometry = this.getGeometry('ball',option);
        let material = new THREE.MeshPhongMaterial({color:0x48D1CC,specular:0xffffff,shininess:100});

        ball = new THREE.Mesh(geometry, material);
        ball.position.set(0,this.maxHeight,0);
        ball.r = 10;
        scene.add(ball);
    }

    getGeometry(type, option){
        var geometry = new THREE.BoxGeometry(200,200,100); //默认是长方体
        if('ball' === type){
            geometry = new THREE.SphereGeometry(option.r, option.segW, option.segH);
        }else if('plane' === type){
            geometry = new THREE.PlaneGeometry(option.w, option.h);
        }
        return geometry;
    }

    animate(){
        renderer.render(scene, camera);
        if(!this.isMoving){
            return;
        } 
        
        raf(this.animate.bind(this));
        let self = this;
        this.move();
    }

    move(){
        if (this.isMoving) {
            ball.position.y += v;
            v += a;
            if (ball.position.y <= ball.r) {
                // 落地
                v = -v * 0.8;
            }

            if (Math.abs(v) < 0.001) {
                // 速度低于某个值时，停止跳动
                v=0;
                this.isMoving = false;
                ball.position.y = ball.r;
                this.setState({disabled:false})
            }
        }
    }

    //工具－辅助网格
    initGrid(){
        var helper = new THREE.GridHelper( 1000, 50,0x0000ff, 0x808080  );
        scene.add( helper );
    }

    start(){
        this.isMoving = true;
        ball.position.y = this.maxHeight;
        v = 0;
        this.animate();
        this.setState({disabled:true});
    }

    render(){
        let {disabled} = this.state;
        return(
            <div className='ball-wrapper'>
             <Title {...INTRODUCTION}/>
             <div className='demo-wrapper'>
                <canvas ref='main' width='500' height='200'/>
                <button className={disabled?'disabled btn':'btn'} onClick={this.start.bind(this)} disabled={disabled}>start</button>
            </div>
            <Introduce {...INTRODUCTION}/>
            </div>
        )
    }
}