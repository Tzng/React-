import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BasicForm from './components/form/BasicForm'
import './index.css';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router'

ReactDOM.render(
    // 引入路由
    <Router history={hashHistory}>
        <Route path={'app'} components={App}></Route>
        <Route path={'form'} components={BasicForm}/>
    </Router>,
    document.getElementById('root')
);
