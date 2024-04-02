let btnAddTAskEl = document.querySelector('Button')
let taskNameEl   = document.querySelector('#content')

let tasks = getTaskfromLocalStorage()

renderTasks(tasks)

btnAddTAskEl.addEventListener('click', function(){
    if (!taskNameEl.value) {
        alert ('Vui lòng nhập tên công việc')
        return false
    }

    let taskId = this.getAttribute('id')
    let tasks = getTaskfromLocalStorage()   
    let task = { name: taskNameEl.value}

    if(taskId ==0 || taskId ) {
        tasks[taskId] = task
        this.removeAttribute('id')
    } 
    else{

    tasks.push(task)
    }
    taskNameEl.value = ''
    
    localStorage.setItem('tasks', JSON.stringify(tasks))

    renderTasks(tasks)
    
})

function editTask(id){
    let tasks = getTaskfromLocalStorage()

    if(tasks.length>0){
        taskNameEl.value = tasks[id].name
        btnAddTAskEl.setAttribute('id',id)
    }

}

function deleteTask(id) {
    if (confirm('Có thực sự muốn xóa không')) {
        let tasks = getTaskfromLocalStorage()
        tasks.splice(id, 1)
        localStorage.setItem ('tasks', JSON.stringify(tasks))
        renderTasks(getTaskfromLocalStorage())

    }
}


function renderTasks(task=[]){
    let content = '<ul>'
    task.forEach((task,index) => {
        content += `<li>
            <div class="task-name"> ${task.name}</div>
            <a href="#" onclick="editTask(${index})"> Sửa </a>
            <a href="#" onclick="deleteTask(${index})"> Xoá</a>
        </li>`
    })
        content += '</ul>'
    document.querySelector('#result').innerHTML=content
}

function getTaskfromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}