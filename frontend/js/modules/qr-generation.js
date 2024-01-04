function placeholder() {
  setTimeout(() => {
    let qrPlaceholder = document.querySelector(".main-page-content-column");
    let information = document.querySelector(".join-quiz");
    if (qrPlaceholder) {
      information.style.display = "flex";
      qrPlaceholder.remove();
      information.classList.remove("hidden");
    } else {
      return;
    }
  }, 1000);
}
setTimeout(() => placeholder(), 7000);
