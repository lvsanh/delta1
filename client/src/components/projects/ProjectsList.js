import React, {Component} from 'react'

class ProjectsList extends Component {
    render () {
        return (
            <div>
                {this.props.projects.map(project => {
                    return (
                        <ul>
                            <li>{project.name}</li>
                        </ul>
                    )
                })}
            </div>

        )
    }

}

export default ProjectsList