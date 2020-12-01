var $intro = document.querySelector("#intro"),
  $greeting = document.querySelector(".greeting"),
  $enter = document.querySelector("#enter");

var isLoaded = false;

const scrollBlock = () => {
  window.scrollTo(0, 0);
};

setTimeout(() => {
  $greeting.classList.add("fadeOut");
  setTimeout(() => {
    $intro.removeChild($greeting);
  }, 1000);
}, 6000);

$enter.addEventListener("click", () => {
  $intro.classList.add("fadeOut");
  isLoaded = true;
  window.removeEventListener("scroll", scrollBlock);
  setTimeout(() => {
    document.body.removeChild($intro);
  }, 1000);
});

if (!isLoaded) {
  window.addEventListener("scroll", scrollBlock);
}
