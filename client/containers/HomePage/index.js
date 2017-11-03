import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { getTodos, removeTodo, submitRemoveTodo  } from './actions';

class HomePage extends Component {
  static initData(store) {
    return Promise.all([
      store.dispatch(getTodos()),
    ]);
  }
  render() {
    return (<div>{this.createTodoView()}</div>);
  }
  submitRemoveTodo(id) {
    submitRemoveTodo(id).then(() => {
      this.props.removeTodo(id);
    }, (err) => {
      alert(err.msg);
    });
  }
  createTodoView() {
    const { list, loadedList } = this.props.home;
    if (!loadedList) {
        return <p>加载中。。。</p>;
    }
    if (!list.length) {
        return <p>暂无数据</p>;
    }
    return (
      <ul>
        {
          list.map((item, index) => {
            return (
              <li key={index}>
                {item.content}
                <Link to={"/detail/" + item.id}>查看</Link>
                <a href="javascript:void(0)" onClick={() => {
                  this.submitRemoveTodo(item.id);
                }}>删除</a>
                <Link to={"/edit/" + item.id}>编辑</Link>
              </li>
            );
          })
        }
      </ul>
    );
  }
  componentDidMount() {
    if (!window.__APP_INITIAL_STATE__) {
      this.props.getTodos();
    }
  }
}

export default connect((state) => {
  return {
    home: state.home
  };
}, (dispatch) => {
  return bindActionCreators({
    getTodos,
    removeTodo
  }, dispatch);
})(HomePage);
