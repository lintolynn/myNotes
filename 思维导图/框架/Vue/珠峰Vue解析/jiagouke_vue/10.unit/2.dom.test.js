import {addNode,removeNode} from './src/2.dom';


it('测试能否正常添加节点',()=>{
    // jsdom 假的dom
    document.body.innerHTML = '<div id="wrapper"></div>';
    let button = document.createElement('button');
    let wrapper = document.querySelector('#wrapper');
    addNode(button,wrapper);
     wrapper = document.querySelector('#wrapper');
    let btn =wrapper.querySelector('button');
    expect(btn).not.toBeNull()
});

// 不停的去测试对应的逻辑，单元测试就是测试某个方法是否能达到我的预期效果

it('测试是否能够正常删除',()=>{
    document.body.innerHTML = '<div id="wrapper"><button id="button"></button></div>';
    let btn = document.querySelector('#button');
    expect(btn).not.toBeNull()
    removeNode(btn);
    btn = document.querySelector('#button');
    expect(btn).toBeNull()
})