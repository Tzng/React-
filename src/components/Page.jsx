/**
 * 定义这个组件就是用来渲染子组件的
 * 不推荐使用函数式组件，函数式组件不要混用，不然会出现组件性能方面的问题
 */
import React,{Component} from 'react';

class Page extends Component{
    render(){
        return(
            <div style={{height:'100%'}}>
                {/*返回一个子组件*/}
                {this.props.children}
            </div>
        )
    }
}

export default Page;