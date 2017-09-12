import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

  render() {
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
              <li><Link to={'/'}><i className="fa fa-user-circle-o" aria-hidden="true"></i> Users Tasks</Link></li>
              <li><Link to={'/tasks'}><i className="fa fa-list" aria-hidden="true"></i> All Tasks</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}