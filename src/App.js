import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tabs from './components/Tabs';
import './App.css';

class ES6Class extends Component {
  render() {
    return (
      <li>我是通过es6的class创建出来的</li>
    )
  }
}

function FuncComponent() {
  return (
    <li>我是无状态函数</li>
  )
}

class App extends Component {
  componentDidMount() {
    console.log(ReactDOM.findDOMNode(this));
  }
  render() {
    return (
      <div className="App">
        {/*  */}
          <section className="section">
            <h3>react 三种创建方式</h3>
            <ul>
              {/* 目前不支持以下方法 */}
              <li>{
                `暂不支持v16以后摒弃
                React.createElement({
                  render() {
                    return (
                      <li>我是通过React.createClass创建的</li>
                    )
                  }
                })`
              }</li>
            <ES6Class />
            <FuncComponent />
            </ul>
          </section>
          {/* ReactDOM */}
          <section className="section">
            <h3>ReactDOM API</h3>
            <p>1.findeDOMNode 根据reactNode查找dom</p>
            <p>2.ReactComponent render(ReactElement element, DOMelement container, [function callback])</p>
            <p>3.不常用 unmountComponentAtNode</p>
          </section>
          {/* tabs组件 */}
          <Tabs />
          <button>123</button>
      </div>
    );
  }
}

export default App;
