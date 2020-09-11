// Select all the elements form and the list
const todoForm=document.querySelector('.todo-form');
const todoInput=document.querySelector('.todo-input');
const todoList= document.querySelector('.todo-list');
const deleteAll = document.querySelector('.delete');
let todos = []; // declare the array to contain the todolist

// Event listener to listen to form submit
todoForm.addEventListener('submit', (event) =>{

    event.preventDefault();
    addTodo(todoInput.value);

});

// function to populate th array with the todo items
function addTodo(item){
    if(item !== ''){
        const todo ={
            id:Date.now(),
            name:item,
            completed:false
         };

         todos.push(todo);
     
         todoInput.value="";
    }
    addToLocalStorage(todos);
    

}
// function to render the todo to the screen
function display(todos){
    todoList.innerHTML="";
    todos.forEach(element => {
        const checked= element.completed ? 'checked' : null;
        const li = document.createElement('li');
        li.setAttribute('class','item');
        li.setAttribute('data-key',element.id)

        li.innerHTML=`<input type="checkbox" ${checked}/> ${element.name} <button class="delete-button"> X </button>`
        todoList.append(li);



    });

}
// Event listener to listen to the checkbox and the delete button
todoList.addEventListener('click', (event) =>{

        // if(event.target.type === 'checkbox'){
            
        // }
        if(event.target.className === "delete-button"){
            deleteTodo(event.target.parentElement.getAttribute('data-key'));
            display(todos);
        }
        if(event.target.type ==="checkbox"){
            toggle(event.target.parentElement.getAttribute('data-key'));
        }



});
// Function to delete from the todolist
function deleteTodo(id){
  todos= todos.filter(function(item){
        return item.id != id;

    });
    addToLocalStorage(todos);
} 
//Function to toggle between completed property
function toggle(id){
    todos.forEach(function(item){
        if(item.id == id){
            item.completed= !item.completed;
            addToLocalStorage(todos);
        }
    })
}
// Function to add the todolist to the  browser localstorage
function addToLocalStorage(todos){
    localStorage.setItem('todos',JSON.stringify(todos));
    display(todos);
}
// Function to get the todolist from the localstorage and render it to the screen
function getFromLocalStorage() {
    const list= localStorage.getItem('todos')
    if(list){
       todos= JSON.parse(list);
       display(todos)
    }
}
deleteAll.addEventListener('click',function() {
    todos=todos.filter(function(item){
        return item.completed==false;
    });
    addToLocalStorage(todos);

});
getFromLocalStorage();
