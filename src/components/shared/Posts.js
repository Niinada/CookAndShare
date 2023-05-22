import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pagination from "react-js-pagination"
import axios from 'axios'
import { UPDATE_POSTS } from '../../actions/types'
import { getAll } from '../../actions/post'

import Post from './Post'
import Loader from './Loader'

const LIMIT = 10

class Posts extends React.Component {

  constructor() {
    super()
    this.state = { activePage: 1 }
    this.before = []
  }

  componentDidMount() {
    this.props.getAll(this.getQueryParams())
  }

  onPageChange = (activePage) => {
    this.setState({ activePage }, () => {
      this.props.getAll(this.getQueryParams())
    })
  }

  getQueryParams() {
    return Object.assign(
      {
        skip: (this.state.activePage - 1) * LIMIT,
        limit: LIMIT
      },
      this.props.queryParams
    )
  }

  render() {
    const { post } = this.props.post
    if (post == null)
    {
      return (
        <React.Fragment>
          <div className="text-center">
            <h2>Тут пока ничего нет</h2>
          </div>
        </React.Fragment>
      )
    }

    let isLoading = post.isLoading
    let posts = []
    console.log('post', post)
    if (post.posts != undefined)
    {
      posts = post.posts
    }
    else
    {
      
      axios
      .get('https://localhost:44314/Recipe')
      .then((res) => { 
        const count = res.data.$values.length
        let from = count - 0
        const to = from - 10 + 1
        while (to <= from && from > 0)
        {
          axios
          .get(`https://localhost:44314/Recipe/getRecipe/${from}`)
          .then((data) => {
            posts.push(data.data)
          })
          --from
        }
      })
      console.log(posts)
    }
    if (posts.length) 
    {
      this.before = posts
    }
    else 
    {
      posts = this.before
    }
    let totalCount = post.totalCount

    return (
      <React.Fragment>
        {isLoading && <Loader />}
        {!isLoading && totalCount === 0 && (
          <div className="text-center">
            <h2>Тут пока ничего нет</h2>
          </div>
        )}
        {
        posts.map((p) => { 
        return <Post post={p} key={p.id} TYPE={UPDATE_POSTS} />})}
        
        {!isLoading && totalCount > posts.length && (
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={LIMIT}
            totalItemsCount={totalCount}
            onChange={this.onPageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        )}
      </React.Fragment>
    )
  }
}

Posts.propTypes = {
  getAll: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  queryParams: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
})

export default connect(mapStateToProps, { getAll })(Posts)
