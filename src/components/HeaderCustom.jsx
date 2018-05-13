import React, {Component} from 'react';
import {Menu, Icon, Layout, Badge, Popover} from 'antd'
import { Link } from 'react-router';
import SiderCustom from './SiderCustom';
import { connect } from 'react-redux';

import screenfull from "screenfull";
import { gitOauthToken, gitOauthInfo } from '../axios';
import { queryString } from '../utils/index';
import avater from '../style/imgs/bjt.png';

//引入组件
const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup; //导航菜单项目组

const headerStyle = {
    background: '#fff',
    padding: 0,
    height: 65
}

class HeaderCustom extends Component {

    state = {
        user : '',
        //是否显示
        visible: false
    };

    componentDidMount(){
        //用户登录状态的保存
        const QueryString = queryString();
        //判断是否有登录的用户
        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if(!_user && QueryString.hasOwnProperty('code')){
            //使用git的信息
            gitOauthToken(QueryString.code).then(res => {
                gitOauthInfo(res.access_token).then(info => {
                    console.log(info)
                    this.setState({
                        user: info
                    });
                    localStorage.setItem('user', JSON.stringify(info))
                })
            })
        }else{
            this.setState({
                user: _user
            });
        }
    }

    //全屏
    screenFull = () =>{
        if(screenfull.enabled){
            screenfull.request();
        }
    }

    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        localStorage.removeItem('user');
        this.props.router.push('/login')
    };

    render() {

        const { responsive, path } = this.props;
        //根据不同的响应模式进行变化，如果是移动端，则显示侧边栏~

        return (
            <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                {
                    responsive.data.isMobile ? (
                        <Popover content = {<SiderCustom path={path} popoverHide={this.popoverHide} />} trigger="click"
                            placement="bottomLeft" visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="trigger custom-trigger"/>
                        </Popover>
                    ):(// 侧边栏收缩按钮
                    <Icon
                        className="trigger custom-trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                    />)
                }
                <Menu
                    mode="horizontal" //水平模式
                    style={{lineHeight: '64px', float: 'right'}}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <Menu.Item key="1">
                        {/*设置位置*/}
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>
                    {/*菜单子菜单*/}
                    <SubMenu title={<span className="avatar"><img src={avater} alt="头像"/><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好，{this.state.user.login}</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            {/*添加单个小菜单*/}
                            <Menu.Item key="setting:3"><Link to={'/app/table/asynchronoustable'}>个人设置</Link></Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -50px;
                    }
                `}</style>
            </Header>
        )
    }
}

const mapStateToProps = state => {
    const { responsive = { data: {}} } = state.httpData;
    return {responsive};
}
export default connect(mapStateToProps)(HeaderCustom)