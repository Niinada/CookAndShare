import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { remove } from '../../../actions/post'

import Like from './Like'

class Post extends React.Component {

  componentDidMount() {
    this.refs.body.innerHTML = this.props.post.description
  }

  onDelete = () => this.props.remove(this.props.post.id)

  render() {
    console.log('props', this, )
    let post = this.props.post
    let auth = this.props.auth
    let TYPE = this.props.TYPE
    if (post.posts != undefined)
      {
        post = post.posts[0]
      }
    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-2">
                <Link to={'/user/' + post.user.Id}>
                </Link>
              </div>
              <div className="ml-2">
                <div className="h5 m-0">
                  <Link to={'/user/' + post.user.Id} style={ {color: "black"} }>
                    {post.user.Name}
                  </Link>
                </div>
                <div className="h7 text-muted">
                  <i className="fa fa-clock-o"></i> {new Date(post.name).toDateString()}
                </div>
              </div>
            </div>
            {auth.isAuthenticated && auth.user.Id === post.user.Id && (
              <div className="dropdown">
                <button className="btn btn-link dropdown-toggle" type="button" id="drop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="drop">
                  <a className="dropdown-item" role="button" onClick={this.onDelete}>Удалить</a>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="card-body" ref="body"></div>
        <div className="card-footer">
          <Like postId={post.id} likes={post.likes} TYPE={TYPE} />
          <Link to={'/post/' + post.id} className="card-link">
            <i className="fa fa-comment"/>
          </Link>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  remove: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  TYPE: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { remove })(Post)