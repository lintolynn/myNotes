

// 增加dom 删除dom

// 希望增加dom的api 

const addNode = (node,parent)=>{
    parent.appendChild(node)
}

const removeNode = (node) =>{
    node.parentNode.remove(node);
}

export {
    addNode,
    removeNode
}