import axios from 'axios';

export const fetchData = ()=>{
    return axios.get('/user'); // 获取用户数据  // ['张三','李四]
}

export const sum = (a,b)=>{
    return a+b
}