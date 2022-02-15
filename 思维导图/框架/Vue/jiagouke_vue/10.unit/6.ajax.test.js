// jest.mock('./src/6.ajax'); // 替换整个文件


import {fetchData,sum} from './src/6.ajax';
// let {sum} = jest.requireActual('./src/6.ajax')


it('测试能否正常获取用户数据',async ()=>{
    let r = await fetchData();

    expect(r).toEqual(['张三','李四'])
})

it('测试求和函数', ()=>{
    expect(sum(1,1)).toBe(2)
})