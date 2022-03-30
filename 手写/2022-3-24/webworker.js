function test(n) {
    if (n == 1 || n == 2) {
        return 1
    }
    return test(n - 2) + test(n - 1)
}
postMessage(test(40))
onmessage = function (e) {
    console.log(e)
}