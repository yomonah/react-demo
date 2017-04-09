import React, {Component} from 'react';
import THREE from 'three';
import raf from 'raf';
import Title from '../../../components/title/title';
import Introduce from '../../../components/introduce/introduce';
import {INTRODUCTION} from './introduce';


var lights =[];  //光源
var scene,camera,renderer;
var box,group=new THREE.Group(),balls=[],mouse={};

export default class Icosahedron extends Component{
    
    constructor(props){
        super(props);
        this.state = {
        }
        this.stop=false;
    }

    componentDidMount(){
        this.draw();
        let self = this;
        this.timer = setInterval(self.explode.bind(this), 1000);
    }

    componentWillUnmount(){
        this.stop = true;
        this.timer && clearInterval(this.timer);
    }

    draw(){
        this.init();
        this.createBox();
        this.createBall();
        this.animate();
        this.explode();
    }

    //初始化场景、相机、渲染器
    init(){
        //创建场景
        scene = new THREE.Scene();

        //创建相机;
        camera = new THREE.PerspectiveCamera(45, this.refs.main.clientWidth/this.refs.main.clientHeight, 1, 10000);
        camera.position.set(0,0,500);
        camera.up.x=0;
        camera.up.y=1;
        camera.up.z=0;
        camera.lookAt({x:0, y:0, z:0});

        //创建光源
        lights['direct'] = new THREE.DirectionalLight(0x43CD80);
        lights['direct'].position.set(150, 0,400);
        lights['amb'] = new THREE.AmbientLight(0x1C86EE);
        scene.add(lights['direct'], lights['amb']);

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

    //创造外层二十面体
    createBox() {
        var geometry = new THREE.IcosahedronGeometry(150, 1);
        let material = new THREE.MeshLambertMaterial({
            wireframe: true,
            wireframeLinewidth: 1,
            opacity: 0.3,
            transparent: true
        });
        box = new THREE.Mesh(geometry, material);
        box.position.set(0,0,0)
        scene.add(box);
    }

    createBall(){
        var geometry = new THREE.SphereGeometry(3, 16, 16);
        let material = new THREE.MeshPhongMaterial({color:0x48D1CC,specular:0xffffff,shininess:100});
        for(var i = 0; i< 80; i++){
            var ball = new THREE.Mesh(geometry, material);
            ball.toX=0;
            ball.toY=0;
            ball.toZ=0;
            group.add(ball);
            balls.push(ball);
        }
        scene.add(group);
    }

    animate(){
        renderer.render(scene, camera);
        if(this.stop){
            return;
        } 
        //旋转运动
        box.rotation.z -= 0.01;
        box.rotation.y -= 0.01;
        var len = balls.length;
        for(var i =0; i<len; i++){
            group.children[i].position.x += (balls[i].toX-group.children[i].position.x)*0.05;
            group.children[i].position.y += (balls[i].toY-group.children[i].position.y)*0.05;
            group.children[i].position.z += (balls[i].toZ-group.children[i].position.z)*0.05;
        }

        raf(this.animate.bind(this));
    }

    explode(){
        var len = balls.length;
        for(var i = 0; i<len; i++){
            var phi = Math.acos( -1 + ( 2 * i ) / len );
            var theta = Math.sqrt( len * Math.PI ) * phi;
            balls[i].toX = 130*Math.random() * Math.cos( theta ) * Math.sin( phi );
            balls[i].toY = 130*Math.random() * Math.sin( theta ) * Math.sin( phi );
            balls[i].toZ = 130*Math.random() * Math.cos( phi );
        } 
    }

    mouseDown(e){
        e.preventDefault();
        mouse.x = e.clientX;
        group.x = e.clientX;
        mouse.y = e.clientY;
        group.y = e.clientY;
        mouse.isMove = true;
        group.isMove = true;
    }
    mouseMove(e){
        e.preventDefault();
        if(mouse.isMove){
            box.rotation.y += (e.clientX - mouse.x)*0.0008;
            box.rotation.x += (e.clientY - mouse.y)*0.0008;   
            group.rotation.x += (e.clientY - mouse.y)*0.0008;
            group.rotation.y += (e.clientX - mouse.x)*0.0008;
        }
    }
    mouseUp(){
        mouse.isMove = false;
    }

    render(){
        let {disabled} = this.state;
        return(
            <div className='icos-wrapper'>
            } <Title {...INTRODUCTION}/>
             <div className='demo-wrapper'>
                <canvas ref='main' width='700' height='500'/>
            </div>
            <Introduce {...INTRODUCTION}/>
            </div>
        )
    }
}
