import React, {PureComponent} from 'react'
import {getProjects, createProject} from '../../actions/projects'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import ProjectsList from './ProjectsList'
import NewRequest from './NewRequest'
//import Button from 'material-ui/Button'
//import Paper from 'material-ui/Paper'
//import Card, { CardActions, CardContent } from 'material-ui/Card'
//import Typography from 'material-ui/Typography'
//import './GamesList.css'

class ProjectsListContainer extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.projects === null) this.props.getProjects()
      
    }
  }

  createNewProject = (project) => {
    this.props.createProject(project)
  } 

  render() {
    const {projects, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (projects === null) return null

    return (
        <div>
            <ProjectsList projects={this.props.projects} />

            <div>
              {authenticated && <NewRequest onSubmit={this.createNewProject}/>}
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  projects: state.projects

//   users: state.users === null ? null : state.users,
//   games: state.games === null ?
//     null : Object.values(state.games).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getProjects, createProject})(ProjectsListContainer)
