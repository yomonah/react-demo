import React, {Component} from 'react';

export default class Filter extends Component{
  constructor(props){
    super(props);
  }

  

  dragover(e){
    console.log('dragover');
    e = e || window.event;
    e.preventDefault();
    debugger
    var files = e.dataTransfer.files;
    // //先清空之前的img
    this.refs.preview.getAttribute('src') && this.refs.preview.removeAttribute("src");
    this.insertImg(files);
  }

  drag(e){
    debugger
    console.log('drag');
    e = e || window.event;
    e.preventDefault();
    var files = e.dataTransfer.items[0];
    //先清空之前的img
    this.refs.preview.getAttribute('src') && this.refs.preview.removeAttribute("src");
    this.insertImg(files);
  }


  render(){
    var style={
      width:'200px',
      height:'200px',
      border:'1px solid red'
    }
    return(
      <div className='filter-wrapper'>
        <input ref='test' type='file' className='drag-wrapper' style={style} onDrag={this.drag.bind(this)} onDragOver={this.dragover.bind(this)}/>
      </div>
    )
  }
}