Class 代码
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

用 function, prototype 实现
```js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Test = (function() {
  function Test(name) {
    _classCallCheck(this, Test);

    this.name = name;
  }

  Test.prototype.logger = function logger() {
    console.log("Hello", this.name);
  };

  return Test;
})();


```

来源于 babel, 之前叫 6to5, 实现 es6 到 es5 的转换。