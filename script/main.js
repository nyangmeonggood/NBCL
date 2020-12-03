import wheelEvent from "./wheelEvent.js";

var $main = document.body.querySelector("#main");

fetch("./main.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("#main").innerHTML = data;
  })
  .then(() => {
    wheelEvent($main, false);
  });
