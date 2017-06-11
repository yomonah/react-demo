import React, {Component} from 'react';
import './alert.less';

export default class Alert extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  closePop(){
    let {duration, close} = this.props;
    this.timer = setTimeout(close.bind(this, false), duration);
  }

  componentDidUpdate(nextProps){
    if(nextProps.show !== this.props.show && nextProps.show === false){
      this.closePop();
    }
  }

  componentWillUnmount(){
    this.timer && clearTimeout(this.timer);
  }

  render() {
    let {text, type, show} = this.props;
    let cls = show ? 'show':'hide';
    let icon = {
      success:'fa fa-check',
      warn:'fa fa-warning',
      error:'fa fa-close',
      info:'fa fa-info'
    }
    return (
      <div>
        {show && <div className='alert-container'>
          <div className={'alert-box '+cls}>
            <div className = {'text-box alert-'+type}>
              <i className={icon[type]}/>
              <span>{text}</span>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

Alert.defaultProps= {
    duration:3000,  //动效时长
    type:'success', //还有warn,error,info
    text:'',
    show:false
}