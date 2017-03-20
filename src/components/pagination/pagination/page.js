import React, {Component} from 'react';

class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const props = this.props;
        return (
        <li className={'page '+props.cls} onClick={props.onClick}>
            <a>{props.pager}</a>
        </li>
        );
    }
}


module.exports = Pager;