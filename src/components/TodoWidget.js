import React, { Component } from 'react';
import TodoItem from './TodoItem'
class TodoWidget extends Component {

  state = {
    todoItems: [],
    inputText: '',
    selectedFilter: "All"
  }

  componentDidMount = () => {
      const todoState = JSON.parse(localStorage.getItem("todoState"));
      if(localStorage.todoState) {
        this.setState({
        todoItems: todoState.todoItems,
        inputText: todoState.inputText,
        selectedFilter: todoState.selectedFilter
      })
    } 
  } 
  updateInputText = (event) => {
    this.setState({
      inputText: event.target.value
    })
  }

  addTodoItem = () => {
    const newTodo = {text: this.state.inputText, complete: false}
    if (this.state.inputText === '') return;
    this.setState({
      todoItems: [...this.state.todoItems, newTodo],
      inputText: ""
    }, res => {localStorage.setItem("todoState", JSON.stringify(this.state))})
  }

  deleteItem = (event) => {
    const index = +event.target.dataset.index
    const newTodos = [
      ...this.state.todoItems.slice(0, index),
      ...this.state.todoItems.slice(index + 1)
    ]
    this.setState({
      todoItems: newTodos
    }, res => {localStorage.setItem("todoState", JSON.stringify(this.state))})
  }

  toggleTodo = (event) => {
    const index = +event.target.dataset.index
    const todo = this.state.todoItems[index]
    const newTodo = Object.assign({}, todo, {
      complete: !todo.complete
    })

    const newTodos = [
      ...this.state.todoItems.slice(0, index),
      newTodo,
      ...this.state.todoItems.slice(index + 1)
    ]

    this.setState({
      todoItems: newTodos
    }, res => {localStorage.setItem("todoState", JSON.stringify(this.state))})
  }


  filterTodos = (todos, filter) => {
    return todos.filter(todo => {
      if(filter === "Done") return todo.complete
      else if( filter === "Todo") return !todo.complete
      else return true;
    })
  }

  setFilterAll = () => {
    this.setState({
      selectedFilter: "All"
    })
  }

  setFilterDone = () => {
    this.setState({
      selectedFilter: "Done"
    })
  }

  setFilterTodo = () => {
    this.setState({
      selectedFilter: "Todo"
    })
  }

  dragstart_handler = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  }



  render() {
    const {todoItems, inputText, selectedFilter} = this.state;

    return (

      <div className="todo-widget todoWidget" draggable='true' onDragStart={this.dragstart_handler} id='todoWidget' >
        <div className="todo-header todoWidget">
          <h3 className="todoWidget">{"// DAILY WORK PLANNER"}</h3>
          <div className="todo-input todoWidget">
            <input className="todoWidget" type="text" value={inputText} onChange={this.updateInputText} />
            <button className="todoWidget" onClick={this.addTodoItem}>Add Task</button>
          </div>
        </div>
        <div className="todo-list todoWidget">
        {this.filterTodos(todoItems, selectedFilter).map((item, i) => {
         return <TodoItem
           key={i} 
           index={i}
           complete={item.complete}
           toggleTodo={this.toggleTodo}
           deleteItem={this.deleteItem}
           >
           {item.text}
           </TodoItem>
        })}
        </div>
        <div className="todo-footer todoWidget">
          <div className="todo-filter todoWidget">
            <span className="filter-option todoWidget" onClick={this.setFilterAll} value="All" style={{textDecoration: this.state.selectedFilter === "All" ? "underline" : "none"}}>All</span>{" | "}
            <span className="filter-option todoWidget" onClick={this.setFilterDone} value="Done" style={{textDecoration: this.state.selectedFilter === "Done" ? "underline" : "none"}}>Done</span>{" | "}
            <span className="filter-option todoWidget" onClick={this.setFilterTodo} value="To-Do" style={{textDecoration: this.state.selectedFilter === "Todo" ? "underline" : "none"}}>To-Do</span>
          </div>
        </div>
      </div>
    )
  }
}

export default TodoWidget;