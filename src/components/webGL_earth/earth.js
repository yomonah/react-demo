import React, {Component} from 'react';
import THREE from 'three';
import raf from 'raf';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';

var scene,camera,renderer;
var box,mouse={};

export default class Earth extends Component{
    
    constructor(props){
        super(props);
        this.state = {
        }
        this.stop=false;
    }

    componentDidMount(){
        this.draw();
        let self = this;
    }

    componentWillUnmount(){
        this.stop = true;
        this.timer && clearInterval(this.timer);
    }

    draw(){
        this.init();
        this.createBox();
        this.animate();
    }

    //初始化场景、相机、渲染器
    init(){
        //创建场景
        scene = new THREE.Scene();

        //创建相机;
        camera = new THREE.PerspectiveCamera(30, this.refs.main.clientWidth/this.refs.main.clientHeight, 1, 1000);

        //创建光源
        var light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 0, 1, 10 ).normalize();
        scene.add(light);

        //创建渲染器
        let cvs = this.refs.main;
        renderer = new THREE.WebGLRenderer({
            canvas:cvs
        });
        renderer.setSize=(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 1.0);

        let self = this;
        document.addEventListener('mousedown',function(e){self.mouseDown(e);},false);
        document.addEventListener('mousemove',function(e){self.mouseMove(e);},false);
        document.addEventListener('mouseup',function(e){self.mouseUp(e);},false);
    }

    //创造外层正四面体
    createBox() {
      let geometry = new THREE.SphereGeometry( 10, 100, 100);
      let img = require('../../img/earth.jpg');

      let material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture(img)});
      box = new THREE.Mesh(geometry, material );
      box.position.z = -50;
      scene.add( box );
    }

    animate(){
        renderer.render(scene, camera);
        if(this.stop){
            return;
        } 
        //旋转运动
        box.rotation.y -= 0.008;
        raf(this.animate.bind(this));
    }

    mouseDown(e){
        e.preventDefault();
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.isMove = true;
    }
    mouseMove(e){
        e.preventDefault();
        if(mouse.isMove){
            box.rotation.y += (e.clientX - mouse.x)*0.0008;
            box.rotation.x += (e.clientY - mouse.y)*0.0008;   
        }
    }
    mouseUp(){
        mouse.isMove = false;
    }

    render(){
        let {disabled} = this.state;
        return(
            <div className='icos-wrapper'>
             <Title {...INTRODUCTION}/>
             <div className='demo-wrapper'>
                <canvas ref='main' width='700' height='500'/>
            </div>
            <Introduce {...INTRODUCTION}/>
            </div>
        )
    }
}
