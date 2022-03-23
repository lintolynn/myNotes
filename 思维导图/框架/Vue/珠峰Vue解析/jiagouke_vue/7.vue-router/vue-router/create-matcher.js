import createRouteMap from './create-route-map'
import {createRoute} from './history/base'
export default function createMatcher(routes){
    // 动态添加路由 规则就是 404 首页 所有人都能看到 先配好了
    // 登录了 =》 再将对应的权限 和之前的进行一个组合  (菜单全选 路由权限)


    // routes使用户自己配置的 但是用起来不方便

    // pathList 会把所有的路由 组成一个数组 ['/','/about','/about/a','/about/b','/xxx]
    // pathMap  {/:{},/about:{},/about/a:{}}
    let {pathList,pathMap} = createRouteMap(routes);


    function match(location){ // 等会要通过用户输   入的路径 获取对应的匹配记录
        let record = pathMap[location];// 获取对应的记录
        // /about/a  => matched:[/about,/a]
        return createRoute(record,{
            path:location
        })
    }
    function addRoutes(routes) { // routes动态添加的路由
        createRouteMap(routes,pathList,pathMap)
    }

    return {
        match,
        addRoutes
    }
}

