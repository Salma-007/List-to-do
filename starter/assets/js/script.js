// form variables
let title = document.getElementById("task-title")
let feature = document.getElementById('task-type-feature')
let bug = document.getElementById('task-type-bug')
let taskType = feature ? "Feature" : (bug ? "Bug" : "");
let priority = document.getElementById("task-priority")
let slectedStatus = document.getElementById("task-status")
let date = document.getElementById("task-date")
let description = document.getElementById("task-description")
// end form varables

//boutton add et update du modal
let task_save_btn = document.getElementById("task-save-btn");
let task_update_btn = document.getElementById("task-update-btn");

let div_to_do = document.getElementById("to-do-tasks")
let div_in_progress = document.getElementById("in-progress-tasks")
let div_done = document.getElementById("done-tasks")
let count_to_do 
let count_in_progress 
let count_done 

// local storage
let array = JSON.parse(localStorage.getItem("MyStorage")) || [];
renderTasks()


function addTask(titre, features,priority,status,date,description){
  console.log("hello");
  
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
  localStorage.setItem("MyStorage", JSON.stringify(array))
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


function ajouter() {
  console.log("hellooo");

  let titleValue = title.value.trim();
  let featureChecked = feature.checked;
  let bugChecked = bug.checked;

  let taskType = featureChecked ? "Feature" : (bugChecked ? "Bug" : "");
  let priorityValue = priority.value;
  let statusValue = slectedStatus.value;
  let dateValue = date.value;
  let descriptionValue = description.value;

  addTask(titleValue, taskType, priorityValue, statusValue, dateValue, descriptionValue);
  document.getElementById("form-task").reset();
  localStorage.setItem("MyStorage", JSON.stringify(array))
  

}


// pour loader les taches

function renderTasks() {

  count_to_do = 0
  count_in_progress = 0
  count_done = 0

  div_to_do.innerHTML = '';
  div_in_progress.innerHTML = '';
  div_done.innerHTML = '';
  array.forEach(task => {
    
      
      let div0 = document.createElement('div')
      if(task.status == 'To Do'){
        count_to_do++;
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
        count_in_progress++
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
        count_done++
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
  localStorage.setItem("MyStorage", JSON.stringify(array))
  document.getElementById("to-do-tasks-count").innerHTML = `${count_to_do}`
  document.getElementById("in-progress-tasks-count").innerHTML = `${count_in_progress}`
  document.getElementById("done-tasks-count").innerHTML = `${count_done}`
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
  localStorage.setItem("MyStorage", JSON.stringify(array))
}

function editTask(taskId) {
  let taskToEdit = array.find(task => task.id === taskId);
  
  if (taskToEdit) {
    document.getElementById("task-id").value = taskToEdit.id;
    title.value = taskToEdit.titre;
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
    task_update_btn.style.display = 'block'
    task_save_btn.style.display = 'none'
    $('#form-modal').modal('show');
  }

}

function editer() {
  event.preventDefault(); // Empêche la soumission du formulaire

  let taskId = document.getElementById("task-id").value; 
   

   taskType = feature.checked ? "Feature" : (bug.checked ? "Bug" : "");
  

  
  let taskIndex = array.findIndex(task => task.id === taskId);
  
  if (taskIndex !== -1) {

      array[taskIndex] = {
          id: taskId,
          titre: title.value,
          features: taskType,
          priority: priority.value,
          status: slectedStatus.value,
          date: date.value,
          description: description.value,
        };

      renderTasks(); 

      Swal.fire({
        title: 'Task Updated!',
        text: `You have updated the task: "${array[taskIndex].titre}"`,
        icon: 'success',
        confirmButtonText: 'Nice!'
      });
      $('#form-modal').modal('hide'); 
  }
  localStorage.setItem("MyStorage", JSON.stringify(array))
}

function showForm(){
  document.querySelector('.modal-title').textContent = 'Add Task';
        title.value = ""
         taskType = ""
        priority.value = ""
        slectedStatus.value = ""
        date.value = ""
        description.value = ""

      task_save_btn.style.display = 'block'
      task_update_btn.style.display = 'none'
}

