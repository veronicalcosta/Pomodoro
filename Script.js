document.getElementById('new-task').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  
  function addTask() {
    const taskText = document.getElementById('new-task').value;
    if (taskText === '') return;
    
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    
    taskItem.addEventListener('click', function() {
      taskItem.classList.toggle('done');
      if (taskItem.classList.contains('done')) {
        moveToCompleted(taskItem);
      }
      updateStats();
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.addEventListener('click', function() {
      taskItem.remove();
      updateStats();
    });
    
    taskItem.appendChild(deleteBtn);
    document.getElementById('task-list').appendChild(taskItem);
    
    document.getElementById('new-task').value = '';
    updateStats();
  }
  
  function moveToCompleted(taskItem) {
    const completedList = document.getElementById('completed-tasks-list');
    completedList.appendChild(taskItem);
  }
  
  function updateStats() {
    const doneTasks = document.querySelectorAll('li.done').length;
    document.getElementById('completed-tasks-count').textContent = doneTasks;
  }
  
  let timer;
  let timeLeft = 1500; // 25 minutes
  let pomodoroCount = 0;
  
  document.getElementById('start').addEventListener('click', function() {
    timer = setInterval(updateTimer, 1000);
  });
  
  document.getElementById('pause').addEventListener('click', function() {
    clearInterval(timer);
  });
  
  document.getElementById('reset').addEventListener('click', function() {
    clearInterval(timer);
    timeLeft = 1500;
    updateDisplay();
  });
  
  function updateTimer() {
    if (timeLeft <= 0) {
      clearInterval(timer);
      pomodoroCount++;
      document.getElementById('pomodoro-cycles').textContent = pomodoroCount;
      timeLeft = 1500;
    }
    timeLeft--;
    updateDisplay();
  }
  
  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  