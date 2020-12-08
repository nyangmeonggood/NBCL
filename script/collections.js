import { collectionInfo } from "./collectionInfo.js";

const $collectionList = document.querySelector("#collectionList"),
  $modal = document.querySelector("#modal"),
  $modalCloseBtn = $modal.querySelector("button");

const setCollectionList = () => {
  collectionInfo.map((item) => {
    var $collection = document.createElement("div"),
      $textBox = document.createElement("div");
    $collection.classList.add("collection");
    $textBox.classList.add("textBox");

    var $h3 = document.createElement("h3"),
      $span = document.createElement("span"),
      $p = document.createElement("p"),
      $img = document.createElement("img");

    var randomNum = Math.floor(Math.random() * 100);

    $h3.innerText = item.name;
    $span.innerText = item.time;
    $p.innerText = item.desc;
    $img.src = item.src;

    $textBox.appendChild($h3);
    $textBox.appendChild($span);
    $textBox.appendChild($p);

    $collection.appendChild($img);
    $collection.appendChild($textBox);

    $collectionList.appendChild($collection);

    $collection.style.transform = `translateY(${randomNum}px)`;

    $img.addEventListener("click", setModal);
  });
};

const setModal = async (e) => {
  await setModalText(e);
  toggleModal();
};
const toggleModal = () => {
  $modal.classList.toggle("active");
  // document.body.classList.toggle("modalFix");
};

const setModalText = (e) => {
  $modal.querySelector("img").src = e.target.currentSrc;
  $modal.querySelector(".textBox").innerHTML = e.target.nextSibling.innerHTML;
};

$modalCloseBtn.addEventListener("click", toggleModal);
$modal.querySelector(".modalBG").addEventListener("click", toggleModal);

init();
function init() {
  setCollectionList();
}
