import React, {Component} from 'react';

export default class Alert extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    let {content, type} = this.props;
    return (
      <div className='alert-container'>
        <div className={'alert-box alert-'+type}>
          {content}
        </div>
      </div>
    );
  }
}

Alert.defaultProps= {
    duration:3000,  //动效时长
    content:'成功',
    type:'success'
}