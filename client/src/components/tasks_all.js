import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import _ from 'lodash';
import Moment from 'react-moment';
import NavBar from './nav';

class AllTasks extends Component {
  componentDidMount() {
    this.props.fetchAllTasks();
  }
  
  renderTasks() {
    const orderedTasks = _.orderBy(this.props.allTasks, 'created_at', 'desc')
    
    return _.map(orderedTasks, (task, index) => {
      if(!task.completed) {
        return (
          <tr key={index}>
            <td>{task.user}</td>
            <td>{task.name}</td>
            <td><Moment format="MMMM D, YYYY">{task.created_at}</Moment></td>
            <td><span className="label label-warning">In Progress</span></td>
          </tr>
        );
      }
      return (
        <tr key={index}>
          <td>{task.user}</td>
          <td><s>{task.name}</s></td>
          <td><Moment format="MMMM D, YYYY">{task.created_at}</Moment></td>
          <td><span className="label label-success">Completed</span></td>
        </tr>
      );
    })
  }

  render() {
    if(_.size(this.props.allTasks) === 0) {
      return (
        <div>
          <NavBar />
          <div className="row">
            <div className="col-md-12">
              <div className="jumbotron">
                <h1 className="jumbo-head">
                  All Tasks
                </h1>
              </div>
            </div>
          </div>
          <div className="row">   
            <div className="col-md-12">                     
              <h3 className="welcome">No Tasks</h3>
            </div>
          </div>
        </div>
      );
    }
    return(
      <div>
        <NavBar />        
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1 className="jumbo-head">
                All Tasks
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">          
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Task</th>
                  <th>Date Created</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTasks()}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allTasks: state.allTasks
  }
}

export default connect (mapStateToProps, actions )(AllTasks);