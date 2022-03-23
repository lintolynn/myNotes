// --watchAll = 监控全部 w
// --watch = o 只监控变化的文件
import {
    getDataByCallback,
    getDataByPromise
} from './src/3.async'
// 1.异步的回调方式可以传入done 函数 什么时候完成什么时候调用
// 使用mockTimer的方式 替换掉定时器 （代码就变成了同步的代码）
it('测试回调函数 获取数据', (done) => {
    // 默认不会等待异步执行完毕后在测试
    // 对时间进行mock 
    // jest 默认具备mock的能力
    //jest.useFakeTimers(); // 使用假的定时器
    getDataByCallback((data) => {
        expect(data).toEqual({
            name: 'jw'
        });
        done()
    })
    // jest.runAllTimers(); // 运行所有的定时器
    // jest.runOnlyPendingTimers(); // 只运行当前等待队列的一个
    // jest.advanceTimersByTime(1001000)
})
// 如果是promise done 、 async+await
it('测试promise获取数据', async () => {
    let data = await getDataByPromise()
    expect(data).toEqual({
        name: 'jw'
    });
});