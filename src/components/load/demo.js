import React, {Component} from 'react';
import Load1 from './circle_load/loading';
import Load2 from './bar_load/load';

export default class Demo extends Component{
    constructor(props){
      super(props);
      this.state = {
      }
    }

    render(){
       return <div>
        <Load2/>
       </div>
    }
}