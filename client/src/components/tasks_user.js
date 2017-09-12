import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import _ from 'lodash';
import Moment from 'react-moment';

class UserTasks extends Component {
  componentDidMount() {
    this.props.fetchAllTasks();
    this.props.fetchUsers();
  }
  
  renderUsers() {
    return _.map(this.props.users, (user, index) => {
      return (
        <li key={index} className="list-group-item">{user.name}</li>
      );
    })
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-error' : ''}`;

    return(
      <div className={className}>
        <label>{field.label}</label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-danger">
        {touched ? error : ''}
        </span>
      </div>
    );
  }

  onSubmit = (values) => {
    this.props.createUser(values, () => {
      this.props.fetchUsers();
      $('#myModal').modal('hide');
    });
  }

  render() {
    if(_.size(this.props.users) && this.props.allTasks === 0) {
      return (
        <div className="loading">
          Loading..
        </div>
      );
    }

    return(
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="side">
              <div className="panel panel-default">
                <div className="panel-heading"><input type="text" className="form-control" placeholder="Search" /></div>
                <ul className="list-group">
                  {this.renderUsers()}
                </ul>
              </div>
              <div className="add-user">
                <button className="main-button" data-toggle="modal" data-target="#myModal"><i className="fa fa-plus" aria-hidden="true"></i> Add User</button>
              </div>
            </div>
            <div className="main">
              <div className="jumbotron">
                <h1>
                  Users Tasks
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">New User</h4>
                </div>
                <div className="modal-body">
                  <form className="form-inline" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field
                      label="Enter a name:"
                      name="name"
                      component={this.renderField}
                    />
                  <button type="submit" className="modal-submit">Add</button>                    
                  </form>
                </div>
              </div>
            </div>
          </div>
      </div>   
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Enter a Name!";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    allTasks: state.allTasks,
    users: state.users
  }
}

const afterSubmit = (result, dispatch) => {
  dispatch(reset('UsersNewForm'));
}

export default reduxForm({
  validate,
  form: 'UsersNewForm',
  onSubmitSuccess: afterSubmit,
})(
  connect(mapStateToProps, actions)(UserTasks)
);