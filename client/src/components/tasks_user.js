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
  
  /* ==== SUBMIT HANDLER FOR NEW USERS ==== */  
  
  onSubmit = (values) => {
    const lowerPropsUsersArr = _.map(this.props.users, user => {
      return _.lowerCase(user.name)
    })
    
    const lowerSubmittedUser = _.lowerCase(values.name);
    function isSame(user) { 
      return user === lowerSubmittedUser
    }

    if(lowerPropsUsersArr.some(isSame)) {
      alert(`User ${values.name} already exists`)
      return false;
    }
       
    this.props.createUser(values, () => {
      this.props.fetchUsers();
      $('#users-modal').modal('hide');
    });
  }

  /* ==== SUBMIT HANDLER FOR NEW TASKS ==== */  

  onTaskSubmit = (values) => {
    this.props.createTask(values, this.state.selectedUser, () => {
      this.props.selectUserTasks(this.state.selectedUser)
      $('#tasks-modal').modal('hide');
    });
  }

  /* ==== SUBMIT HANDLER FOR EDIT USER (NOT USED ATM) ==== */  

  onEditTaskSubmit = (values, id) => {
    this.props.editTask(values, this.state.selectedUser, () => {
      this.props.fetchUsers();
      $('#edit-users-modal').modal('hide');
    });
  }

  /* ==== CHANGE COMPLETEION TO COMPLETE ==== */
  
  toggleComplete = (task, id) => {
    this.props.toggleCompletedTrue(task, id, () => {
      this.selectedUser(id)      
    })
  }

  /* ==== CHANGE COMPLETEION TO NOT COMPLETE ==== */

  toggleNotComplete = (task, id) => {
    this.props.toggleCompletedFalse(task, id, () => {
      this.selectedUser(id)
    })
  }

  /* ==== SELECT USER FUNCTION ==== */

  selectedUser = (id) => {
    this.props.selectUserTasks(id)
    this.setState({ selectedUser: id })
  }

  /* ==== DELETE TASK FUNCTION ==== */

  onDeleteTaskClick = (task, id) => {
    this.props.deleteTask(task, id, () => {
      this.props.selectUserTasks(id)          
    })
  }

  /* ==== DELETE USER FUNCTION ==== */

  onDeleteUserClick = (id) => {
    this.props.deleteUser(id, () => {
      this.props.fetchUsers();    
      this.props.clearState();
      this.setState({ selectedUser: false })
    })
  }

  /* ==== RENDER TASKS ==== */

  renderTasks() {
    if(_.size(this.props.usersTasks) === 0) { 
      /* ==== IF USER IS SELECTED AND HAS NO TASKS ==== */
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
      /* ==== FIRST THING YOU SEE BEFORE YOU SELECT A USER ==== */
      return (
        <div className="welcome">
          <h3>Choose a user or add a user to begin!</h3>
        </div>
      );
    }
    
    return _.map(this.props.usersTasks, (task, index) => {
      if(!task.completed) {
        /* ==== IF USER HAS TASKS THAT ARE NOT COMPLETED ==== */
        return (
          <li key={index} onClick={this.toggleComplete.bind(this, task, task.users_id)} className="list-group-item">
            {task.name}
            <span className="settings-buttons">
              <a href="#" onClick={this.onDeleteTaskClick.bind(this, task, task.users_id)} className="delete-button"><i className="fa fa-lg fa-times-circle" aria-hidden="true"></i></a>
            </span>
            <a href="#" className="complete-button" onClick={this.toggleComplete.bind(this, task, task.users_id)} ><i className="fa fa-lg fa-circle-thin" aria-hidden="true"></i></a>
          </li>
        );
      }
      /* ==== IF USER HAS TASKS THAT ARE COMPLETED ==== */
      return (
        <li key={index} onClick={this.toggleNotComplete.bind(this, task, task.users_id)} className="list-group-item">
          <s>{task.name}</s>
          <span className="settings-buttons">          
            <a href="#" onClick={this.onDeleteTaskClick.bind(this, task, task.users_id)} className="delete-button"><i className="fa fa-lg fa-times-circle" aria-hidden="true"></i></a>
          </span>
          <a href="#" className="complete-button-on" onClick={this.toggleNotComplete.bind(this, task, task.users_id)} ><i className="fa fa-lg fa-check-circle" aria-hidden="true"></i></a>          
        </li>
      );
      
    })
  }

  /* ==== RENDER REDUX FORM FIELDS ==== */

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
    /* ==== IF NO USER IS SELECTED DO NOT SHOW ADD NEW TASK BUTTON ==== */  
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
                <SideBar selectedUser={this.selectedUser} onDeleteUserClick={this.onDeleteUserClick} />
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
    
    /* ==== IF A USER IS SELECTED SHOW ADD NEW TASK BUTTON ==== */  
    
    return(
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron home-jumbo">
              <h1 className="jumbo-head">
                Users Tasks<span className="jumbo-sub">{this.props.usersTasks.user}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="side">
              <SideBar selectedUser={this.selectedUser} onDeleteUserClick={this.onDeleteUserClick} />            
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
