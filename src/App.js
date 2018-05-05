import React, { Component } from 'react';
//引入ant布局
import { Layout } from 'antd';
//引入样式
import './style/index.less';
//自有组件
import HeaderCustom from './components/HeaderCustom'

class App extends Component {
  render() {
    return (
        <Layout className = "ant-layout-has-sider">
            <Layout>
                <div className="App">
                    <HeaderCustom/>
                </div>
            </Layout>
        </Layout>
    );
  }
}

export default App;
