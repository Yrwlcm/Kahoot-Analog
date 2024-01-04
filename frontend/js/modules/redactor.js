const questionTemplate = document
  .querySelector("#question-template")
  .content.querySelector("li");
const answersTemplate = document
  .querySelector("#answers")
  .content.querySelector("ul");
const questionInfoTemplate = document
  .querySelector("#additional")
  .content.querySelector("li");

const questionList = document.querySelector(".questions");
const answersList = document.querySelector(".answers");
const questionInfoList = document.querySelector(".questions-info-list");

const addQuestion = document.querySelector(".add-question");
const deleteQuestionButtons = document.querySelectorAll(".delete");
let currentActivePreview;
let index = 0;
let a = 4;
const redactorForm = document.querySelector(".quiz-redactor-form");

const createQuestion = () => {
  const question = questionTemplate.cloneNode(true);
  const deleteQuestion = question.querySelector(".delete");
  const preview = question.querySelector(".redactor-question-preview");

  const answers = answersTemplate.cloneNode(true);
  const radio = answers.querySelectorAll('[name="right-answer-id"]');
  const labels = answers.querySelectorAll("#label");

  const additionalInfo = questionInfoTemplate.cloneNode(true);
  const illustration = additionalInfo.querySelector("#illustration");
  const addPhotoButton = additionalInfo.querySelector(".file__input");
  const photo = additionalInfo.querySelector(".illustration-content");
  const addCaption = additionalInfo.querySelector(".add-sign");

  index += 1;
  question.querySelector(".question-index").textContent = index;
  question.classList.add(`${index - 1}`);
  deleteQuestion.classList.add(`${index - 1}`);
  preview.classList.add(`${index - 1}`);
  answers.classList.add(`${index - 1}`);
  additionalInfo.classList.add(`${index - 1}`);
  for (let label of labels) {
    label.htmlFor += `.${index}`;
  }
  for (let option of radio) {
    if (option.name.split.length === 1);
    {
      option.id += `.${index}`;
      option.name += " " + index;
    }
  }

  deleteQuestion.addEventListener("click", (evt) => {
    evt.preventDefault();
    index -= 1;
    const deleteIndex = Number.parseInt(deleteQuestion.classList[1]);
    const questionListItems = document.querySelectorAll(".question-list-item");
    const answersListItems = document.querySelectorAll(
      ".redactor-answers-list"
    );
    const questionInfoListItems = document.querySelectorAll(
      ".questions-info-list-item"
    );
    for (
      let questionsIndex = 0;
      questionsIndex < questionListItems.length;
      questionsIndex++
    ) {
      if (questionsIndex === deleteIndex) {
        questionList.removeChild(questionListItems[questionsIndex]);
        answersList.removeChild(answersListItems[questionsIndex]);
        questionInfoList.removeChild(questionInfoListItems[questionsIndex]);
      }
    }

    for (let questionThumbnail of questionListItems) {
      let i =
        Number.parseInt(
          questionThumbnail.querySelector(".question-index").textContent
        ) - 1;
      let deleteButton = questionThumbnail.querySelector(".delete");
      let questionPreview = questionThumbnail.querySelector(
        ".redactor-question-preview"
      );
      if (i > deleteIndex) {
        questionThumbnail.querySelector(".question-index").textContent = i;
        questionThumbnail.classList.remove(questionThumbnail.classList[1]);
        questionThumbnail.classList.add(`${i - 1}`);
        questionPreview.classList.remove(questionPreview.classList[1]);
        questionPreview.classList.add(`${i - 1}`);
        deleteButton.classList.remove(deleteButton.classList[1]);
        deleteButton.classList.add(`${i - 1}`);
      }
    }

    for (let answersGroup of answersListItems) {
      let i = answersGroup.classList[1];

      if (i > deleteIndex) {
        const radioGroup = answersGroup.querySelectorAll('[type="radio"');
        const labelsGroup = answersGroup.querySelectorAll("#label");
        for (let label of labelsGroup) {
          label.htmlFor = label.htmlFor.slice(0, 1);
          label.htmlFor += `.${i}`;
        }
        for (let option of radioGroup) {
          option.id = option.id.slice(0, 1);
          option.id += `.${i}`;
          option.name = option.name.slice(0, -2);
          option.name += " " + `${i}`;
        }

        answersGroup.classList.remove(answersGroup.classList[1]);
        answersGroup.classList.add(`${i - 1}`);
      }
    }

    for (let additionalGroup of questionInfoListItems) {
      let i = additionalGroup.classList[1];
      if (i > deleteIndex) {
        additionalGroup.classList.remove(additionalGroup.classList[1]);
        additionalGroup.classList.add(`${i - 1}`);
      }
    }

    if (questionListItems.length <= a) {
      for (let thumbnail of questionListItems) {
        thumbnail.style.display = "none";
        if (
          Number.parseInt(thumbnail.classList[1]) + 1 >=
          questionListItems.length - 4
        ) {
          thumbnail.style.display = "block";
        }
      }
      a -= 4;
    }
  });

  preview.addEventListener("click", () => {
    const showIndex = Number.parseInt(preview.classList[1]);
    const previewListItems = document.querySelectorAll(".question-list-item");
    const answersListItems = document.querySelectorAll(
      ".redactor-answers-list"
    );
    const questionInfoListItems = document.querySelectorAll(
      ".questions-info-list-item"
    );
    currentActivePreview = preview;
    for (let i = 0; i < answersListItems.length; i++) {
      const p = previewListItems[i].querySelector(".redactor-question-preview");
      answersListItems[i].style.display = "none";
      questionInfoListItems[i].style.display = "none";
      if (p.classList.contains("active")) {
        p.classList.remove("active");
      }
      if (showIndex === i) {
        preview.classList.add("active");
        answersListItems[i].style.display = "block";
        questionInfoListItems[i].style.display = "block";
      }
    }
  });

  illustration.addEventListener("change", (evt) => {
    const file = evt.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      addPhotoButton.style.display = "none";
      addCaption.style.display = "none";
      photo.style.background = `url(${imageURL}) no-repeat`;
      photo.style.backgroundSize = "contain";
    }
  });
  questionList.appendChild(question);
  answersList.appendChild(answers);
  questionInfoList.appendChild(additionalInfo);
  const answersListItems = document.querySelectorAll(".redactor-answers-list");
  const questionInfoListItems = document.querySelectorAll(
    ".questions-info-list-item"
  );
  for (let i = 0; i < answersListItems.length - 1; i++) {
    answersListItems[i].style.display = "none";
    questionInfoListItems[i].style.display = "none";
  }
  const questionListItems = document.querySelectorAll(".question-list-item");
  if (questionListItems.length > a) {
    for (let thumbnail of questionListItems) {
      thumbnail.style.display = "none";
      if (Number.parseInt(thumbnail.classList[1]) + 1 > a) {
        thumbnail.style.display = "block";
      }
    }
    a += 4;
  }
};

addQuestion.addEventListener("click", createQuestion);
