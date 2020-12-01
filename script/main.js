var $main = document.body.querySelector("#main");

fetch("./main.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("#main").innerHTML = data;
  })
  .then(() => wheelEvent($main));

function wheelEvent(target) {
  var i = 0,
    prevY,
    nextY,
    isLock = false;

  var touchstartX,
    touchstartY,
    touchendX,
    touchendY,
    touchoffsetX,
    touchoffsetY;

  var $targetLength = target.children.length;

  const setClass = (target) => {
    if (event.deltaY < 0) {
      i--;
    } else if (event.deltaY > 0) {
      i++;
    }
    if (i < 0) {
      i = 0;
    }
    if (i >= $targetLength) {
      i = $targetLength - 1;
    }
    Object.values(target.children).map((item) => {
      item.classList.remove("active");
    });
    Object.values(target.children)[i].classList.add("active");

    isLock = true;
    setTimeout(() => (isLock = false), 500);
  };

  window.addEventListener("wheel", function (event) {
    if (!isLock) setClass(target);
  });

  target.addEventListener("pointerdown", function (event) {
    event.preventDefault();
    prevY = event.clientY;
  });
  target.addEventListener("pointermove", function (event) {
    event.preventDefault();

    return (nextY = event.clientY);
  });
  target.addEventListener("pointerup", function (event) {
    if (prevY - nextY < 100 && prevY - nextY > -100) {
      console.log("d");
      return;
    }
    if (prevY > nextY) {
      console.log(true);
    }
    if (prevY < nextY) {
      console.log(false);
    }

    prevY = 0;
    nextY = 0;
  });

  window.addEventListener(
    "touchstart",
    function (event) {
      var touch = event.touches[0];
      touchstartX = touch.clientX;
      touchstartY = touch.clientY;
    },
    false
  );

  window.addEventListener(
    "touchend",
    function (event) {
      if (event.touches.length == 0) {
        var touch = event.changedTouches[event.changedTouches.length - 1];
        touchendX = touch.clientX;
        touchendY = touch.clientY;

        touchoffsetX = touchendX - touchstartX;
        touchoffsetY = touchendY - touchstartY;

        if (Math.abs(touchoffsetY) > 100) {
          if (touchoffsetY > 100) console.log("down");
          if (touchoffsetY < 100) console.log("up");
        }
      }
    },
    false
  );
}
