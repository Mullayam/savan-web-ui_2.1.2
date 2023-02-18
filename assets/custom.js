/* Open when someone clicks on the span element */
function openPlaylist() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closePlaylist() {
  document.getElementById("myNav").style.width = "0%";
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
//Events for desktop and touch
let events = ["contextmenu", "touchstart"];
//initial declaration
var timeout;
//for double tap
var lastTap = 0;
//refer menu div
let contextMenu = document.getElementById("context-menu");
//same function for both events
events.forEach((eventType) => {
  document.addEventListener(
    eventType,
    (e) => {
      e.preventDefault();
      //x and y position of mouse or touch
      let mouseX = e.clientX || e.touches[0].clientX;
      let mouseY = e.clientY || e.touches[0].clientY;
      //height and width of menu
      let menuHeight = contextMenu.getBoundingClientRect().height;
      let menuWidth = contextMenu.getBoundingClientRect().width;
      //width and height of screen
      let width = window.innerWidth;
      let height = window.innerHeight;
      //If user clicks/touches near right corner
      if (width - mouseX <= 200) {
        contextMenu.style.borderRadius = "5px 0 5px 5px";
        contextMenu.style.left = width - menuWidth + "px";
        contextMenu.style.top = mouseY + "px";
        //right bottom
        if (height - mouseY <= 200) {
          contextMenu.style.top = mouseY - menuHeight + "px";
          contextMenu.style.borderRadius = "5px 5px 0 5px";
        }
      }
      //left
      else {
        contextMenu.style.borderRadius = "0 5px 5px 5px";
        contextMenu.style.left = mouseX + "px";
        contextMenu.style.top = mouseY + "px";
        //left bottom
        if (height - mouseY <= 200) {
          contextMenu.style.top = mouseY - menuHeight + "px";
          contextMenu.style.borderRadius = "5px 5px 5px 0";
        }
      }
      //display the menu
      contextMenu.style.visibility = "visible";
    },
    { passive: false }
  );
});
//for double tap(works on touch devices)
document.addEventListener("touchend", function (e) {
  //current time
  var currentTime = new Date().getTime();
  //gap between two gaps
  var tapLength = currentTime - lastTap;
  //clear previous timeouts(if any)
  clearTimeout(timeout);
  //if user taps twice in 500ms
  if (tapLength < 500 && tapLength > 0) {
    //hide menu
    contextMenu.style.visibility = "hidden";
    e.preventDefault();
  } else {
    //timeout if user doesn't tap after 500ms
    timeout = setTimeout(function () {
      clearTimeout(timeout);
    }, 500);
  }
  //lastTap set to current time
  lastTap = currentTime;
});
//click outside the menu to close it (for click devices)
document.addEventListener("click", function (e) {
  if (!contextMenu.contains(e.target)) {
    contextMenu.style.visibility = "hidden";
  }
});
