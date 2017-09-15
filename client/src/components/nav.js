import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../actions';
import SideNav from 'react-simple-sidenav';

class NavBar extends Component {
  renderUsers = () => {
    if(_.size(this.props.users) === 0) {
      return(
        <li className="no-users-found">
          Loading...
        </li>
      );
    }

    return _.map(this.props.users, (user, index) => {
      return (
        <li className="mobile-nav" key={index} >
          <a href="#" onClick={this.props.selectedUser.bind(this, user.id)} >{user.name}</a>
        </li>
      );
    })
  }

  render() {
    if(_.size(this.props.users) === 0) {
      return (
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <ul className="navbar-toggle nav-logo">
                <li><a href="/">To Do</a></li>
              </ul> 
              <button type="button" className="navbar-toggle nav-menu" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>                        
              </button>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="full-nav"><a href="/">To Do</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="full-nav"><Link to={'/'}><i className="fa fa-user-circle-o" aria-hidden="true"></i> Users Tasks</Link></li>
                <li className="full-nav"><Link to={'/tasks'}><i className="fa fa-list" aria-hidden="true"></i> All Tasks</Link></li>
                <li className="mobile-nav"><a href='/'><i className="fa fa-user-circle-o" aria-hidden="true"></i> Users Tasks</a></li>
                <li className="mobile-nav"><a href='/tasks'><i className="fa fa-list" aria-hidden="true"></i> All Tasks</a></li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <ul className="navbar-toggle nav-logo">
              <li><a href="/">To Do</a></li>
            </ul> 
            <button onClick={ () => this.setState({ showNav: true })} type="button" className="navbar-toggle nav-menu" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>                        
            </button>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li className="full-nav"><a href="/">To Do</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="full-nav"><Link to={'/'}><i className="fa fa-user-circle-o" aria-hidden="true"></i> Users Tasks</Link></li>
              <li className="full-nav"><Link to={'/tasks'}><i className="fa fa-list" aria-hidden="true"></i> All Tasks</Link></li>
              <li className="mobile-nav"><a href='/'><i className="fa fa-user-circle-o" aria-hidden="true"></i> Users Tasks</a></li>
              <li className="mobile-nav"><a href='/tasks'><i className="fa fa-list" aria-hidden="true"></i> All Tasks</a></li>
              <li className="mobile-nav"><a href="#" data-toggle="modal" data-target="#users-modal"><i className="fa fa-plus" aria-hidden="true"></i> Add User</a></li>
              <li className="seperator"></li>
              {this.renderUsers()}              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, actions)(NavBar)