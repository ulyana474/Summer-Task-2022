import React from 'react';
import RepoItem from "./RepoItem";

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = { repoList: [] }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const value = (event.target.elements.inputField.value)
    this.setState(({repoList}) => ({
      repoList: repoList.concat(value)
    }))
    event.target.reset();
  }

render() {
  const { repoList } = this.state
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
  { repoList.map(i => <RepoItem item={i} /> )}
    </div >
  )
}
}

  export default Input;