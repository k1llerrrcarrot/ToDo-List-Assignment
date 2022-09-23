// PUT method: Change task text from an item on the list. / Change text to input field.
// PUT method: Change task status to "done"/cross out task.

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

const eventListeners = function() {
    addTaskBtn.addEventListener("click", function() {
        postTask(taskInput.value)
        .then(getTasks)
        .then(result => buildList(result));
        taskInput.value = "";
    })

    taskInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            addTaskBtn.click();
        }
    })

    taskList.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName == "IMG") {
            deleteTask(e.target.parentNode.id)
            .then(getTasks)
            .then(result => buildList(result));
        }
    })

    taskList.addEventListener("change", function(e) {
        if (e.target && e.target.classList.contains("task-check")) {
            putDoneStatus(e.target.parentNode.id, e.target.checked)
            .then(getTasks)
            .then(result => buildList(result));
        }
    })

    taskList.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains("task-text") && !(e.target.classList.contains("editing"))) {
            editTask(e.target);
        }
    })

}


const clearList = function () {
    taskList.innerHTML = "";
}

const buildList = function (tasks) {
    clearList();
    tasks.forEach(task => {
        const newLi = document.createElement("li");
        newLi.id = task._id;
        taskList.appendChild(newLi);

        const newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.classList.add("task-check");
        newLi.appendChild(newCheckbox);

        const newP = document.createElement("p");
        newP.classList.add("task-text");
        newP.innerHTML = task.description;
        newLi.appendChild(newP);

        const newDeleteBtn = document.createElement("img");
        newDeleteBtn.src = "trash-10-64.png";
        newDeleteBtn.classList.add("task-delete");
        newLi.appendChild(newDeleteBtn);

        if (task.done === true) {
            newCheckbox.checked = true;
            newP.classList.add("done");
        }
    });
}

const editTask = function(clickedText) {
    clickedText.classList.add("editing");
    let clickedTask = clickedText.parentNode;
    
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("edit-input");
    editInput.value = clickedText.innerHTML;
    
    let applyBtn = document.createElement("button");
    applyBtn.innerHTML = "Apply";

    clickedTask.insertBefore(editInput, clickedText);
    clickedTask.insertBefore(applyBtn, clickedText);
    editInput.focus();

    window.addEventListener("click", function clickOutside(e) {
        if(!clickedTask.contains(e.target)) {
            clickedTask.removeChild(editInput);
            clickedTask.removeChild(applyBtn);
            clickedText.classList.remove("editing");
            window.removeEventListener("click", clickOutside);
        }
    })

    applyBtn.addEventListener("click", function() {
        console.log(editInput.value);
        putEditedTask(clickedTask.id, editInput.value);
        getTasks().then(result => buildList(result));
    })

    editInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            applyBtn.click();
        }
    })
}

eventListeners();
getTasks().then(result => buildList(result));

