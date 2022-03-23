// 对url 参数进行解析   a=1&b=2&c=3 => {a:1,b:2,c:3}
const parser = (str) =>{
    const obj = {};
    str.replace(/([^&=]+)=([^&=]+)/g,function () {
        obj[arguments[1]] = arguments[2]
    })
    return obj;
}
const stringify = (obj) =>{
    const arr = [];
    for(let key in obj){
        arr.push(`${key}=${obj[key]}`);
    }
    return arr.join('&')
}
// export 导出的是接口 供别人使用的接口  要通过解构的方式去获取
// export default 导出具体的值
export {
    parser,
    stringify
}
// console.log(parser('a=1&b=2&c=3')) // {a:1,b:2,c:3}
// console.log(stringify({a:1,b:2,c:3})); // a=1&b=2&c=3

// 1.会污染源代码 2.无法保留测试 3.最后我们希望对代码进行模块化操作