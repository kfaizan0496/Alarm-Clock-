var timeDisplay = document.getElementById("time-display");

var setAlarmButton = document.getElementById("set-alarm");
var stopButton = document.getElementById("stop-btn");
var alarmArray = [];
var time;

function currentTime() {
  var currentDate = new Date();
  var hours = appendZero(currentDate.getHours());
  var minutes = appendZero(currentDate.getMinutes());
  var seconds = appendZero(currentDate.getSeconds());
  const am = "AM";
  const pm = "PM";
  timeZone = hours <= 12 ? am : pm;
  hours = hours % 12 || 12;

  time = `${hours}:${minutes}:${seconds} ${timeZone}`;

  timeDisplay.innerText = time + "";
}
setInterval(currentTime, 1000);

function appendZero(time) {
  if (time < 10 && time.length != 2) {
    return "0" + time;
  }
  return time;
}
