import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitTodo, submitEditTodo, getEditTodo } from './actions';
import { addTodo, editTodo } from '../HomePage/actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', isEdit: this.props.match.params.id !== undefined };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <input autoFocus type="text" ref="content"
            value={this.state.content} onChange={this.handleChange}/>
        </p>
        <p>
          <button type="submit">{this.state.isEdit ? '编辑' : '添加'}</button>
        </p>
      </form>
    );
  }
  componentDidMount() {
    if (this.state.isEdit) {
      this.getEditTodo(this.props.match.params.id);
    }
  }
  getEditTodo(id) {
    getEditTodo(id).then((data) => {
      this.setState({content: data.content});
    }, (err) => {
      alert(err.msg);
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.state.isEdit ? this.submitEditTodo() : this.submitTodo();
  }
  submitTodo() {
    submitTodo(this.state.content).then((data) => {
      this.props.addTodo({ id: data, content: this.state.content });
      this.refs.content.value = '';
    }, (err) => {
      alert(err.msg);
    });
  }
  submitEditTodo() {
    let id = this.props.match.params.id;
    submitEditTodo(id, this.state.content).then((data) => {
      this.props.editTodo({ id: id, content: this.state.content });
    }, (err) => {
      alert(err.msg);
    });
  }
  handleChange(e) {
    const val = this.refs.content.value;
    val && this.setState({ content: val });
  }
}

export default connect((state) => {
  return { home: state.home };
}, (dispatch) => {
  return bindActionCreators({ addTodo, editTodo }, dispatch);
})(Profile);
