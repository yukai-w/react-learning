import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabNav from './TabNav';
import TabContent from './TabContent';

class Tabs extends Component {
  static propTypes = {
    // 可选class
    className: PropTypes.string,
    // class前缀
    classPrefix: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    // 默认激活索引, 组件内更新
    defaultActiveIndex: PropTypes.number,
    // 默认激活索引, 组件外更新
    activeIndex: PropTypes.number,
    // 切换回调
    onChange: PropTypes.func,
  }
  static defualtProps = {
    classPrefix: 'tabs',
    onChange: () => {},
  }
  constructor(props) {
    super(props);

    // 对事件方法的绑定
    this.handleTabClick = this.handleTabClick.bind(this);

    const currProps = this.props;

    let activeIndex;
    // 初始化 activeIndex state
    if ('activeIndex' in currProps) {
      activeIndex = currProps.activeIndex;
    } else if ('defaultActiveIndex' in currProps) {
      activeIndex = currProps.defaultActiveIndex;
    }

    this.state = {
      activeIndex,
      prevIndex: activeIndex,
    };
  }
  componentWillReceiveProps(nextProps) {
    // 如果 props 传入 activeIndex 直接更新
    if ('activeIndex' in nextProps) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
    }
  }

  handleTabClick(activeIndex) {
    const prevIndex = this.state.activeIndex;

    // 如果当前 activeIndex 与传入的 activeIndex 不一致
    // 并且 props 中存在 defualtActiveIndex 时, 则更新
    if (this.state.activeIndex !== activeIndex &&
      'defaultActionIndex' in this.props) {
      this.setState({
        activeIndex,
        prevIndex,
      })   
    }
  }

  renderTabNav() {
    const { classPrefix, children } = this.props;

    return (
      <TabNav
        key="tabBar"
        classPrefix={classPrefix}
        onTabClick={this.handleTabClick}
        panels={children}
        activeIndex={this.state.activeIndex}
      />
    )
  }

  renderTabContent() {
    const { classPrefix, children } = this.props;

    return (
      <TabContent
        key="tabcontent"
        classPrefix={classPrefix}
        panels={children}
        activeIndex={this.state.activeIndex}
      />
    )
  }

  render() {
    const { className } = this.props;
    // 合并class
    const classes = classnames(className, 'ui-tabs');
    return (
      <div className={classes}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    );
  }
}

export default Tabs;
