### 一段 Class 代码
```js
class Test {
  constructor(name) {
    this.name = name;
  }

  logger() {
    console.log("Hello", this.name);
  }
}

```

### 用 function, prototype 实现
```js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
} // 使用辅助函数 _classCallCheck 确保正确实例化类

// 使用IIFE 封装代码，避免污染全局命名空间
var Test = (function() {
  function Test(name) {
    _classCallCheck(this, Test); // this 指的是 Test 内部的this, 是一个空对象{} 也叫做 Test实例，Test 指的是函数本身也就是构造器也被称为构造函数，作为构造器存在。如果不通过 new 关键字调用，则 this 指向函数执行所处的作用域 Window, 就会报错。

    this.name = name;
  }

  Test.prototype.logger = function logger() {
    console.log("Hello", this.name);
  }; // 为类添加原型方法

  return Test;
})();


```

来源于 babel, 之前叫 6to5, 实现 es6 到 es5 的转换。
