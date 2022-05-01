import React from 'react';
import Output from "./Output";

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: '' }
  }
 
  handleSubmit = (event) => {
    event.preventDefault()
    const value = (event.target.elements.inputField.value)
    this.setState({
      user: value
    })
    event.target.reset();
  }

render() {
  return (
    <div>
      <h2>Enter your to-do</h2>
      <form onSubmit={this.handleSubmit}>
        <label>Todo Item</label>
        <input
          type="text"
          name="inputField"
        />
      </form>
      <h2>Your todo lists include:</h2>
      {this.state.user ? <Output user = {this.state.user} key = {this.state.user}/> : <div>initial state</div>}
  
    </div >
  )
}
}

  export default Input;