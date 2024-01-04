function preloader() {
  $(() => {
    setTimeout(() => {
      let preload = $(".preloader");
      preload.css("opacity", 0);
      setInterval(() => preload.remove(), 1000);
    }, 1000);
  });
}
setTimeout(() => preloader(), 2000);
