import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../actions';

class SideBar extends Component {

  renderUsers = () => {
    if(_.size(this.props.users) === 0) {
      return(
        <li className="list-group-item no-users-found">
          No users Found
        </li>
      );
    }

    return _.map(this.props.users, (user, index) => {
      return (
        <li onClick={this.props.selectedUser.bind(this, user.id)} key={index} className="list-group-item">
          {user.name}
          <span className="settings-buttons">
            <a href="#" className="delete-button" onClick={this.props.onDeleteUserClick.bind(this, user.id)} ><i className="fa fa-lg fa-times-circle" aria-hidden="true"></i></a>
          </span>
        </li>
      );
    })
  }

  handleSubmit = (e) => {
    if(this.refs.search.value === "") {
      e.preventDefault();
      this.props.fetchUsers()
      return false
    }
    e.preventDefault();    
    this.props.searchUser(this.refs.search.value)
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <form className="form-group" onSubmit={this.handleSubmit}>
            <input ref="search" type="text" className="form-control" placeholder="Search" />
          </form>
        </div>
        <ul className="list-group">
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, actions)(SideBar)