function htmlInClude() {
  fetch("./header.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      if (document.querySelector("header"))
        document.querySelector("header").innerHTML = data;
    });
  fetch("./footer.html")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      if (document.querySelector("footer"))
        document.querySelector("footer").innerHTML = data;
    });
}

window.onload = async () => {
  await htmlInClude();
};
