import { combineReducers } from 'redux';
import * as type from '../action/type';


const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        //请求数据的时候加一个状态
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:   // 返回数据的时候加一个状态
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};
const httpData = (state = {}, action) => {
    switch (action.type) {
        //如果拿到数据了
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
};

export default combineReducers({
    httpData
});
