import React, { Component } from 'react';
//引入ant布局
import { Layout } from 'antd';
//引入样式
import './style/index.less';
//自有组件
import HeaderCustom from './components/HeaderCustom';
import SiderCustom from './components/SiderCustom';
import { receiveData } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//拿出容器
const { Content, Footer } = Layout;


class App extends Component {

    state = {
        collapsed: false
    }

    componentWillMount() {
        const { receiveData } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        user && receiveData(user, 'auth');
        // receiveData({a: 213}, 'auth');
        // fetchData({funcName: 'admin', stateName: 'auth'});
        //侧边栏的显示和收缩
        this.getClienWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClienWidth();
            console.log(document.body.clientWidth);
        }
    };

    //获取当前浏览器宽度并设置responsive管理响应式
    getClienWidth = () =>{
        const { receiveData } = this.props;
        //获取狂赌
        const clientWidth = document.body.clientWidth;
        console.log(clientWidth);
        receiveData({isMobile: clientWidth <= 992}, 'responsive')
    }

    toggle = () =>{
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

  render() {
      console.log(this.props.auth);
      const { auth, router, responsive } = this.props;
      return (
          // 进行条件渲染
          <Layout className = "ant-layout-has-sider">
              {/*collapsed属性控制收缩*/}
              {!responsive.data.isMobile && <SiderCustom path={this.props.location.pathname} collapsed={this.state.collapsed} />}
              <Layout>
                  <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}} router={router}  path={this.props.location.pathname} />
                  <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                      {/*引入子组件，想要哪一块的内容是可以动态变化的，那就让它渲染*/}
                      {this.props.children}
                  </Content>
                  <Footer style={{ textAlign: 'center' }}>
                      我是底部文件
                  </Footer>
              </Layout>
              {
                  responsive.data.isMobile && (   // 手机端对滚动很慢的处理
                      <style>
                          {`
                            #root{
                                height: auto;
                            }
                        `}
                      </style>
                  )
              }
          </Layout>
      );
  }
}

const mapStateToProps = state => {
    const { auth = {data: {}}, responsive = {data: {}} } = state.httpData;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
