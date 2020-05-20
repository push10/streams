import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (<div className="ui error message">
                <div className="header"> {error}</div>
            </div>)
        }
    }
    renderInput = ({ input, lable, meta }) => { 
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return <div className={className}>
            <label>{lable}</label>
            <input {...input} />
            {this.renderError(meta)}
        </div>
    }
    onSubmit = formValues => {
        this.props.onSubmit(formValues)
    }
    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} lable="Enter Title" />
                <Field name="description" component={this.renderInput} lable="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
};


const validate = formValues => {
    const errors = {}
    if (!formValues.title) {
        errors.title = "Empty title"
    }
    if (!formValues.description) {
        errors.description = "Empty description"
    }
    return errors
}

export default reduxForm({
    form: 'streamForm', validate
})(StreamForm);