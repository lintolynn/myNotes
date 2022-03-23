// 测试文件默认一般以.test.js 结尾 .spec.js 结尾

import {
    parser,
    stringify
} from './src/1.parser'
// describe  套件  =》 it 一堆用例
// 默认jest只支持 node语法 babel  babel-jest

describe('测试parser', () => {
    it('测试parser是否能正常解析', () => {
        expect(parser('a=1&b=2&c=3')).toEqual({
            a: "1",
            b: "2",
            c: "3"
        })
    })
})

describe('测试stringify', () => {
    it('测试stringify是否能正常解析', () => {
        expect(stringify({a:1,b:2})).toEqual("a=1&b=2")
    })
})