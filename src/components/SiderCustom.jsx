import React,{Component} from 'react';
import {Menu, Icon, Layout,} from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
//引入路由
import { Link } from 'react-router';
import Spins from "./ui/Spins";

class SiderCustom extends Component{

    state = {
        //是否折叠
        collapsed: false,
        //菜单类型
        mode: 'inline',
        openKey: '',
        selectedKey: ''
    };

    componentDidMount() {
        this.setMenuOpen(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log("传递捡来的新地址："+nextProps);
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps)
    }

    setMenuOpen = props => {
        const {path} = props;
        this.setState({
            openKey: path.substr(0, path.lastIndexOf('/')),
            selectedKey: path
        });
        console.log(this.state)
    };

    //展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };

    menuClick = e => {
        console.log(this.state);
        this.setState({
            selectedKey: e.key
        });

    };

    openMenu = v => {
        console.log(v);
        this.setState({
            openKey: v[v.length - 1]
        })
    };

    render(){
        return(
            // Sider 侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。
            // 侧边栏的切换状态可以从其他组件的点击事件进行
            <Sider
                breakpoint='lg'
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="logo" />
                {/*导航菜单，就是左边那一片大的*/}
                <Menu
                    onClick={this.menuClick}
                    theme="dark"
                    mode={this.state.mode}
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={[this.state.openKey]}
                    onOpenChange={this.openMenu}
                >
                    {/*子菜单一个一个的菜单*/}
                    <SubMenu
                        key="page"
                        title={<span><Icon type="switcher" /><span className="nav-text">页面</span></span>}
                    >
                        <Menu.Item key="/login"><Link to={'/login'}>登录</Link></Menu.Item>
                        <Menu.Item key="/404"><Link to={'/404'} >404页面</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key={"/app/table"}
                        title={<span><Icon type={"copy"} /><span className={"nav-text"}>表格</span></span>}
                    >
                        <Menu.Item key="/app/table/asynchronoustable"><Link to={'/app/table/asynchronoustable'}>GitHub热门JS代码</Link></Menu.Item>
                        <Menu.Item key="/app/table/advancedtables"><Link to={'/app/table/advancedtables'}>高级表格</Link></Menu.Item>
                        <Menu.Item key="/app/table/basictables"><Link to={'/app/table/basictables'}>基础表格</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key={"/app/form"}
                        title={<span><Icon type={"edit"} /><span className={"nav-text"}>表单</span></span>}
                    >
                        <Menu.Item key="/app/form/basicform"><Link to={'/app/form/basicform'}>基础表单</Link></Menu.Item>
                        <Menu.Item key="/app/form/wrappedform"><Link to={'/app/form/wrappedform'}>高级表单</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key={"/app/ui"}
                        title={<span><Icon type={"scan"} /><span className="nav-text">UI组件</span></span>}
                    >
                        <Menu.Item key="/app/ui/buttons"><Link to={'/app/ui/buttons'}>按钮组件</Link></Menu.Item>
                        <Menu.Item key="/app/ui/spins"><Link to={'/app/ui/spins'}>第三方进度组件</Link></Menu.Item>
                        <Menu.Item key="/app/ui/banners"><Link to={'/app/ui/banners'}>轮播图</Link></Menu.Item>
                        <Menu.Item key="/app/ui/modals"><Link to={'/app/ui/modals'}>弹出框</Link></Menu.Item>
                        <Menu.Item key="/app/ui/notifications"><Link to={'/app/ui/notifications'}>消息提示框</Link></Menu.Item>
                        <Menu.Item key="/app/ui/tabs"><Link to={'/app/ui/tabs'}>标签页</Link></Menu.Item>
                        <Menu.Item key="/app/ui/wysiwyg"><Link to={'/app/ui/wysiwyg'}>国外的富文本</Link></Menu.Item>
                        <Menu.Item key="/app/ui/braftrditor"><Link to={'/app/ui/brafteditor'}>国内的富文本编辑器</Link></Menu.Item>
                        <Menu.Item key="/app/ui/gallery"><Link to={'/app/ui/gallery'}>画廊</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key={"/app/charts"}
                        title={<span><Icon type={"area-chart"}/><span className="nav-text">统计分析</span></span>}
                    >
                        <Menu.Item key="/app/charts/echarts"><Link to={'/app/charts/echarts'}>Echarts组件</Link></Menu.Item>
                        <Menu.Item key="/app/charts/recharts"><Link to={'/app/charts/recharts'}>Recharts组件</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key={"/app/animation"}
                        title={<span><Icon type={"area-chart"}/><span className="nav-text">动画</span></span>}
                    >
                        <Menu.Item key={"/app/animation/baseicAnimations"}><Link to={'/app/animation/baseicAnimations'}>基础动画</Link></Menu.Item>
                        <Menu.Item key={"/app/animation/exampleAnimations"}><Link to={'/app/animation/exampleAnimations'}>动画案例</Link></Menu.Item>
                    </SubMenu>
                </Menu>
                <style>
                    {/*条件样式*/}
                    {`
                    #nprogress .spinner{
                         left: ${this.state.collapsed ? '70px' : '206px'};
                         right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default SiderCustom;