## 事件系统

- React基于 Virtual DOM 实现了一个 SyntheticEvent(合成事件) 层
- 与原生的一样, 符合w3c标准
- 同样支持事件冒泡, 并且取消

### 合成事件的实现机制

- 事件委派: react不会把事件处理函数直接绑定到真实的节点上, 而是把所有事件绑定到结构的最外层, 使用一个统一的事件监听器.
- 当组件挂载或删除时, 只是在这个统一的事件监听器上插入或删除一些对象
- 这样做简化了事件处理和回收机制, 效率也有很大提升

> react阻止事件冒泡不能阻止原生事件冒泡, 反而阻止原生的可以阻止react的

## 样式

css Modules

## 组件间通信

- 父组件向子组件通信
- 子组件向父组件通信
- 没有嵌套关系的组件之间通信

### 父组件向子组件通信

通过props

### 子组件向父组件通信

- 利用回调函数
- 利用自定义事件机制

### 跨级组件通信

利用contenxt
```javascript
// 子组件
class Child {
  static contextTypes = {
    color: PropTypes.string,
  }

  render() {
    return (
      <div>{this.context.color}</div>
    )
  }
}

// 父组件
class Father {
  static childContextTypes = {
    color: PropTypes.strng,
  }

  getChildContext() {
    return {
      color: 'red',
    }
  }
}
```

> 不推荐

### 没有嵌套关系的组件通信

自定义事件, 发布/订阅 模式, 借用Node.js 中的 Events 模块的浏览器实现版.

## 组件间抽象

在React组件的构建过程中, 有一些功能需要被不同的组件公用, 此时需要用到minxin和高阶组件.

### mixin

对于广义的mixin方法, 就是用赋值的方式将mixin对象里面的方法都挂载到原对象上, 来实现对对象的混入.

mdn上的解释是把任意多个源对象所拥有的自身可枚举属性赋值给目标对象, 然后返回目标对象.

> mixin还存在某些缺点

### 高阶组件

高阶函数: 它描述的是一种函数: 这种函数接受函数作为输入, 或是输出一个函数

高阶组件: 输入一个组件, 返回一个组件

功能:
- 控制props
- 通过refs使用引用
- 抽象state(控制权交给高阶组件)
- 使用其他元素包裹WrappedComponent

反向继承
- 渲染劫持, 反转元素树. (返回新组件继承传入组件, 使用super.render()接收父组件渲染结果)
- 控制state, 同样继承传入组件, 

## 组件性能优化

纯函数:
- 给定相同的输入, 它总是返回相同的输出;
- 过程没有副作用;
- 没有额外的状态依赖;

### PurRender
> PurComponent

### key

动态子组件, 必须有一个唯一的key prop, 这个key prop究竟是做什么的呢?????

这个key是用来Virtual DOM diff的

> 当有两个子组件需要渲染的时候, 我们没办法给他们设置key, 这时候需要用到React插件createFragment来解决

### react-addons-perf

官方提供的插件, 用于统计各组件渲染时间

## 动画

### css动画与javascript动画

css动画的局限性
- 只支持cubic-bezier的缓动, 如果你的动画对缓动函数有要求. 就必须使用javascript动画.
- css动画只能针对一些特有的css属性.
- css把translate, rotate, skew等都归结为一个属性--transform.

<!-- ----------------
just skip page-112 to page-121
---------------- -->

## 自动化测试

测试可以让项目保持健壮, 在后期维护和扩展的过程中, 减少犯错的几率.

自动化测试就是把整个流程自动化, 代替复杂的人工去点击, 同事配置回调钩子, 可以让测试定期执行或在每次发布前执行.

> react对测试有完善的支持, 目前比较完善的react测试框架有Jest和Enzyme

### Jest

Jest是由Facebook开源的React单元测试框架, 内部DOM操作基于JSDOM, 语法和断言基于Jasmine框架
- 自动找到测试;
- 自动mock模拟依赖包, 达到单元测试的目的;
- 并不需要真实DOM环境执行, 而是JSDOM模拟DOM;
- 多进程并行执行测试;

> 使用jest来测试React组件, 还要引入react-addons-test-utils插件

<!-- ? -->
#### 浅渲染机制 (shallow rendering)
#### 全渲染机制 (full rendering)

### Enzyme

Enzyme 是由Airbnb开源的React测试框架, 与Jest测试框架相比, 它提供了类似jQuery操作DOM的预发, 在作测试的时候更灵活, 易用

### 自动化测试

如果使用github或者gitlab来管理代码, 你可以使用Tranvis Cl 或 Circle Cl.

> "如果这个库没有测试代码, 那谁敢用???????"


