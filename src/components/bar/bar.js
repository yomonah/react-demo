import React, {Component} from 'react';
var d3 = require('d3'); //如果用import导入会报错

export default class Bar extends Component{
    constructor(props){
      super(props);
      this.state = {
      };
      this.svg = null;
    }

    componentDidUpdate(){
        let props = this.props;
        if(!props.data){
            return;
        }
        if(!this.svg){
            this._createBar(props);
        }else{
            this._updateBar(props);
        } 
    }

    componentDidMount(){
        let props = this.props;
        if(!props.data){
            return;
        }
        this._createBar(props);
    }

    _createBar(props){
        let {width, height} = props;
        this.svg = d3.select(".bar-container").append("svg")  
                .attr("width",width)  
                .attr("height",height);  
        this._drawBar(props);
    }

    _drawBar(props){
        let {margin,data,width, height,rectPadding, fillColor, duration, strokeColor, textColor, textSize, label,delay,xAxisConfig,yAxisConfig} = props;

        var contentWidth = width - margin.left - margin.right,
            contentHeight = height - margin.top - margin.bottom,
            barWidth = data && data.length && Math.floor(contentWidth / data.length) - rectPadding;

    
        //x轴的比例尺 
       var xScale = d3.scaleBand() 
                        .domain(d3.range(data.length))
                        .range([0,contentWidth]);
        //y轴的比例尺                     
        var yScale = d3.scaleLinear()
                        .domain([0,d3.max(data)])
                        .range([contentHeight,0]);  
        //定义x轴       
        var xAxis = d3.axisBottom().scale(xScale);
        //定义y轴
        var yAxis = d3.axisLeft().scale(yScale);

        this._createRect(props, xScale, yScale, barWidth, contentHeight);  //绘制矩形
        this._createText(props, xScale, yScale, barWidth);   //绘制文字
        
        //显示坐标轴 && 配置坐标轴属性
        xAxisConfig.display && this.svg.append("g")  
            .attr("class","x-axis")  
            .attr("transform","translate("+margin.left+","+(height-margin.bottom)+")") 
            .call(xAxis)
            .selectAll('path').attr('stroke',xAxisConfig.lineColor);
        this.svg.select('.x-axis').selectAll('line').attr('stroke',xAxisConfig.lineColor);
        this.svg.select('.x-axis').selectAll('text').attr('fill',xAxisConfig.fontColor);
              

        yAxisConfig.display && this.svg.append("g")  
            .attr("class","y-axis")  
            .attr("transform","translate("+margin.left+","+margin.top+")")  
            .call(yAxis)
            .selectAll('path').attr('stroke',xAxisConfig.lineColor);
        this.svg.select('.y-axis').selectAll('line').attr('stroke',xAxisConfig.lineColor);
        this.svg.select('.y-axis').selectAll('text').attr('fill',xAxisConfig.fontColor);

    }

    _createRect(props, xScale, yScale, barWidth, contentHeight){
        let {data, margin, rectPadding, duration, delay, fillColor, strokeColor} = props;
        this.svg.selectAll("rect")  
           .data(data)  
           .enter()  
           .append("rect")
           .attr("transform","translate("+margin.left+","+margin.top+")")
           .attr("x", function(d,i){
              return xScale(i)+rectPadding/2;
           })
           .attr("y",function(d){  
              var min = yScale.domain()[0];
              return yScale(min); 
           })
           .attr("width", barWidth)
           .transition()
           .duration(duration)
           .ease(d3.easeLinear)   
           .attr('height',function(d){
               return contentHeight-yScale(d);
           })
           .attr("y",function(d){  
                return yScale(d);  
           })
           .delay(function(d,i){return delay*i})  //每根柱图之间的时间差
           .attr("fill",fillColor)
           .attr('stroke',strokeColor);  
    }

    _createText(props, xScale, yScale, barWidth){
        let {data, margin, rectPadding, textSize, textColor, duration, label} = props;
        this.svg.selectAll("text")    //可配置是否需要显示文字
            .data(data)  
            .enter().append("text") 
            .attr("transform","translate(" + margin.left + "," + margin.top + ")")
            .attr("x", function(d,i){  
                return xScale(i) + rectPadding/2;  
            })  
            .attr("y",function(d){  
                return yScale(d) ;  
            })  
            .attr("dx", function(){  
                return (barWidth-textSize)/2;  
            })  
            .attr("dy", -6)  
            .attr("text-anchor", "begin")  
            .attr("font-size",textSize)  
            .attr("fill",textColor)
            .transition()
            .delay(duration)
            .text(function(d,i){ 
                if(label && d){
                    return d;  
                } 
                return;
            }); 
    }
    
    _updateBar(props){
        let {data,width, height,rectPadding, fillColor, duration, strokeColor, textColor, textSize, label,delay,xAxisConfig,yAxisConfig} = props;

        var margin = {top: 20, right: 20, bottom: 30, left: 20},
            contentWidth = width - margin.left - margin.right,
            contentHeight = height - margin.top - margin.bottom,
            barWidth = data && data.length && Math.floor(contentWidth / data.length) - rectPadding;

        if(!data || !this.svg){
            return;
        }
        this.svg.attr("width",props.width)  
                .attr("height",props.height); 

        var xScale = d3.scaleBand() 
                        .domain(d3.range(data.length))
                        .range([0,contentWidth]);
        //y轴的比例尺                     
        var yScale = d3.scaleLinear()
                        .domain([0,d3.max(data)])
                        .range([contentHeight,0]);  
        //定义x轴       
        var xAxis = d3.axisBottom().scale(xScale);
        //定义y轴
        var yAxis = d3.axisLeft().scale(yScale);

        this._updateRect(data, rectPadding, xScale, duration, contentHeight, yScale);

        this._updateText(data, xScale, rectPadding, duration, yScale, barWidth, textSize, label);    
        //更新坐标轴
        xAxisConfig.display && this.svg.select(".x-axis")  
            // .attr("transform","translate("+margin.left+","+(height-margin.bottom)+")") 
            .call(xAxis)
            .selectAll('path').attr('stroke',xAxisConfig.lineColor);
        
        yAxisConfig.display && this.svg.select(".y-axis")
            // .attr("transform","translate("+margin.left+","+margin.top+")")  
            .call(yAxis)
            .selectAll('path').attr('stroke',xAxisConfig.lineColor);
    }

    _updateRect(data, rectPadding, xScale, duration, contentHeight, yScale){
        this.svg.selectAll("rect")  
           .data(data) 
           .attr("x", function(d,i){
              return xScale(i)+rectPadding/2;
           })
           .transition()
           .duration(duration)
           .ease(d3.easeLinear) 
           .attr('height',function(d){
               return contentHeight-yScale(d);
           })
           .attr("y",function(d){  
                return yScale(d);  
           })
    }

    _updateText(data, xScale, rectPadding, duration, yScale, barWidth, textSize, label){
        this.svg.selectAll("text")    
            .data(data)  
            .attr("x", function(d,i){  
                return xScale(i) + rectPadding/2;  
            }) 
            .transition()
            .duration(duration)
            .ease(d3.easeLinear) 
            .attr("y",function(d){  
                return yScale(d) ;  
            })  
            .attr("dx", function(){  
                return (barWidth-textSize)/2;  
            })  
            .text(function(d,i){ 
                if(label && d){
                    return d;  
                } 
                return;
            }); 
    }


    render(){ 
        return(
            <div className='bar-container'>
            </div>
        );
    }
}

Bar.defaultProps= {
    duration:1000,  //动效时长
    width:600,  
    height:300,
    fillColor:"rgba(218,165,32,0.7)",  //柱子填充色
    strokeColor:'#DAA520',    //柱子外边框色
    textColor:'#fff',   //字体颜色
    textSize:14,   //字体大小
    rectPadding:6,   //柱子间隔
    delay:0,   //每根柱子渲染时间差
    label: true,   //是否显示数值
    xAxisConfig:{
        display:true,
        fontColor: '#fff',
        lineColor:'#fff'
    },
    yAxisConfig:{
        display:true,
        fontColor: '#fff',
        lineColor:'#fff'
    },
    margin:{top: 20, right: 20, bottom: 30, left: 20},
}