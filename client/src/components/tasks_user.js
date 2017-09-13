import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import _ from 'lodash';
import Moment from 'react-moment';
import SideBar from './sidebar';
import NewUserModal from './new_user';
import NewTaskModal from './new_task';

class UserTasks extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      selectedUser: false
    }
  }
  componentDidMount() {
    this.props.fetchUsers();
  }
  
  onSubmit = (values) => {
    this.props.createUser(values, () => {
      this.props.fetchUsers();
      $('#users-modal').modal('hide');
    });
  }

  onTaskSubmit = (values) => {
    this.props.createTask(values, this.state.selectedUser, () => {
      this.props.selectUserTasks(this.state.selectedUser)
      $('#tasks-modal').modal('hide');
    });
  }

  toggleComplete = (task, id) => {
    this.props.toggleCompletedTrue(task, id, () => {
      this.selectedUser(id)      
    })
  }

  toggleNotComplete = (task, id) => {
    this.props.toggleCompletedFalse(task, id, () => {
      this.selectedUser(id)
    })
  }

  selectedUser = (id) => {
    this.props.selectUserTasks(id)
    this.setState({ selectedUser: id })
  }

  onDeleteUserClick = (id) => {
    this.props.deleteUser(id, () => {
      this.props.fetchUsers();
    })
  }

  renderUsers = () => {
    return _.map(this.props.users, (user, index) => {
      return (
        <li onClick={this.selectedUser.bind(this, user.id)} key={index} className="list-group-item">
          {user.name}
          <span className="settings-buttons">
            <a href="#" className="delete-button" onClick={this.onDeleteUserClick.bind(this, user.id)} ><i className="fa fa-lg fa-times-circle" aria-hidden="true"></i></a>
            <a href="#" className="edit-button"><i className="fa fa-lg fa-pencil" aria-hidden="true"></i></a>
          </span>
        </li>
      );
    })
  }

  renderTasks() {
    if(_.size(this.props.usersTasks) === 0) { 
      if(this.state.selectedUser) {
        return (
          <div className="welcome">
            <h3>No Tasks</h3>
            <div className="add-button">
              <button className="main-button" data-toggle="modal" data-target="#tasks-modal"><i className="fa fa-plus" aria-hidden="true"></i> Add Task</button>
            </div>
            <NewTaskModal renderField={this.renderField} onSubmit={this.onTaskSubmit} />            
          </div>
        );
      } 
      return (
        <div className="welcome">
          <h3>Choose a user or add a user to begin!</h3>
        </div>
      );
    }
    
    return _.map(this.props.usersTasks, (task, index) => {
      if(!task.completed) {
        return (
          <li onClick={this.toggleComplete.bind(this, task, task.user_id)} key={index} className="list-group-item">
            {task.name}
            <span className="settings-buttons">
              <a href="#" className="delete-button"><i className="fa fa-lg fa-times-circle" aria-hidden="true"></i></a>
              <a href="#" className="edit-button"><i className="fa fa-lg fa-pencil" aria-hidden="true"></i></a>
            </span>
            <a href="#" className="complete-button" onClick={this.toggleComplete.bind(this, task, task.user_id)} ><i className="fa fa-lg fa-circle-thin" aria-hidden="true"></i></a>
          </li>
        );
      }
      return (
        <li onClick={this.toggleNotComplete.bind(this, task, task.user_id)} key={index} className="list-group-item">
          <s>{task.name}</s>
          <span className="settings-buttons">          
            <a href="#" className="delete-button"><i className="fa fa-lg fa-times-circle" aria-hidden="true"></i></a>
            <a href="#" className="edit-button"><i className="fa fa-lg fa-pencil" aria-hidden="true"></i></a>
          </span>
          <a href="#" className="complete-button-on" onClick={this.toggleComplete.bind(this, task, task.user_id)} ><i className="fa fa-lg fa-check-circle" aria-hidden="true"></i></a>          
        </li>
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
          onKeyPress={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }} 
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

  render() {
    if(_.size(this.props.users) === 0) {    
      return (
        <div className="loading">
          Loading..
        </div>
      );
    }
    if(_.size(this.props.usersTasks) === 0) { 
      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="jumbotron home-jumbo">
                <h1 className="jumbo-head">
                  Users Tasks
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="side">
                <SideBar renderUsers={this.renderUsers} />
                <div className="add-button">
                  <button className="main-button" data-toggle="modal" data-target="#users-modal"><i className="fa fa-plus" aria-hidden="true"></i> Add User</button>
                </div>
              </div>
              <div className="main">
 
                <ul className="list-group">
                  {this.renderTasks()}
                </ul>
              </div>
            </div>
          </div>
          <NewUserModal renderField={this.renderField} onSubmit={this.onSubmit} />
        </div> 
      );
    }

    return(
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron home-jumbo">
              <h1 className="jumbo-head">
                Users Tasks
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="side">
              <SideBar renderUsers={this.renderUsers} />            
              <div className="add-button">
                <button className="main-button" data-toggle="modal" data-target="#users-modal"><i className="fa fa-plus" aria-hidden="true"></i> Add User</button>
              </div>
            </div>
            <div className="main">
              <ul className="list-group">
                {this.renderTasks()}
              </ul>
              <div className="add-button">
                <button className="main-button" data-toggle="modal" data-target="#tasks-modal"><i className="fa fa-plus" aria-hidden="true"></i> Add Task</button>
              </div>
            </div>
          </div>
        </div>
        <NewUserModal renderField={this.renderField} onSubmit={this.onSubmit} />
        <NewTaskModal renderField={this.renderField} onSubmit={this.onTaskSubmit} />
      </div>   
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    usersTasks: state.usersTasks    
  }
}


export default connect(mapStateToProps, actions)(UserTasks)
