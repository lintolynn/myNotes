import {flip} from './src/5.coverage';

it('测试flip方法',()=>{
    expect(flip(true)).toBe('正')
    expect(flip(false)).toBe('反1')
})


// 覆盖率 是否覆盖到了整个程序 
// 覆盖率也是一个衡量的标准 但是不是越高越好  单元测试的话 一般覆盖率都是比较高的 
// 集成测试 覆盖率一般比较低
