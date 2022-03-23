let callbacks = []
// [flushSchedularQueue,userNextTick]
let waiting = false;
function flushCallback(){
    callbacks.forEach(cb=>cb()); 
    waiting = false;
    callbacks = [];
}
export function nextTick(cb){
    // 多次调用nextTick 如果没有刷新的时候 就先把他放到数组中,
    // 刷新后 更改waiting
    callbacks.push(cb);
    if(waiting === false){
        setTimeout(flushCallback, 0);
        waiting = true;
    }
}

// 这个地方 非常的（饶） 只能自己加一些你自己的理解
// 不要过度的理解 

// 给大家花两个小时先过一下 vue源码  怎么分析源码