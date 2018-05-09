import axios from 'axios';

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

export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));