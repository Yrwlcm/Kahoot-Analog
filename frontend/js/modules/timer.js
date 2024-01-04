const timer = document.querySelector(".timer");

setInterval(() => {
  timer.textContent = timer.textContent - 1;
}, 1000);

setTimeout(() => {
  location.href = "question.html";
}, 8500);
