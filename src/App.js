import React, { Component } from 'react';
//引入ant布局
import { Layout } from 'antd';
//拿出容器
const { Content, Footer } = Layout;

//引入样式
import './style/index.less';
//自有组件
import HeaderCustom from './components/HeaderCustom';
import SiderCustom from './components/SiderCustom';

class App extends Component {

    state = {
        collapsed: false
    }

    toggle = () =>{
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

  render() {
    return (
        <Layout className = "ant-layout-has-sider">
            {/*collapsed属性控制收缩*/}
            <SiderCustom path={this.props.location.pathname} collapsed={this.state.collapsed} />
            <Layout>
                <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} />
                <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                    {/*引入子组件，想要哪一块的内容是可以动态变化的，那就让它渲染*/}
                    {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    我是底部文件
                </Footer>
            </Layout>
        </Layout>
    );
  }
}

export default App;
