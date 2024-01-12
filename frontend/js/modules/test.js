const header = document.querySelector(".quiz-header");
const pageMain = document.querySelector("main");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

let currentQuestion = 0;

fetch("http://89.185.85.68:8081/api/v1/quiz?id=656b0d7113236e674a077c36")
  .then((resp) => resp.json())
  .then((arr) => renderQuiz(arr));

const renderQuiz = (quiz) => {
  header.textContent = quiz.name;
  fetch(
    `http://89.185.85.68:8081/api/v1/card?id=${quiz.questions[currentQuestion]}`
  )
    .then((resp) => resp.json())
    .then((question) => renderQuestion(question, quiz.questions.length));
};

const renderQuestion = (quiz, requestQuestion, questionsCount) => {
  const cardFromTemplate = cardTemplate.cloneNode(true);

  const answerCount = cardFromTemplate.querySelector(".answers-count");
  const cardTimer = cardFromTemplate.querySelector(".card-timer");

  const illustration = cardFromTemplate.querySelector(".question-illustration");
  const rating = cardFromTemplate.querySelector(".rating");
  const ratingColumns = cardFromTemplate.querySelectorAll(".rating-list-item");
  const ratingCount = cardFromTemplate.querySelectorAll(".answer-count");
  const columns = cardFromTemplate.querySelectorAll(".column");

  const nextQuestion = cardFromTemplate.querySelector(".next-button");
  const question = cardFromTemplate.querySelector(".question");
  const answers = cardFromTemplate.querySelectorAll(".answers-list-item");
  const answersList = cardFromTemplate.querySelectorAll(".answer");

  const footer = cardFromTemplate.querySelector(".card-footer");
  const index = cardFromTemplate.querySelectorAll(".question-index");
  const questionCount = cardFromTemplate.querySelectorAll(".question-count");
  const skipQuestion = footer.querySelector(".skip-question");

  const previewOfQuestion = cardFromTemplate.querySelector(".question-preview");
  const preview = cardFromTemplate.querySelector(".preview");
  const timer = cardFromTemplate.querySelector(".timer");
  const skip = preview.querySelector(".skip-question");
  const content = cardFromTemplate.querySelector(".card-info");

  let answerCountSum = 0;

  content.style.display = "none";
  setInterval(() => {
    timer.textContent = timer.textContent - 1;
  }, 1000);
  setTimeout(() => {
    preview.remove();
    content.style.display = "flex";
  }, 5500);
  skip.addEventListener("click", () => {
    preview.remove();
    content.style.display = "flex";
  });

  question.textContent = requestQuestion.question;
  previewOfQuestion.textContent = requestQuestion.question;
  illustration.src = requestQuestion.thumbnail_url;

  for (let i = 0; i < answers.length; i++) {
    answers[i].querySelector("div").id = "none";
    answers[i].querySelector("p").textContent = requestQuestion.answers[i];
    if (i === requestQuestion.correct_answer_index) {
      answers[i].querySelector(".answer").classList.add("right");
      answers[i].querySelector("div").id = "right-answer";
      ratingColumns[i]
        .querySelector(".answer-number")
        .querySelector("span")
        .classList.add("right-rating-border");
    }
  }
  const rightAnswer = cardFromTemplate.querySelector(".right");
  const rightAnswerId = cardFromTemplate.querySelector("#right-answer");
  for (let qCount of questionCount) {
    qCount.textContent = questionsCount;
  }
  for (let i of index) {
    i.textContent = currentQuestion + 1;
  }

  answersList.forEach((a) => {
    a.addEventListener("click", () => {
      const answerIndex = a.classList[1];
      for (let ratingIndex = 0; ratingIndex < columns.length; ratingIndex++) {
        if (columns[ratingIndex].classList.contains(answerIndex)) {
          ratingCount[ratingIndex].textContent =
            Number(ratingCount[ratingIndex].textContent) + 1;
        }
      }
      answerCount.remove();
      cardTimer.remove();
      illustration.remove();
      footer.style.display = "none";
      rating.style.display = "flex";
      nextQuestion.style.display = "block";
      for (const answrCount of ratingCount) {
        answerCountSum += Number(answrCount.textContent);
      }
      for (let i_column = 0; i_column < columns.length; i_column++) {
        const columnHeight =
          Number(ratingCount[i_column].textContent) / answerCountSum;
        columns[i_column].style = `height: calc(50vh * ${columnHeight})`;
      }
      for (const answer of answersList) {
        answer.style.opacity = "0.6";
        answer.disabled = true;
      }
      rightAnswer.style.opacity = "1";
      rightAnswer.style.color = "#1C1C1C";
      rightAnswerId.classList.add("right-answer-border");
    });
  });

  pageMain.appendChild(cardFromTemplate);
  skipQuestion.addEventListener("click", () => {
    cardFromTemplate.style.display = "none";
    onClickButton(quiz);
  });
  nextQuestion.addEventListener("click", () => {
    cardFromTemplate.style.display = "none";
    onClickButton(quiz);
  });
};

const onClickButton = (quiz) => {
  currentQuestion += 1;
  if (currentQuestion >= quiz.questions.length) {
    location.href = "leaderBoard.html";
  } else {
    fetch(
      `http://89.185.85.68:8081/api/v1/card?id=${quiz.questions[currentQuestion]}`
    )
      .then((resp) => resp.json())
      .then((question) =>
        renderQuestion(quiz, question, quiz.questions.length)
      );
  }
};
