export default {
    get(url) {
        if (url == '/user') {
            return new Promise((resolve) => resolve(['张三', '李四']))
        }
    }
}