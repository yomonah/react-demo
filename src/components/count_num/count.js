import React, {Component} from 'react';
import raf from 'raf';

export default class Count extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.begin
        }
    }

	componentDidMount() {
		this.start = Date.now();
		raf(this.animate.bind(this));
	}

	componentWillReceiveProps(nextProps){
		this.start = Date.now();
		this.stop = false;
		// 保存上一次的数据
		this.value = this.state.value;
		raf(this.animate.bind(this));
	}

	componentWillUnmount(){
        this.stop = true;
    }

	animate() {
		if (this.stop){
			return;
		}
		raf(this.animate.bind(this));
		this.draw()
	}

	draw() {
		let {duration, value} = this.props;
        let end = value;
		var begin = this.value || this.props.begin;

		var now = Date.now()
		if (now - this.start >= duration){
			this.stop = true;
		}

		var percentage = (now - this.start) / duration;
		percentage = percentage > 1 ? 1 : percentage;

        var val = begin + (end - begin) * percentage;
		this.setState({ value: val });
	}

	render() {
		var value = Math.round(this.state.value);

		if(this.props.thousandsType){
            value += '';
		    value = value.replace(/(?=\B(?:\d{3})+(?!\d))/g,',');
			let valueArr = [];
			for(var i = 0; i < value.length; i++){
					valueArr[i] = <i key={i}>{value[i]}</i>
			}
			value = <span>{valueArr}</span>;
		}

		return (
			<span className="counter">{value}</span>
		);
	}
}
Count.defaultProps={
    duration:500,
    begin:0,
    thousandsType: false
}

