let timerInterval;
let startTime;
let endTime;
let elapsedTime = 0;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const timer = document.getElementById('timer');
const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
const taskInput = document.getElementById('taskInput');
const timerContainer = document.getElementById('timerContainer');

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
clearBtn.addEventListener('click', clearTable);

function startTimer() {
  const taskName = taskInput.value.trim();
  
  if (taskName === '') {
    alert('Please enter a task before starting the timer.');
    return;
  }
  
  if (!timerInterval) {
    startTime = new Date().getTime() - elapsedTime;
    timerInterval = setInterval(updateTimer, 1000);
    timerContainer.style.background = `linear-gradient(to bottom, #66ff66 0%, #ccffcc 0%)`; // Initial gradient color
  }
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;

    endTime = new Date().getTime();
    const taskTime = new Date(endTime - startTime);
    const taskName = taskInput.value.trim();

    if (taskName !== '') {
      const newRow = taskTable.insertRow();
      const taskCell = newRow.insertCell(0);
      const startTimeCell = newRow.insertCell(1);
      const endTimeCell = newRow.insertCell(2);
      const durationCell = newRow.insertCell(3);

      taskCell.textContent = taskName;
      startTimeCell.textContent = new Date(startTime).toLocaleTimeString();
      endTimeCell.textContent = new Date(endTime).toLocaleTimeString();
      durationCell.textContent = formatDuration(taskTime);

      elapsedTime = 0;
      timer.textContent = '00:00:00';
      taskInput.value = '';
    }

    timerContainer.style.background = ''; // Reset background color
  }
}

function clearTable() {
  taskTable.innerHTML = '';
  timerContainer.style.background = ''; // Reset background color
}

function updateTimer() {
  const currentTime = new Date().getTime();
  elapsedTime = currentTime - startTime;
  timer.textContent = formatTime(new Date(elapsedTime));

  // Calculate gradient color based on time elapsed
  const gradientPercentage = (elapsedTime / (60 * 1000)) * 100; // Change color every minute
  const gradientColor = `linear-gradient(to bottom, #66ff66 ${gradientPercentage}%, #ccffcc ${gradientPercentage}%)`;
  timerContainer.style.background = gradientColor;
}

function formatTime(time) {
  const hours = time.getUTCHours().toString().padStart(2, '0');
  const minutes = time.getUTCMinutes().toString().padStart(2, '0');
  const seconds = time.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function formatDuration(time) {
  const hours = Math.floor(time / 3600000); // Convert milliseconds to hours
  const minutes = Math.floor((time % 3600000) / 60000); // Convert remaining milliseconds to minutes
  return `${hours}h ${minutes}m`;
}
