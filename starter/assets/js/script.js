let task_save_btn = document.getElementById("form-task")
let task_title =  document.getElementById("task-title")
let taskTypeFeature = document.getElementById('task-type-feature');
let taskTypeBug = document.getElementById('task-type-bug');
let taskPrioritySelect = document.getElementById('task-priority');
let taskStatusSelect = document.getElementById('task-status');
let taskDate = document.getElementById('task-date');
let taskDescription = document.getElementById('task-description');
let div_to_do = document.getElementById("to-do-tasks")
let div_in_progress = document.getElementById("in-progress-tasks")
let div_done = document.getElementById("done-tasks")

let array = []


function addTask(titre, features,priority,status,date,description){

    let task = {
        id: Date.now().toString(),
        titre: titre,
        features: features,
        priority: priority,
        status: status,
        date: date,
        description: description,
    }
    array.push(task)
    renderTasks();
    // SweetAlert pour confirmer l'ajout
    Swal.fire({
        title: 'Task Added!',
        text: `You have added a new task: "${task.titre}"`,
        icon: 'success',
        confirmButtonText: 'Nice!'
    });
}


task_save_btn.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    let title = document.getElementById("task-title").value.trim();
    let feature = document.getElementById('task-type-feature').checked;
    let bug = document.getElementById('task-type-bug').checked;

    let taskType = feature ? "Feature" : (bug ? "Bug" : "");
    let priority = document.getElementById("task-priority").value;
    let status = document.getElementById("task-status").value;
    let date = document.getElementById("task-date").value;
    let description = document.getElementById("task-description").value;
    addTask(title, taskType, priority, status, date, description);
    task_save_btn.reset();
    console.log(array);
});

function renderTasks() {
    div_to_do.innerHTML = '';
    div_in_progress.innerHTML = '';
    div_done.innerHTML = '';
    array.forEach(task => {
        const div0 = document.createElement('div')
        if(task.status == 'To Do'){
        
        div0.innerHTML = `
            <div class="list-group list-group-flush rounded-bottom overflow-hidden panel-body p-0">
                  <a href="#" class="list-group-item list-group-item-action d-flex">
                    <div class="me-3 fs-16px">
                      <i class="far fa-question-circle text-gray-500 fa-fw"></i> 
                    </div>
                    <div class="flex-fill">
                      <div class="fs-14px lh-12 mb-2px fw-bold text-dark">${task.titre}</div>
                      <div class="mb-1 fs-12px">
                        <div class="text-gray-600 flex-1">${task.date}</div>
                        <div class="text-gray-600 flex-1">${task.description}</div>
                      </div>
                      <div class="mb-1">
                        <span class="badge bg-gray-300 text-gray-900">${task.features}</span>
                        <span class="badge bg-primary">${task.priority}</span>
                      </div>
                    </div>
                  </a>
                </div>
        `
        div_to_do.appendChild(div0) }

        else if(task.status== 'In Progress'){
            div0.innerHTML = `
            <div class="list-group list-group-flush rounded-bottom overflow-hidden panel-body p-0">
                  <a href="#" class="list-group-item list-group-item-action d-flex">
                    <div class="me-3 fs-16px">
                        <i class="fas fa-spinner"></i>
                    </div>
                    <div class="flex-fill">
                      <div class="fs-14px lh-12 mb-2px fw-bold text-dark">${task.titre}</div>
                      <div class="mb-1 fs-12px">
                        <div class="text-gray-600 flex-1">${task.date}</div>
                        <div class="text-gray-600 flex-1">${task.description}</div>
                      </div>
                      <div class="mb-1">
                        <span class="badge bg-gray-300 text-gray-900">${task.features}</span>
                        <span class="badge bg-primary">${task.priority}</span>
                      </div>
                    </div>
                  </a>
                </div>
        `
        div_in_progress.appendChild(div0)
        }
        else if(task.status== 'Done'){
            div0.innerHTML = `
            <div class="list-group list-group-flush rounded-bottom overflow-hidden panel-body p-0">
                  <a href="#" class="list-group-item list-group-item-action d-flex">
                    <div class="me-3 fs-16px">
                      <i class="fa-regular fa-circle-check"></i>
                    </div>
                    <div class="flex-fill">
                      <div class="fs-14px lh-12 mb-2px fw-bold text-dark">${task.titre}</div>
                      <div class="mb-1 fs-12px">
                        <div class="text-gray-600 flex-1">${task.date}</div>
                        <div class="text-gray-600 flex-1">${task.description}</div>
                      </div>
                      <div class="mb-1">
                        <span class="badge bg-gray-300 text-gray-900">${task.features}</span>
                        <span class="badge bg-primary">${task.priority}</span>
                      </div>
                    </div>
                  </a>
                </div>
        `
        div_done.appendChild(div0)
        }
    })
}