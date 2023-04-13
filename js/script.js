// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  let description = document.getElementsByClassName("description");
  let mainContainer = document.getElementById("mainContainer");
  let currentDay = document.getElementById("currentDay");
  let saveBtn = document.getElementsByClassName("saveBtn");

  currentDay.textContent = moment().format("MMMM Do YYYY hh:mm");

  for (var i = 9; i <= 17; i++) {
    var rightNow = `${moment().format("H")}`;
    if (i < rightNow) {
      $(`#hour-${i}`).addClass("past");
    } else if (i == rightNow) {
      $(`#hour-${i}`).addClass("present");
    } else {
      $(`#hour-${i}`).addClass("future");
    }
  }

  for(var i = 0; i<localStorage.length;i++){
    if(localStorage.key(i).startsWith('hour')){
      $(`#${localStorage.key(i)}`)[0].children[1].textContent = localStorage.getItem(localStorage.key(i))
    }
  }

  function getDescriptionTextarea(event) {
    var parentDiv = event.target.parentNode;
    

    if (
      event.target.className === "btn saveBtn col-2 col-md-1" ||
      event.target.className === "fas fa-save"
    ) {
      var writtenData = "";
      if (event.target.className === "fas fa-save") {
        writtenData = parentDiv.parentNode.children[1].value;
      } else {
        writtenData = parentDiv.children[1].value;
      }
      localStorage.setItem(parentDiv.id, writtenData);

    }
  }

  mainContainer.addEventListener("click", getDescriptionTextarea);
});