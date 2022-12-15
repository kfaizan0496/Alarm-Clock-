var colors = [
  "red",
  "blue",
  "yellow",
  "lightgrey",
  "darkorchid",
  "black",
  "orange",
  "deeppink",
  "green",
  "purple",
  "saddlebrown",
  "lightseagreen",
  "deepskyblue",
  "firebrick",
  "crimson",
];

var timeDisplay = document.getElementById("time-display");

var setAlarmButton = document.getElementById("set-alarm");
var stopButton = document.getElementById("stop-btn");
var alarmArray = [];
var time;
var hours;
var minutes;
function currentTime() {
  var currentDate = new Date();
  hours = currentDate.getHours();
  hours = hours % 12 || 12;
  hours = appendZero(hours);

  // hours = appendZero(currentDate.getHours());
  minutes = appendZero(currentDate.getMinutes());
  var seconds = appendZero(currentDate.getSeconds());
  const am = "AM";
  const pm = "PM";
  timeZone = hours <= 12 ? am : pm;

  time = `${hours}:${minutes}:${seconds} ${timeZone}`;

  let tempTime = `${hours}:${minutes}:${seconds}:${timeZone}`;
  if (alarmArray.indexOf(tempTime) !== -1) {
    // alert("its time now ", tempTime);
    ringAlarm();
  }
  timeDisplay.innerText = time + "";
}
setInterval(currentTime, 1000);

function appendZero(time) {
  if (time < 10 && time.length != 2) {
    return "0" + time;
  }
  return time;
}

setAlarmButton.addEventListener("click", function Alarm(e) {
  e.preventDefault();
  //  fetch values from input field as it is
  const inputHrsCheck = document.getElementById("hrs").value;
  const inputMinCheck = document.getElementById("mins").value;
  const inputSecondsCheck = document.getElementById("sec").value;

  console.log("inputHrsCheck length is", inputHrsCheck.toString().length);
  console.log("inputMinCheck length is", inputMinCheck.toString().length);
  console.log(
    "inputSecondsCheck length is",
    inputSecondsCheck.toString().length
  );
  //  convert values into Integer Format for handling error when user (00:00:00)
  var inputHrs = parseInt(inputHrsCheck);
  var inputMins = parseInt(inputMinCheck);
  var inputSeconds = parseInt(inputSecondsCheck);

  console.log("inputHrs value is", inputHrs);
  console.log("inputMins value is", inputMins);
  console.log("inputSeconds value is", inputSeconds);
  //   fetch Am/Pm
  var amPm = document.getElementById("am-pm");
  var text = amPm.options[amPm.selectedIndex].text;
  // check  particular field if value(1-9) no need append zero otherwise append zero
  var alarmHrs = appendZero(inputHrs);
  var alarmMin = appendZero(inputMins);
  var alarmSecs = appendZero(inputSeconds);
  var alarmAmPm = text;

  if (alarmHrs > 12 || alarmMin > 60 || alarmSecs > 60) {
    //  Error Handling for inputs if user type the value of (hours>12,minutes>60 and secconds >60) it shows an  alert box error message
    alert("plzz Enter Valid Time Format");
    return;
  }
  // Error handling in hours input if user input 00
  else if (alarmHrs == 00) {
    alert("plzz Enter Valid Time Format");
    return;
  }
  // Error handling in inputs if user type (100 ,010,001,) its shows an  alert box
  else if (
    inputHrsCheck.toString().length > 2 ||
    inputMinCheck.toString().length > 2 ||
    inputSecondsCheck.toString().length > 2
  ) {
    alert("plzz Enters 2  digit Format");
    return;
  } else if (isNaN(alarmHrs) || isNaN(alarmMin) || isNaN(alarmSecs)) {
    alert("plzz Eneter Values properly");
    return;
  }
  // create an alarm time to add in a list of array
  var alarmTime = `${alarmHrs}:${alarmMin}:${alarmSecs}:${alarmAmPm}`;
  console.log(alarmTime);

  // if  user add an alarm which is already present in a array list it will shows an alertbox mesaage
  if (alarmArray.includes(alarmTime)) {
    alert(`Alarm is Already set ${alarmTime} `);
  }
  // if alarm not present in array then it will add in a array list
  else {
    alarmArray.push(alarmTime);
  }

  console.table(alarmArray);
  // after add an element in array reset the alarm-list container bczz render a list of array again
  document.getElementById("alarm-inputs").reset();

  showAlarm();
});

var alarmcount = 0;
function showAlarm() {
  let alarmContainer = document.getElementById("alarm-list-container");
  alarmContainer.innerHTML = "";

  alarmcount++;
  console.log("alarmcount after setAlarm Button", alarmcount);
  alarmArray[0].innerHTML = "";
  // console.log(alarmArray["0"]);
  for (let alarm of alarmArray) {
    let div = document.createElement("div");
    div.setAttribute("id", `alarm${alarmcount}`);
    // div.style.background = ` ${colors[Math.floor(Math.random() * 15)]}   `;
    div.innerHTML = `<span><img src="./Assets/icons8-alarmclock-16.png" height="20" width="20"></span><span>${alarm}</span>
     <button  class="btn btn-outline-danger delete-btn" type="button" id="${alarmcount}"
      onclick="removeAlarm(this.id)">Delete </button>`;

    document.getElementById("alarm-list-container").appendChild(div);

    console.log(alarmArray.length);
  }
}

function removeAlarm(alarmId) {
  //
  var currentDivToRemove = document.getElementById("alarm" + (alarmId + ""));
  console.log(currentDivToRemove);
  var deleteIndex = alarmArray.indexOf(currentDivToRemove);
  alarmArray.splice(deleteIndex, 1);
  currentDivToRemove.remove();
  alarmcount--;
  console.log("alarmcount after Delete Button", alarmcount);

  console.table(typeof alarmArray[0]);
}

let audio = new Audio("./audio/alarm.mp3");
function ringAlarm() {
  audio.load();
  audio.play();
}

stopButton.addEventListener("click", function () {
  audio.pause();
});
