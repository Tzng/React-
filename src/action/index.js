import *  as type from './type';
import * as http from '../axios/index';

//请求数据
const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});

//接收数据
export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});

//获取数据的action
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    dispatch(requestData(stateName));
    //调用axios的方法
    console.log(http[funcName]);
    return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
};