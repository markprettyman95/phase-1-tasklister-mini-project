class Task {
  constructor(description, priority, date) {
    this.description = description;
    this.priority = priority;
    this.date = date;
  }
}

class TaskList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
  }

  sortTasks() {
    this.tasks.sort((a, b) => {
      if (a.priority === "high") {
        return -1;
      } else if (a.priority === "medium" && b.priority !== "high") {
        return -1;
      } else if (a.priority === "low" && b.priority === "low") {
        return 0;
      } else {
        return 1;
      }
    });
  }

  renderTasks() {
    const taskListUl = document.getElementById("tasks");
    taskListUl.innerHTML = "";

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];

      const taskLi = document.createElement("li");
      taskLi.textContent = `${task.description} - ${task.priority} priority - due ${task.date}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        this.deleteTask(i);
        this.renderTasks();
      });

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        const newDescription = prompt("Enter new description:");
        task.description = newDescription;
        this.renderTasks();
      });

      taskLi.appendChild(deleteButton);
      taskLi.appendChild(editButton);
      taskListUl.appendChild(taskLi);

      switch (task.priority) {
        case "high":
          taskLi.style.color = "red";
          break;
        case "medium":
          taskLi.style.color = "yellow";
          break;
        case "low":
          taskLi.style.color = "green";
          break;
        default:
          break;
      }
    }
  }
}
