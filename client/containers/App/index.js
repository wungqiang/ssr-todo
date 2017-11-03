import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

export default class Root extends Component {
  render() {
    return (
      <div>
        <div>
            <Link to="/">列表</Link>
            <Link to="/create">新增</Link>
        </div>
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
  componentDidMount() {
    window.__APP_INITIAL_STATE__ = null;
  }
}
