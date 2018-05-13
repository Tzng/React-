import axios from 'axios';
import { get, post } from './tools';
import * as config from './config';

/**
 * 为什么这里用js呢，因为下面的那些都是JSX写的，所以用jsx，这个是用js写的
 * */
export const getPros =() => axios.post('http://api.xitu.io/resources/github', {
    category: "trending",
    period: "day",
    lang: "java",
    offset: 0,
    linit: 30
}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
})

export const npmDependencies = () => get({url:'./npm.json'});

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

const GIT_OAUTH = "https://github.com/login";

export const gitOauthLogin = () => axios.get(`${GIT_OAUTH}/authorize?client_id=1552818a71cbad969ed7&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`);

//把第三方应用的id，以及密钥发给代理服务器
export const gitOauthToken = code => axios.post('https://cors-anywhere.herokuapp.com/' + GIT_OAUTH + '/access_token', {...{client_id: '792cdcd244e98dcd2dee',
    client_secret: '601e0528467a2b378a8c4922c3ebe581afdeeb01', redirect_uri: 'http://localhost:3006/', state: 'reactAdmin'}, code: code}, {headers: {Accept: 'application/json'}})
    .then(res => res.data).catch(err => console.log(err));

export const gitOauthInfo = access_token => axios({
    method: 'get',
    url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));

// easy-mock数据交互
// 管理员权限获取
export const admin = () => post({url: config.MOCK_AUTH_ADMIN,data:{},headers: {Accept: 'application/json'}});
// 游客权限获取
export const guest = () => post({url: config.MOCK_AUTH_VISITOR,data:{},headers: {Accept: 'application/json'}});