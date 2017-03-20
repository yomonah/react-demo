import React, {Component} from 'react';
import PageTable from './pagination/pagination';
import Title from '../../../components/title/title';
// import {INTRODUCTION} from './introduce';

export default class Demo extends Component{
    constructor(props){
      super(props);
      this.state = {
           data:[
            {age:10, userName:'A', email:'112565@qq.com', address:'杭州市余杭区'},
            {age:11, userName:'B', email:'13214@qq.com', address:'北京市朝阳区'},
            {age:12, userName:'C', email:'1553463@qq.com', address:'上海市静安区'},
            {age:13, userName:'D', email:'144t34@qq.com', address:'杭州市西湖区'},
            {age:14, userName:'E', email:'153622@qq.com', address:'金华市金东区'},
            {age:15, userName:'F', email:'197657@qq.com', address:'江苏省'},
            {age:16, userName:'G', email:'6253231@qq.com', address:'福建省福州市'},
            {age:17, userName:'H', email:'523561@qq.com', address:'四川省成都市'},
            {age:18, userName:'I', email:'1455324@qq.com', address:'杭州市余杭区'},
            {age:19, userName:'J', email:'1453453@qq.com', address:'上海市'},
            {age:20, userName:'K', email:'1453435@qq.com', address:'杭州市余杭区'},
            {age:10, userName:'L', email:'112565@qq.com', address:'杭州市余杭区'},
            {age:11, userName:'M', email:'13214@qq.com', address:'北京市朝阳区'},
            {age:12, userName:'N', email:'1553463@qq.com', address:'上海市静安区'},
            {age:13, userName:'O', email:'144t34@qq.com', address:'杭州市西湖区'},
            {age:14, userName:'P', email:'153622@qq.com', address:'金华市金东区'},
            {age:15, userName:'Q', email:'197657@qq.com', address:'江苏省'},
            {age:16, userName:'R', email:'6253231@qq.com', address:'福建省福州市'},
            {age:17, userName:'S', email:'523561@qq.com', address:'四川省成都市'},
            {age:18, userName:'T', email:'1455324@qq.com', address:'杭州市余杭区'},
            {age:19, userName:'U', email:'1453453@qq.com', address:'上海市'},
            {age:20, userName:'V', email:'1453435@qq.com', address:'杭州市余杭区'},
        ],
      }
    }

    getProps(){
        let columns = [{dataKey:'userName', title:'姓名', width:'20%', align:'center'},
            {dataKey:'age', title:'年龄',width:'20%', align:'center'},
            {dataKey:'email', title:'邮箱',width:'30%', align:'center'},
            {dataKey:'address', title:'地址', width:'30%', align:'center'}
        ];
        let props = {
            width:500,
            headHeight:50,
            dataHeight:40,
            pageSize:5,
            domain:15,
            emptyText:'暂无数据',
            barPosition:'center',
            type:'normal',
            data:this.state.data,
            columns:columns,
        }
        return props;
    }

    render(){
       let props = this.getProps();
       return <div>
                {/*<Title {...INTRODUCTION}/>*/}
                <div className='demo-wrapper'>
                    <PageTable {...props}/>
                </div>
            </div>
    }
}