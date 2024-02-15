const inputBox = document.getElementById('inputBox')
const addBtn = document.getElementById('addBtn')
const todoList = document.getElementById('todoList')

// I am declaring the `editTodo` variable globally becasue I want to use it in the `addTodo()` and `updateTodo()`  
let editTodo = null

// Function to add to do
const addTodo = () => {
  const inputText = inputBox.value.trim()
  if(inputText.length <= 0) {
    alert('You must write something in your to do')
    return false
  }

  if(addBtn.value === 'Edit') {
    // Passing the original text to editLocalTodos function before edit it in the todoList
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML)
    editTodo.target.previousElementSibling.innerHTML = inputText
    // We should not pass the `inputText (i.e., inputBox.value)` to editLocalTodos() function instead we should pass the text inside <p></p> of the selected list item.
    // editLocalTodos(inputText)
    addBtn.value = 'Add'
    inputBox.value = ''
  }
  else {
    // creating this (i.e., `<li><p>inputText</p></li>`)
    const li = document.createElement('li')
    const p = document.createElement('p')
    p.innerHTML = inputText
    li.appendChild(p)

    //creating edit Button
    const editBtn = document.createElement('button')
    editBtn.innerText = 'Edit'
    editBtn.classList.add('btn', 'editBtn')
    li.appendChild(editBtn)

    //creating delete Button
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'Remove'
    deleteBtn.classList.add('btn', 'deleteBtn')
    li.appendChild(deleteBtn)

    todoList.appendChild(li)
    inputBox.value = ''

    saveLocalTodos(inputText)
  }
}

// Function to update (`edit` and `delete`) to do 
const updateTodo = (e) => {
  // console.log(e.target.innerHTML)
  if(e.target.innerHTML === 'Remove') {
    // console.log(e.target.parentElement) // `li` is parentElement of `Remove` button and `Edit` button
    e.target.parentElement.remove()
    deleteLocalTodos(e.target.parentElement)
  } 
  if(e.target.innerHTML === 'Edit') {
    // when you click the "Edit" button, it retrieves the text of the corresponding todo item and sets it as the value of the input box, allowing you to edit the todo item directly in the input 
    inputBox.value = e.target.previousElementSibling.innerHTML
    inputBox.focus()
    addBtn.value = 'Edit'
    editTodo = e
  }

}

// Function to save local todo
const saveLocalTodos = (todo) => {
  // let todos = []
  // console.log(localStorage.getItem('todos'))
  // console.log(JSON.parse(localStorage.getItem('todos')))
  let todos 
  if(localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
  // console.log(todos)
}

// Function to get local todo
const getLocalTodos = (todo) => {
  let todos 
  if(localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
    todos.forEach((todo) => {
      // creating this (i.e., `<li><p>inputText</p></li>`)
      const li = document.createElement('li')
      const p = document.createElement('p')
      p.innerHTML = todo // Here, we'll not pass `inputText` in the `p.innerHTML`. I will pass the `todo`
      li.appendChild(p)

      //creating edit Button
      const editBtn = document.createElement('button')
      editBtn.innerText = 'Edit'
      editBtn.classList.add('btn', 'editBtn')
      li.appendChild(editBtn)

      //creating delete Button
      const deleteBtn = document.createElement('button')
      deleteBtn.innerText = 'Remove'
      deleteBtn.classList.add('btn', 'deleteBtn')
      li.appendChild(deleteBtn)

      todoList.appendChild(li)
    })
  }
}

//Function to delete local todo
const deleteLocalTodos = (todo) => {
  let todos 
  if(localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  let todoText = todo.children[0].innerHTML
  // console.log(todoText.children[0].innerHTML)
  let todoIndex = todos.indexOf(todoText)
  console.log(todoIndex)
  //Here, we're using `splice()` method becasue we want to remove the element from the original `todos` array
  todos.splice(todoIndex, 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}

//Function to delete local todo
const editLocalTodos = (todo) => {
  // Here, I did not check whether there is any key named as `todos` in my `localStorage` becasue if the `localStorage` will empty then there will not be any li and there will not be any li then what will I edit
  let todos = JSON.parse(localStorage.getItem('todos'))
  let todoIndex = todos.indexOf(todo)
  todos[todoIndex] = inputBox.value
  localStorage.setItem('todos', JSON.stringify(todos))
}

document.addEventListener('DOMContentLoaded', getLocalTodos)
addBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', updateTodo)
