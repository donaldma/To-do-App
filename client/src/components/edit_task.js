import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

class EditTaskModal extends Component {
  render() {
    return (
      <div className="modal fade" id="edit-task-modal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Task</h4>
            </div>
            <div className="modal-body">
              <form className="form-inline" onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
                <Field
                  label="Enter a task:"
                  name="edit"
                  component={this.props.renderField}
                />
                <button type="submit" className="modal-submit">Submit</button>                    
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

  if (!values.edit) {
    errors.edit = "Enter a Task!";
  }

  return errors;
}

const afterSubmit = (result, dispatch) => {
  dispatch(reset('TaskEditForm'));
}

export default reduxForm({
  validate,
  form: 'TaskEditForm',
  onSubmitSuccess: afterSubmit,
})(
  connect(null, actions)(EditTaskModal)
);