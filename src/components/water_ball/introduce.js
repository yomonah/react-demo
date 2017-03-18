export const INTRODUCTION={
          title:'SVG实现水波球',
          context:'根据一位大神写的jquery改编，封装成react组件，内部方法比较复杂，配置项也很多：波浪大小，起伏高度，时间等,'+
            '这里就列举些比较基础的配置，更多具体内容可以看源码：'+
            '&idDom: 传入容器id'+
            '&width和height: 容器的宽高'+
            '&textColor: 显示文本的颜色'+
            '&waveTextColor: 在波浪上显示文本的颜色；这里需要注意下，虽然水波球中显示的文字只有一处，但其实是两个地方，1.当水波浪低于文字位置时，文字由底容器层显示的；2.当水波浪高于文字时，底容器的文字会被波浪遮挡，这时我们看到的文字其实是显示在水波浪上的文本'+
            '&textSize: 文本字体大小'+
            '&outerCircle: 外层圆的相关配置，包含半径r和填充色fillColor两个属性'+
            '&innerCircle: 内层圆的相关配置，包含半径r和填充色fillColor两个属性'
}