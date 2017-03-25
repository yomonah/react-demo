require('./pagination.less');
import React, {Component} from 'react';
import Page from './page';
import Table from './table';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current:1
        };
        this.pageTotalSize = 0;
    }

    componentWillMount(){
        let {pageSize, data,domain} = this.props;
        if(data && data.length>0 && pageSize>0){
            this.pageTotalSize = Math.ceil(data.length/pageSize);
        }
    }

    prev(){
        let {current} = this.state;
        let prevPager = current-1?current-1:current;
        this.setState({current:prevPager});
    }

    next(){
        let {current} = this.state;
        let nextPager = current+1>this.pageTotalSize? this.pageTotalSize:current+1;
        this.setState({current:nextPager});
    }

    first(){
        this.setState({current:1});
    }
    
    last(){
        this.setState({current:this.pageTotalSize});
    }

    handlePage(pager){
        this.setState({current:pager});
    }

    getTable(){
        let {data, columns, pageSize, emptyText, headHeight, dataHeight} = this.props;
        let {current} = this.state;
        let startIndex = (current-1)*pageSize,
            endIndex = current*pageSize;

        let props={
            data:data.slice(startIndex,endIndex),
            columns:columns,
            emptyText:emptyText,
            headHeight:headHeight,
            dataHeight:dataHeight
        }
        return <Table {...props}/>
    }

    getPaginationBar(){
        let {current} = this.state;
        let {pageSize, data, domain} = this.props;
        //计算当前页码段 
        var currentSection = Math.ceil(current/domain);

        let pageList = [];
        for(let i=domain;i>0;i--){
            let pager = domain*currentSection-i+1;
            if(pager <= this.pageTotalSize){
                pageList.push(<Page key={'page'+i} cls={pager===current ?'active':''} pager={pager} onClick={this.handlePage.bind(this,pager)}/>);
            }
        }
        return pageList;
    }

    getSimpleBar(){
        let {current} = this.state;
        return (<div className='simple-bar'><span className='cur-page'>{current}</span>/<span>{this.pageTotalSize}</span></div>);
    }

    render() {
        let {current} = this.state;
        let {data, width, barPosition, type} =this.props;
        return (
            <div className="pagination-wrapper" style={{'width':width}}>
                <div className='pagination-data'>
                    {this.getTable()}
                </div>
               {type ==='simple' ?
               data && data.length>0 && <div className='pagination-bar' style={{'textAlign':barPosition}}>
                    {this.getSimpleBar()}
                    <Page cls={current===1?'disabled pre':'pre'} onClick={this.prev.bind(this)}/>
                    <Page cls={current===this.pageTotalSize?'disabled next':'next'} onClick={this.next.bind(this)}/>
                </div>:
                data && data.length>0 && <div className='pagination-bar' style={{'textAlign':barPosition}}>
                    <Page cls={current===1?'disabled first':'first'} onClick={this.first.bind(this)}/>
                    <Page cls={current===1?'disabled pre':'pre'} onClick={this.prev.bind(this)}/>
                    {this.getPaginationBar()}
                    <Page cls={current===this.pageTotalSize?'disabled next':'next'} onClick={this.next.bind(this)}/>
                    <Page cls={current===this.pageTotalSize?'disabled last':'last'} onClick={this.last.bind(this)}/>
                </div>
            }
            </div>
        );
    }
}
Pagination.defaultProps={
    width:500,  //最外层容器宽
    headHeight:50, //表头高度
    dataHeight:40,  //表身每条数据高度
    pageSize:3, //一页显示几条
    domain:5,  //指定上一页与下一页间显示几页页码
    emptyText:'暂无数据',
    barPosition:'center',  //分页栏的位置
    type:'normal'  //分页类型，有normal和simple两种选项
}
module.exports = Pagination;
