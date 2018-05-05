import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//第三方组件
import {Router, Route, hashHistory, IndexRedirect} from 'react-router'

//自有组件
import BasicForm from './components/form/BasicForm'
import './index.css';

ReactDOM.render(
    // 引入路由
    <Router history={hashHistory}>
        <Route path={'app'} components={App}>
            {/*嵌套路由，子路由渲染，也就是说，在Content中需要出现我们的其他组件*/}
            <Route path={'form/basicForm'} components={BasicForm}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
