import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class TabContent extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
    isActive: PropTypes.bool,
  }

  getTabPanes() {
    const { classPrefix, activeIndex, panels, isActive } = this.props;

    return React.Children.map(panels, (child) => {
      if (!child) { return null; }

      const order = parseInt(child.props.order, 10);
      const isActive = activeIndex === order;

      return React.cloneElement(child, {
        classPrefix,
        isActive,
        children: child.props.children,
        key: `tabpane-${order}`,
      });
    });
  }
  render() {
    const { classPrefix } = this.props;

    const classes = classnames({
      [`${classPrefix}-content`]: true,
    });

    return(
      <div className={classes}>
        {this.getTabPanes()}
      </div>
    );
  }
}