const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  if (scroll > 68) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});
