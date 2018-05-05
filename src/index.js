import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//第三方组件
import {Router, Route, hashHistory, IndexRedirect} from 'react-router'

//自有组件
import BasicForm from './components/forms/BasicForm';
import WrappedForm from './components/forms/WrappedForm';
import Page from './components/Page'
import './index.css';
import BasicTables from "./components/tables/BasicTables";
import AdvancedTables from "./components/tables/AdvancedTables";
import AsynchronousTable from "./components/tables/AsynchronousTable";

ReactDOM.render(
    // 引入路由
    <Router history={hashHistory}>
        {/*默认路由,访问根路径的时候，这里的子组件都能渲染*/}
        <Route path={'/'} components={Page}>
            {/*默认路由，这是Route3版本的写法，4是另一种写法了*/}
            <IndexRedirect to={'app'}/>
            <Route path={'app'} components={App}>
                <Route path={'form'}>
                    {/*嵌套路由，子路由渲染，也就是说，在Content中需要出现我们的其他组件*/}
                    <Route path={'basicform'} components={BasicForm}/>
                    <Route path={'wrappedform'} components={WrappedForm}/>
                </Route>
                {/*表格路由*/}
                <Router path={'table'}>
                    <Route path={'basictables'} component={BasicTables}/>
                    <Route path={'advancedtables'} component={AdvancedTables}/>
                    <Route path={'asynchronoustable'} component={AsynchronousTable}/>
                </Router>
            </Route>
        </Route>

    </Router>,
    document.getElementById('root')
);
