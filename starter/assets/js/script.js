
let task_save_btn = document.getElementById("task-save-btn");

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

let array = [];

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
  $('#form-modal').modal('hide');
}


function ajouter(event) {
  console.log("hellooo");

  let title = document.getElementById("task-title").value.trim();
  let feature = document.getElementById('task-type-feature').checked;
  let bug = document.getElementById('task-type-bug').checked;

  let taskType = feature ? "Feature" : (bug ? "Bug" : "");
  let priority = document.getElementById("task-priority").value;
  let status = document.getElementById("task-status").value;
  let date = document.getElementById("task-date").value;
  let description = document.getElementById("task-description").value;
  addTask(title, taskType, priority, status, date, description);
  document.getElementById("form-task").reset();

};

// pour loader les taches

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
                  <div>
                      <i class="fas fa-edit text-warning me-2" title="Edit" style="cursor: pointer;" onclick="editTask('${task.id}')"></i>
                      <i class="fas fa-trash text-danger" title="Delete" style="cursor: pointer;" onclick="deleteTask('${task.id}')"></i>
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
                  <div>
                      <i class="fas fa-edit text-warning me-2" title="Edit" style="cursor: pointer;" onclick="editTask('${task.id}')"></i>
                      <i class="fas fa-trash text-danger" title="Delete" style="cursor: pointer;" onclick="deleteTask('${task.id}')"></i>
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
                  <div>
                      <i class="fas fa-edit text-warning me-2" title="Edit" style="cursor: pointer;" onclick="editTask('${task.id}')"></i>
                      <i class="fas fa-trash text-danger" title="Delete" style="cursor: pointer;" onclick="deleteTask('${task.id}')"></i>
                    </div>
                </a>
              </div>
      `
      div_done.appendChild(div0)
      }
  })
}

// Fonction pour supprimer une tâche
function deleteTask(taskId) {
  Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
          array = array.filter(task => task.id !== taskId);
          renderTasks();


          Swal.fire(
              'Deleted!',
              'Your task has been deleted.',
              'success'
          );
      }
  });
}

function editTask(taskId) {
  const taskToEdit = array.find(task => task.id === taskId);
  
  if (taskToEdit) {
    document.getElementById("task-id").value = taskToEdit.id;
    document.getElementById("task-title").value = taskToEdit.titre;
    document.getElementById("task-date").value = taskToEdit.date;
    document.getElementById("task-description").value = taskToEdit.description;
    
    if (taskToEdit.features === "Feature") {
      document.getElementById("task-type-feature").checked = true;
    } else {
      document.getElementById("task-type-bug").checked = true;
    }
    
    document.getElementById("task-priority").value = taskToEdit.priority;
    document.getElementById("task-status").value = taskToEdit.status;
    
    document.querySelector('.modal-title').textContent = 'Edit Task';
    document.querySelector('#task-save-btn').style.display = 'none'
    $('#form-modal').modal('show');
  }


}

function editer() {
  event.preventDefault(); // Empêche la soumission du formulaire

  const taskId = document.getElementById("task-id").value; 
  const title = document.getElementById("task-title").value.trim();
  const feature = document.getElementById('task-type-feature').checked;
  const bug = document.getElementById('task-type-bug').checked;

  const taskType = feature ? "Feature" : (bug ? "Bug" : "");
  const priority = document.getElementById("task-priority").value;
  const status = document.getElementById("task-status").value;
  const date = document.getElementById("task-date").value;
  const description = document.getElementById("task-description").value;

  const taskIndex = array.findIndex(task => task.id === taskId);
  
  if (taskIndex !== -1) {

      array[taskIndex] = {
          id: taskId,
          titre: title,
          features: taskType,
          priority: priority,
          status: status,
          date: date,
          description: description,
      };

      renderTasks(); 


      Swal.fire({
          title: 'Task Updated!',
          text: `You have updated the task: "${title}"`,
          icon: 'success',
          confirmButtonText: 'Nice!'
      });
      document.querySelector("#form-modal").reset()
      $('#form-modal').modal('hide'); 
  }
}





