## 事件系统

- React基于 Virtual DOM 实现了一个 SyntheticEvent(合成事件) 层
- 与原生的一样, 符合w3c标准
- 同样支持事件冒泡, 并且取消

### 合成事件的实现机制

- 事件委派: react不会把事件处理函数直接绑定到真实的节点上, 而是把所有事件绑定到结构的最外层, 使用一个统一的事件监听器.
- 当组件挂载或删除时, 只是在这个统一的事件监听器上插入或删除一些对象
- 这样做简化了事件处理和回收机制, 效率也有很大提升

> react阻止事件冒泡不能阻止原生事件冒泡, 反而阻止原生的可以阻止react的

### 样式

css Modules

### 组件间通信

- 父组件向子组件通信
- 子组件向父组件通信
- 没有嵌套关系的组件之间通信

#### 父组件向子组件通信

通过props

#### 子组件向父组件通信

- 利用回调函数
- 利用自定义事件机制

#### 跨级组件通信

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

### 组件间抽象

在React组件的构建过程中, 有一些功能需要被不同的组件公用, 此时需要用到minxin和高阶组件.

#### mixin

对于广义的mixin方法, 就是用赋值的方式将mixin对象里面的方法都挂载到原对象上, 来实现对对象的混入.

mdn上的解释是把任意多个源对象所拥有的自身可枚举属性赋值给目标对象, 然后返回目标对象.

> mixin还存在某些缺点

#### 高阶组件

高阶函数: 它描述的是一种函数: 这种函数接受函数作为输入, 或是输出一个函数

高阶组件: 输入一个组件, 返回一个组件

功能:
- 控制props
- 通过refs使用引用
- 抽象state(控制权交给高阶组件)
- 使用其他元素包裹WrappedComponent

反向继承
- 渲染劫持, 反转元素树. (返回新组件继承传入组件, 使用super.render()接收父组件渲染结果)
- 控制state, 同样继承传入组件, 拿出state
