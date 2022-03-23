// 异步代码

const getDataByCallback = (cb) => {
    setTimeout(() => {
        cb({
            name: 'jw'
        })
    }, 1000);
}


const getDataByPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name: 'jw'
            })
        }, 1000);
    })
}

export {
    getDataByCallback,
    getDataByPromise
}