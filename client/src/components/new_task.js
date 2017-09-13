import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

class NewTaskModal extends Component {

  render() {
    return (
      <div className="modal fade" id="tasks-modal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">New Task</h4>
            </div>
            <div className="modal-body">
              <form className="form-inline" 
                onSubmit={this.props.handleSubmit(this.props.onSubmit)}
              >
                <Field
                  label="Enter a task:"
                  name="task"
                  component={this.props.renderField}
                />
                <button type="submit" className="modal-submit">Add</button>                    
              </form>
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

  if (!values.task) {
    errors.task = "Enter a Task!";
  }

  return errors;
}

const afterSubmit = (result, dispatch) => {
  dispatch(reset('TasksNewForm'));
}

export default reduxForm({
  validate,
  form: 'TasksNewForm',
  onSubmitSuccess: afterSubmit,
})(
  connect(null, actions)(NewTaskModal)
);