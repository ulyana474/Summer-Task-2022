import React from 'react';

class Input extends React.Component {
    constructor(props) {
      super(props)
      this.state = { username: '' }
    }

handleInputChange(username) {
  this.setState({username})
}
render() {
  const { username } = this.state
  return (
    <div>
      <div>
        <input 
          type="text"
          value={this.state.username}
          onChange={event => this.handleInputChange(event.target.value)}
        />
        {username}
      </div>
    </div>
  )
}
}

  export default Input;