import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Quill from 'react-quill'
import 'quill/dist/quill.snow.css'

import { create } from '../../actions/post'

class PostForm extends React.Component {

  constructor() {
    super()
    this.state = { name: '', discription: '' }
  }

  onChangeBody = (discription) => { this.setState({ discription })}

  onSubmit = (e) => {
    e.preventDefault()
    this.state.name = new Date()
    this.props.create(this.state)
    this.setState({name: '', discription: '' })
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
            value={this.state.discription}
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
