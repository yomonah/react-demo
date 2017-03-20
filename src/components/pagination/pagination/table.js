import React, {Component} from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }  

    getTableHead(){
        let {columns, headHeight} = this.props;
        let head = columns && columns.map((item,i)=>{
            return <div key={'head'+i} className='head-cell' style={{'width':item.width, 'textAlign':item.align, 'height':headHeight}}>{item.title}</div>
        })
        return head;
    }

    getTableBody(){
        let {data, columns,emptyText,dataHeight} = this.props;
        let item =[];
        if(data && data.length){
           item= data.map((item,index)=>{
                return <div key={'item'+index} className={index%2?'item odd':'item even'}>
                    {columns && columns.map((it,i)=>{
                        return <li key={'itemLi'+i} className='item-cell' style={{'width':it.width, 'textAlign':it.align, 'height':dataHeight}}>{item[it.dataKey]}</li>
                    })}
                </div>
            })
        }else{
            item = (<div className='empty-warn'>{emptyText}</div>);
        }
        return item;
    }

    render() {
        return (
        <div>
            <div className='table-head'>
                {this.getTableHead()}
            </div>
            <div className='table-body'>
                {this.getTableBody()}
            </div>
        </div>
        );
    }
}


module.exports = Table;