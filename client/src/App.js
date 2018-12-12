import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import LogoutPage from './components/logout/LogoutPage'
import './App.css'
import TopBar from './components/layout/TopBar'
import ProjectsListContainer from './components/projects/ProjectsListContainer';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{marginTop:75}}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/projects" component={ProjectsListContainer} />
            
            <Route exact path="/" render={ () => <Redirect to="/projects" /> } />
          </main>
        </div>
      </Router>
    )
  }
}
export default App
