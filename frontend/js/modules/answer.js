const answersList = document.querySelectorAll(".answer");
const rightAnswer = document.querySelector(".right");
const rightAnswerId = document.querySelector("#right-answer");
const answersContainter = document.querySelector(".answers-list");

const answerCount = document.querySelector(".answers-count");
const timer = document.querySelector(".timer");
const next = document.querySelector(".next-button");
const footer = document.querySelector(".card-footer");
const questionPhoto = document.querySelector(".question-illustration");

const rating = document.querySelector(".rating");
const ratingCount = document.querySelectorAll(".answer-count");
const columns = document.querySelectorAll(".column");

const getAnswersCountSum = () => {
  let answerCountSum = 0;
  for (const answrCount of ratingCount) {
    answerCountSum += Number(answrCount.textContent);
  }
  return answerCountSum;
};

const onAnswer = (answer) => {
  const answerIndex = answer.classList[1];
  for (let ratingIndex = 0; ratingIndex < columns.length; ratingIndex++) {
    if (columns[ratingIndex].classList.contains(answerIndex)) {
      ratingCount[ratingIndex].textContent =
        Number(ratingCount[ratingIndex].textContent) + 1;
    }
  }
  answerCount.remove();
  timer.remove();
  questionPhoto.remove();
  footer.style.display = "none";
  rating.style.display = "flex";
  next.style.display = "block";
  const answerSum = getAnswersCountSum();
  for (let i_column = 0; i_column < columns.length; i_column++) {
    const columnHeight = Number(ratingCount[i_column].textContent) / answerSum;
    columns[i_column].style = `height: calc(65vh * ${columnHeight} + 5vh)`;
  }
  for (const answer of answersList) {
    answer.style.opacity = "0.6";
    answer.disabled = true;
  }
  rightAnswer.style.opacity = "1";
  rightAnswer.style.color = "#1C1C1C";
  rightAnswerId.classList.add("right-answer-border");
};

for (const answer of answersList) {
  answer.addEventListener("click", () => {
    onAnswer(answer);
  });
}
