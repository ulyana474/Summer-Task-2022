import React from 'react';
import TodoItem from "./TodoItem";

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = { todoList: [] }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const value = (event.target.elements.todoitem.value)
    this.setState(({todoList}) => ({
      todoList: todoList.concat(value)
    }))
  }


render() {
  const { todoList } = this.state
  return (
    <div>
      <h2>Enter your to-do</h2>
      <form onSubmit={this.handleSubmit}>
        <label>Todo Item</label>
        <input
          type="text"
          name="todoitem"
        />
        <button type="submit">Submit</button>
      </form>
      <h2>Your todo lists include:</h2>
  { todoList.map(i => <TodoItem item={i} /> )}
    </div >
  )
}
}

  export default Input;