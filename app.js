//selectors
const todoInput = document.querySelector('#todo-input')
const todoBtn = document.querySelector('.todoBtn')
const todoList = document.querySelector('.todo-list')
const filterOptions = document.querySelector('.filter-todo')

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOptions.addEventListener('click', filterTodo)

//Functions
function addTodo (event){
    event.preventDefault()

    const inputValue = todoInput.value

    //Todo DIV
    const todoDiv = document.createElement('div')
    todoList.appendChild(todoDiv)
    todoDiv.classList.add('todo')

    //create li
    const listItems = document.createElement('li')
    listItems.classList.add('todo-item')
    todoDiv.appendChild(listItems)
    listItems.innerText = inputValue


    //Add todo to localstorage
    saveLocalTodos(todoInput.value)

    
    //create check button
    const checkBtns = document.createElement('button')
    checkBtns.innerHTML = '<i class="bx bx-check-double"></i>';
    checkBtns.classList.add('complete-btn')
    todoDiv.appendChild(checkBtns)


    //create delete-button
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = '<i class="bx bxs-trash-alt"></i>';
    deleteBtn.classList.add('delete-btn')
    todoDiv.appendChild(deleteBtn);
    
    //clear todoInput value
    todoInput.value = ''
}

function deleteCheck(e){
    const item = e.target

    // delete items
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement
        console.log(todo)
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
    }


    //check marks items
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach(function(todo) {
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }

                else{
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }
                else{
                    todo.style.display = 'none'
                }
                break
        }
    })
}

function saveLocalTodos(todo){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(todo => {
        const inputValue = todo;

        //Todo DIV
        const todoDiv = document.createElement("div");
        todoList.appendChild(todoDiv);
        todoDiv.classList.add("todo");

        //create li
        const listItems = document.createElement("li");
        listItems.classList.add("todo-item");
        todoDiv.appendChild(listItems);
        listItems.innerText = inputValue;

        //create check button
        const checkBtns = document.createElement("button");
        checkBtns.innerHTML = '<i class="bx bx-check-double"></i>';
        checkBtns.classList.add("complete-btn");
        todoDiv.appendChild(checkBtns);

        //create delete-button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="bx bxs-trash-alt"></i>';
        deleteBtn.classList.add("delete-btn");
        todoDiv.appendChild(deleteBtn);
    })
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}