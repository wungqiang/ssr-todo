import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTodo } from './actions';

class DetailPage extends Component {
   static initData(store, params) {
     return Promise.all([
       store.dispatch(getTodo(params.id)),
     ]);
   }
  render() {
    const { info } = this.props.todo;
    return (
      <div>
        <p>id: {info.id}</p>
        <p>content: {info.content}</p>
      </div>
    );
  }
  componentDidMount() {
    this.props.getTodo(this.props.match.params.id);
  }
}

export default connect((state) => {
  return { todo: state.todo };
}, (dispatch) => {
  return bindActionCreators({ getTodo }, dispatch);
})(DetailPage);
