import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import './style/lib/animate.css';

import App from './App';
import CRouter from './routes/index';

//第三方组件
import {Router, Route, hashHistory, IndexRedirect} from 'react-router'

//自有组件
import './index.css';
import configureStore from './store/index'

const store = configureStore()

ReactDOM.render(
    // 引入路由
    <Provider store={store}>
        <CRouter store={store} />
    </Provider>,
    document.getElementById('root')
);
