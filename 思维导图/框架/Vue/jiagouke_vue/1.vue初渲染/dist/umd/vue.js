(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // 我要重写数组的那些方法 7个 push shift unshift pop reverse sort splice 会导致数组本身发生变化
  // slice()
  var oldArrayMethods = Array.prototype; // value.__proto__ = arrayMethods 原型链查找的问题， 会向上查找，先查找我重写的，重写的没有会继续向上查找
  // arrayMethods.__proto__ = oldArrayMethods

  var arrayMethods = Object.create(oldArrayMethods);
  var methods = ['push', 'shift', 'unshift', 'pop', 'sort', 'splice', 'reverse'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[method].apply(this, args); // 调用原生的数组方法
      // push unshift 添加的元素可能还是一个对象

      var inserted; // 当前用户插入的元素

      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          // 3个  新增的属性 splice 有删除 新增的的功能 arr.splice(0,1,{name:1})
          inserted = args.slice(2);
      }

      if (inserted) ob.observerArray(inserted); // 将新增属性继续观测

      return result;
    };
  });

  /**
   * 
   * @param {*} data  当前数据是不是对象
   */
  function isObject(data) {
    return _typeof(data) === 'object' && data !== null;
  }
  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  } // 取值时实现代理效果

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      // 仅仅是初始化的操作
      // vue如果数据的层次过多 需要递归的去解析对象中的属性，依次增加set和get方法
      // value.__ob__ = this; // 我给每一个监控过的对象都增加一个__ob__属性
      def(value, '__ob__', this);

      if (Array.isArray(value)) {
        // 如果是数组的话并不会对索引进行观测 因为会导致性能问题
        // 前端开发中很少很少 去操作索引 push shift unshift 
        value.__proto__ = arrayMethods; // 如果数组里放的是对象我再监控

        this.observerArray(value);
      } else {
        // 对数组监控
        this.walk(value); // 对对象进行观测
      }
    }

    _createClass(Observer, [{
      key: "observerArray",
      value: function observerArray(value) {
        // [{}]
        for (var i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data); // [name,age,address]
        // 如果这个data 不可配置 直接reurn

        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    observe(value); // 递归实现深度检测

    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: false,
      get: function get() {
        //  获取值的时候做一些操作
        return value;
      },
      set: function set(newValue) {
        // 也可以做一些操作
        console.log('更新数据');
        if (newValue === value) return;
        observe(newValue); // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象

        value = newValue;
      }
    });
  }

  function observe(data) {
    var isObj = isObject(data);

    if (!isObj) {
      return;
    }

    return new Observer(data); // 用来观测数据
  }

  function initState(vm) {
    var opts = vm.$options; // vue的数据来源 属性 方法 数据 计算属性 watch

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    // 数据初始化工作
    var data = vm.$options.data; // 用户传递的data

    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 对象劫持 用户改变了数据 我希望可以得到通知 =》 刷新页面
    // MVVM模式 数据变化可以驱动视图变化 
    // Object.defineProperty () 给属性增加get方法和set方法
    // 为了让用户更好的使用 我希望可以直接vm.xxx

    for (var key in data) {
      proxy(vm, '_data', key);
    }

    observe(data); // 响应式原理
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // abc-aaa

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // <aaa:asdads>

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >  <div>
  var root = null; // ast语法树的树根

  var currentParent; // 标识当前父亲是谁

  var stack = [];
  var ELEMENT_TYPE = 1;
  var TEXT_TYPE = 3;

  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: ELEMENT_TYPE,
      children: [],
      attrs: attrs,
      parent: null
    };
  }

  function start(tagName, attrs) {
    // 遇到开始标签 就创建一个ast元素s
    var element = createASTElement(tagName, attrs);

    if (!root) {
      root = element;
    }

    currentParent = element; // 把当前元素标记成父ast树

    stack.push(element); // 将开始标签存放到栈中
  }

  function chars(text) {
    text = text.replace(/\s/g, '');

    if (text) {
      currentParent.children.push({
        text: text,
        type: TEXT_TYPE
      });
    }
  }

  function end(tagName) {
    var element = stack.pop(); // 拿到的是ast对象
    // 我要标识当前这个p是属于这个div的儿子的

    currentParent = stack[stack.length - 1];

    if (currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element); // 实现了一个树的父子关系
    }
  }

  function parseHTML(html) {
    // 不停的去解析html字符串
    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd == 0) {
        // 如果当前索引为0 肯定是一个标签 开始标签 结束标签
        var startTagMatch = parseStartTag(); // 通过这个方法获取到匹配的结果 tagName,attrs

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs); // 1解析开始标签

          continue; // 如果开始标签匹配完毕后 继续下一次 匹配
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]); // 2解析结束标签

          continue;
        }
      }

      var text = void 0;

      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text); // 3解析文本
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // 将标签删除

        var _end, attr;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          // 将属性进行解析
          advance(attr[0].length); // 将属性去掉

          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
        }

        if (_end) {
          // 去掉开始标签的 >
          advance(_end[0].length);
          return match;
        }
      }
    }

    return root;
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  function genProps(attrs) {
    // 处理属性 拼接成属性的字符串
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name === 'style') {
        (function () {
          // style="color: red;fontSize:14px" => {style:{color:'red'},id:name,}
          var obj = {};
          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function genChildren(el) {
    var children = el.children;

    if (children && children.length > 0) {
      return "".concat(children.map(function (c) {
        return gen(c);
      }).join(','));
    } else {
      return false;
    }
  }

  function gen(node) {
    if (node.type == 1) {
      // 元素标签
      return generate(node);
    } else {
      var text = node.text; //   <div>a {{  name  }} b{{age}} c</div>

      var tokens = [];
      var match, index; // 每次的偏移量 buffer.split()

      var lastIndex = defaultTagRE.lastIndex = 0; // 只要是全局匹配 就需要将lastIndex每次匹配的时候调到0处

      while (match = defaultTagRE.exec(text)) {
        index = match.index;

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
      }

      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }

      return "_v(".concat(tokens.join('+'), ")");
    }
  }

  function generate(el) {
    // [{name:'id',value:'app'},{}]  {id:app,a:1,b:2}
    var children = genChildren(el);
    var code = "_c(\"".concat(el.tag, "\",").concat(el.attrs.length ? genProps(el.attrs) : 'undefined').concat(children ? ",".concat(children) : '', ")\n    ");
    return code;
  }

  function compileToFunction(template) {
    // 1) 解析html字符串 将html字符串 => ast语法树
    var root = parseHTML(template); // 需要将ast语法树生成最终的render函数  就是字符串拼接 （模板引擎）

    var code = generate(root); // 核心思路就是将模板转化成 下面这段字符串
    //  <div id="app"><p>hello {{name}}</p> hello</div>
    // 将ast树 再次转化成js的语法
    //  _c("div",{id:app},_c("p",undefined,_v('hello' + _s(name) )),_v('hello'))
    // 所有的模板引擎实现 都需要new Function + with

    var renderFn = new Function("with(this){ return ".concat(code, "}")); // vue的render 他返回的是虚拟dom

    return renderFn;
  } //   hellpo
  //      <p></p>
  // </div>
  // let root = {
  //     tag:'div',
  //     attrs:[{name:'id',value:'app'}],
  //     parent:null,
  //     type:1,
  //     children:[{
  //         tag:'p',
  //         attrs:[],
  //         parent:root,
  //         type:1,
  //         children:[
  //             {
  //                 text:'hello',
  //                 type:3
  //             }
  //         ]
  //     }]
  // }

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, callback, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.callback = callback;
      this.options = options;
      this.getter = exprOrFn; // 将内部传过来的回调函数 放到getter属性上

      this.get();
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        this.getter();
      }
    }]);

    return Watcher;
  }();

  function patch(oldVnode, vnode) {
    // 1.判断是更新还是要渲染
    var isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      var oldElm = oldVnode; // div id="app"

      var parentElm = oldElm.parentNode; // body

      var el = createElm(vnode);
      parentElm.insertBefore(el, oldElm.nextSibling);
      parentElm.removeChild(oldElm);
    } // 递归创建真实节点 替换掉老的节点

  }

  function createElm(vnode) {
    // 根据虚拟节点创建真实的节点
    var tag = vnode.tag,
        children = vnode.children,
        key = vnode.key,
        data = vnode.data,
        text = vnode.text; // 是标签就创建标签

    if (typeof tag === 'string') {
      vnode.el = document.createElement(tag);
      updateProperties(vnode);
      children.forEach(function (child) {
        // 递归创建儿子节点，将儿子节点扔到父节点中
        return vnode.el.appendChild(createElm(child));
      });
    } else {
      // 虚拟dom上映射着真实dom  方便后续更新操作
      vnode.el = document.createTextNode(text);
    } // 如果不是标签就是文本


    return vnode.el;
  } // 更新属性


  function updateProperties(vnode) {
    var newProps = vnode.data;
    var el = vnode.el;

    for (var key in newProps) {
      if (key === 'style') {
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (key === 'class') {
        el.className = newProps["class"];
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      vm.$el = patch(vm.$el, vnode); // 需要用虚拟节点创建出真实节点 替换掉 真实的$el
      // 我要通过虚拟节点 渲染出真实的dom
    };
  }
  function mountComponent(vm, el) {
    var options = vm.$options; // render

    vm.$el = el; // 真实的dom元素
    // Watcher 就是用来渲染的
    // vm._render 通过解析的render方法 渲染出虚拟dom _c _v _s
    // vm._update 通过虚拟dom 创建真实的dom  
    // 渲染页面

    var updateComponent = function updateComponent() {
      // 无论是渲染还是更新都会调用此方法
      // 返回的是虚拟dom
      vm._update(vm._render());
    }; // 渲染watcher 每个组件都有一个watcher   


    new Watcher(vm, updateComponent, function () {}, true); // true表示他是一个渲染watcher
  }

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      // 数据的劫持
      var vm = this; // vue中使用 this.$options 指代的就是用户传递的属性

      vm.$options = options; // 初始化状态

      initState(vm); // 分割代码
      // 如果用户传入了el属性 需要将页面渲染出来
      // 如果用户传入了el 就要实现挂载流程

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el); // 默认先会查找有没有render方法，没有render 会 采用template template也没有就用el中的内容

      if (!options.render) {
        // 对模板进行编译
        var template = options.template; // 取出模板

        if (!template && el) {
          template = el.outerHTML;
        }

        var render = compileToFunction(template);
        options.render = render; // 我们需要将template 转化成render方法 vue1.0 2.0虚拟dom

        console.log(render);
      } // options.render
      // 渲染当前的组件 挂载这个组件


      mountComponent(vm, el);
    };
  }

  function createElement(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var key = data.key;

    if (key) {
      delete data.key;
    }

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return vnode(tag, data, key, children, undefined);
  }
  function createTextNode(text) {
    return vnode(undefined, undefined, undefined, undefined, text);
  }

  function vnode(tag, data, key, children, text) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  } // 虚拟节点 就是通过_c _v 实现用对象来描述dom的操作 （对象）
  // 1) 将template转换成ast语法树-> 生成render方法 -> 生成虚拟dom -> 真实的dom
  //  重新生成虚拟dom -> 更新dom

  function renderMixin(Vue) {
    // _c 创建元素的虚拟节点
    // _v 创建文本的虚拟节点
    // _s JSON.stringify
    Vue.prototype._c = function () {
      return createElement.apply(void 0, arguments); // tag,data,children1,children2
    };

    Vue.prototype._v = function (text) {
      return createTextNode(text);
    };

    Vue.prototype._s = function (val) {
      return val == null ? '' : _typeof(val) === 'object' ? JSON.stringify(val) : val;
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm); // 去实例上 取值

      return vnode;
    };
  }

  // Vue的核心代码 只是Vue的一个声明

  function Vue(options) {
    // 进行Vue的初始化操作
    this._init(options);
  } // 通过引入文件的方式 给Vue原型上添加方法


  initMixin(Vue); // 给Vue原型上添加一个_init方法

  renderMixin(Vue);
  lifecycleMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
