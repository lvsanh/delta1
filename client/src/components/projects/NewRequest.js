import React, {Component} from 'react'

class NewRequest extends Component {
    state={}

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onSubmit(this.state)
    }

    handleChange = (event) => {
        const {name, value} = event.target
        //[event.target.name] = event.target.value
        this.setState({
            [name]: value
        })
    }


    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}> 
                    <input type="text" name="name" onChange={this.handleChange} />
                    <button>Submit</button>
                </form>
            </div>

        )
    }

}

export default NewRequest