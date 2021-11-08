import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import FormFieldValidator from './FormFieldValidator'

class FormFieldRow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: this.props.defaultValue ? this.props.defaultValue : '',
      imagePreview: false,
      imagePreviewUrl: true
    }

    this.handleOnFieldChange = this.handleOnFieldChange.bind(this)
    this.handleOnFieldBlur = this.handleOnFieldBlur.bind(this)
    this.isValidValue = this.isValidValue.bind(this)
    this.showImagePreview = this.showImagePreview.bind(this)
  }

  isValidValue (value) {
    if (!this.props.validRegex) {
      return true
    }
    return this.props.validRegex.test(value)
  }

  handleOnFieldChange (event) {
    // For a regular input field, read field name and value from the event.
    const fieldName = event.target.name
    const fieldValue = (this.props.inputType === 'checkbox') ? event.target.checked : event.target.value
    this.setState({ value: fieldValue })
    if (this.isValidValue(fieldValue)) {
      this.setState({ invalid: false })
    }
    this.props.onChange(fieldName, fieldValue)
  }

  handleOnFieldBlur (event) {
    this.setState({ invalid: !this.isValidValue(this.state.value) })
  }

  handleShowImagePreview (event) {
    this.setState({ imagePreview: true, imagePreviewUrl: this.state.value })
  }

  render () {
    return (
      <div>
        <div className='row'>
          {this.props.tooltip &&
            <OverlayTrigger placement='top' overlay={props => <Tooltip {...props}>{this.props.tooltip}</Tooltip>}>
              <span htmlFor={this.props.inputName} className='col-md-3 form-field-label' dangerouslySetInnerHTML={{ __html: this.props.label }} />
            </OverlayTrigger>}
          {!this.props.tooltip &&
            <label htmlFor={this.props.inputName} className='col-md-3 form-field-label' dangerouslySetInnerHTML={{ __html: this.props.label }} />}
          <div className='col-md-6 '>
            {(this.props.inputType === 'textarea') &&
              <textarea
                id={this.props.inputName}
                name={this.props.inputName}
                className='form-control'
                onChange={this.handleOnFieldChange}
                onBlur={this.handleOnFieldBlur}
                rows={this.props.rows}
                cols={this.props.cols}
              >
                {this.props.value}
              </textarea>}
            {(this.props.inputType !== 'textarea') &&
              <input
                id={this.props.inputName}
                name={this.props.inputName}
                className='form-control'
                type={this.props.inputType}
                selected={this.props.defaultValue}
                value={this.props.value}
                onChange={this.handleOnFieldChange}
                onBlur={this.handleOnFieldBlur}
              />}
          </div>
          {this.props.imageUrl ? <span className='btn btn-primary' onClick={this.handleShowImagePreview}>Preview</span> : <FormFieldValidator invalid={this.state.invalid} className='col-md-3' message={this.props.validatorMessage} />}
        </div>
        {this.state.imagePreview &&
          <div className='text-center'>
            <img src={this.state.imagePreviewUrl} alt='logo' className='submission-image' />
          </div>}
      </div>
    )
  }
};

export default FormFieldRow
