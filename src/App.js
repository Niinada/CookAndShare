import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'

import store from './store'
import setAuthToken from './utils/setAuthToken'

import { setCurrentUser, logout } from './actions/auth'

import PrivateRoute from './components/shared/PrivateRoute'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AllPosts from './components/all-posts/AllPosts'
import SinglePost from './components/single-post/SinglePost'
import UserProfile from './components/user-profile/UserProifle'
import Feed from './components/feed/Feed'
import NotFound from './components/not-found/NotFound'
import CreateRecipe from './components/shared/PostForm'
import {checkLogin} from './actions/auth'

function Func() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    checkLogin(dispatch);
  })
  return dispatch
}

function App() {
  return (
    <Provider store={store}>
      <Func />
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <div className="container">
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={AllPosts} />
            <Route path="/post/:id" component={SinglePost} />
            <Route path="/user/:id" component={UserProfile} />
            <Route path="/createRecipe" component={CreateRecipe}/>
            <Switch>
              <PrivateRoute path="/feed" component={Feed} />
            </Switch>
            <Route path="/404" component={NotFound} />
          </div>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  )
}

export default App
