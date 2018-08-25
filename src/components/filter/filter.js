import React, {Component} from 'react';
import './filter.less';
// import Title from '../../../components/title/title';
// import Introduce from '../../../components/introduce/introduce';
// import {INTRODUCTION} from './introduce';
var demoImg = require('../../img/effect.jpg');

export default class Filter extends Component{
  constructor(props){
    super(props);
    this.state={
      imgUrl :'',
      activeCls:''
    }
    this.uploadFlag = false;
  }

  addImg(){
    let files = this.refs.insertImg.files;
    this.insertImg(files);
  }

  insertImg(files){
    let reader =new FileReader();
    let self = this;
    if(files && files[0]){
      var fileName = files[0].name;//获取图片名称
      reader.readAsDataURL(files[0]);
      reader.onload =function(){
        let imgUrl = this.result;
        self.setState({imgUrl});
        self.uploadFlag = true;
        self.refs.insertImg.value='';//解决onchange事件之执行一次的问题
      }
    }else{
      alert('图片获取失败');
    }
  }

  close(){
    if(this.uploadFlag){
      this.uploadFlag = false;
      this.setState({imgUrl:''});
    }
  }

  handleDragOver(e){
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop(e){
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    var files = e.dataTransfer.files || e.target.files;
    //先清空之前的img
    this.refs.preview.getAttribute('src') && this.refs.preview.removeAttribute("src");
    this.insertImg(files);
  }

  getBlock(){
    var props = this.props.filterProp;
    let item = props && props.map((item,index)=>{
      return (
        <button key={'filter-item-'+index} onClick={this.filter.bind(this,item.name)}>
          <div>
              <img className={'btn-img '+item.name} src={demoImg} width='50px'></img>
          </div>
          <p>{item.value}</p>
        </button>
      )
    })
    return item;
  }

  filter(cls){
    this.setState({activeCls:cls});
  }

  render(){
    let {imgUrl,activeCls} = this.state;
    let previewShow = imgUrl?'inline-block':'none';
    var filterBlock = this.getBlock();
    return(
      <div className='filter-wrapper'>
        {/* <Title {...INTRODUCTION}/> */}
        <div className='demo-wrapper'>
          <div ref='file-wrapper' className='file-area'  onDrop={(e)=>this.handleDrop(e)} onDragOver={(e)=>this.handleDragOver(e)}>
              <a className="file fa fa-plus">
                  <p>支持拖拽上传</p>
                  <input className='input-img' type='file' accept='image/*' ref='insertImg' onChange={this.addImg.bind(this)}/>
                  <div className="img-div"><img ref='preview' style={{display:previewShow}} className={'preview '+activeCls} src={imgUrl} width='100%'/></div>
                  <i className='close fa fa-close' style={{display:previewShow}}  title='关闭' onClick={this.close.bind(this)}></i>
                  {/* <i className='save fa fa-download' style={{display:previewShow}} title='下载' onClick={this.saveImg.bind(this)}></i> */}
              </a>
          </div>
          <div className='btn-group' ref='btn_group'>
            {this.getBlock()}
          </div>
          <canvas className={activeCls} ref='drawUtil'></canvas>
        </div>
        {/* <Introduce {...INTRODUCTION}/> */}
      </div>
    )
  }
}
Filter.defaultProps= {
  filterProp:[
    {name:'normal',value:'原图'},
    {name:'black',value:'黑白经典'},
    {name:'old',value:'旧时光'},
    {name:'pink',value:'阳光派对'},
    {name:'roll',value:'胶卷'},
    {name:'sun',value:'红粉佳人'},
    {name:'japen',value:'日系清新'},
    {name:'beautiful',value:'唯美风'},
    {name:'dark',value:'灰暗风'},
    {name:'blurry',value:'模糊世界'},
    {name:'invert',value:'反转色'}
  ]
}