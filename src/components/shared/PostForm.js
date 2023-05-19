import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Quill from 'react-quill'
import 'quill/dist/quill.snow.css'

import { create } from '../../actions/post'

class PostForm extends React.Component {

  constructor() {
    super()
    this.state = { name: '', description: '' }
  }

  onChangeBody = (body) => this.setState({ body })

  onSubmit = (e) => {
    console.log(this.state)
    this.props.create(this.state)
    this.setState({ body: '' })
  }
  
  render() {
    return (
      <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          <Quill
            theme="snow"
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['link', 'image', 'video'],
                ['clean']
              ]
            }}
            value={this.state.body}
            onChange={this.onChangeBody}
          />
          </div>
          <div className="btn-group float-right">
            <button type="submit" className="btn btn-dark">Отправить</button>
          </div>
        </form>
      </div>
    </div>
    )
  }
}

PostForm.propTypes = {
  create: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { create })(PostForm)
