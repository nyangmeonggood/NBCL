export default function wheelEvent(target, scrollspy, afterMotion) {
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

  var $scroll = document.getElementById("scrollspy"),
    $current = $scroll.querySelector(".current"),
    $total = $scroll.querySelector(".total");

  const setClass = (target) => {
    Object.values(target.children).map((item) => {
      item.classList.remove("active");
    });
    Object.values(target.children)[i].classList.add("active");

    isLock = true;
    setTimeout(() => (isLock = false), 500);
  };

  const setScrollSpy = (target) => {
    var $ul = document.createElement("ul");
    $ul.className = "scrollspy";

    for (var i = 0; i < target.children.length; i++) {
      var $li = document.createElement("li");
      $ul.appendChild($li);
    }
    document.querySelector("#main").appendChild($ul);
  };
  if (scrollspy) setScrollSpy(target);

  const setCurrent = (target) => {
    $total.innerHTML = `${target.children.length}`;
  };
  setCurrent(target);

  window.addEventListener("wheel", function (event) {
    if (!isLock) {
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
      setClass(target);
      $current.innerHTML = `${i + 1}`;
    }
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
      return;
    }
    if (prevY > nextY) {
      i++;
      if (i >= $targetLength) {
        i = $targetLength - 1;
      }
      setClass(target);
      $current.innerHTML = `${i + 1}`;
    }
    if (prevY < nextY) {
      i--;

      if (i < 0) {
        i = 0;
      }
      setClass(target);
      $current.innerHTML = `${i + 1}`;
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
          if (touchoffsetY > 100) {
            i--;

            if (i < 0) {
              i = 0;
            }
            setClass(target);
            $current.innerHTML = `${i + 1}`;
          }
          if (touchoffsetY < 100) {
            i++;
            if (i >= $targetLength) {
              i = $targetLength - 1;
            }
            setClass(target);
            $current.innerHTML = `${i + 1}`;
          }
        }
      }
    },
    false
  );
}
