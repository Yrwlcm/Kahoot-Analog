const COLORS = [
  "#E6CFFF",
  "#9BE1FF",
  "#B1FFCB",
  "#FDFFAC",
  "#FFBEBE",
  "#DFFF9B",
  "#FDA9D1",
  "#C3CDFF",
];

const getRandomNumber = (min, max) => {
  const leftBorder = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const rightBorder = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const randomNumber =
    Math.random() * (rightBorder - leftBorder + 1) + leftBorder;
  return Math.floor(randomNumber);
};
const getRandomGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= max - min + 1) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const waiting = document.querySelector(".waiting");
const membersList = document.querySelector(".members-list");
const members = document.querySelectorAll(".members-list-item");
const additionalMembers = document.querySelector(".additional");
const membersCount = document.querySelector(".count");

let backgroundColorGenerator = getRandomGenerator(0, COLORS.length - 1);
const memberTemplate = document
  .querySelector("#member-template")
  .content.querySelector(".members-list-item");

const createMember = () => {
  const backgroundId = backgroundColorGenerator();
  return {
    avatar: "./img/member-item.svg",
    nickname: "Имя игрока",
    backgroundColor: COLORS[backgroundId],
  };
};
const createMembersArray = () => Array.from({ length: 15 }, createMember);

const getMember = (memberInfo) => {
  const member = memberTemplate.cloneNode(true);
  member.querySelector(".member-item").src = memberInfo.avatar;
  member.querySelector(".member-nickname").textContent = memberInfo.nickname;
  member.style.background = memberInfo.backgroundColor;

  return member;
};

function loadMembersList() {
  waiting.style.opacity = 1;
  setTimeout(() => {
    waiting.style.display = "none";
    const membersDataArray = createMembersArray();
    for (let i_member = 0; i_member < membersDataArray.length; i_member++) {
      const memberItemFromTemplate = getMember(membersDataArray[i_member]);
      if (i_member < 8) {
        memberItemFromTemplate.style.opacity = 1;
        membersList.appendChild(memberItemFromTemplate);
      } else {
        memberItemFromTemplate.style.display = "none";
        membersList.appendChild(memberItemFromTemplate);
      }
    }
    if (membersDataArray.length > 8) {
      additionalMembers.classList.remove("hidden");
      additionalMembers.style.display = "block";
      additionalMembers.textContent = "+" + (membersDataArray.length - 8);
    }
    membersCount.textContent = membersDataArray.length;
  }, 4000);
}

setTimeout(() => loadMembersList(), 9000);
