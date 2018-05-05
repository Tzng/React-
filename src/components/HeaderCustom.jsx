import React, {Component} from 'react';
import {Menu, Icon, Layout, Badge} from 'antd'

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
    render() {
        return (
            <Header style={headerStyle}>
                <Menu
                    mode="horizontal" //水平模式
                    style={{lineHeght: '64px', float: 'right'}}
                >
                    <Menu.Item key="1">
                        {/*设置位置*/}
                        <Badge count={25} overflow={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>
                    {/*菜单子菜单*/}
                    <SubMenu title={<span><Icon type={"user"} />你好，admin</span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">个人信息</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            {/*添加单个小菜单*/}
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}

export default HeaderCustom;