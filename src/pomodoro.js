export default function initPomodoro() {
  const btnPomodoro = document.querySelector("[data-pomodoro]");
  const displayStart = document.querySelector(".display-start");
  const displayApp = document.querySelector(".containerApp");
  const settings = document.querySelector(".settings");
  const minutes = document.querySelector("[data-minutes]");
  const seconds = document.querySelector("[data-seconds]");
  const start = document.querySelector("[data-start]");
  const pause = document.querySelector("[data-pause]");
  const reset = document.querySelector("[data-reset]");
  const btnSettings = document.querySelector("[data-config]");
  const displayConfig = document.querySelector(".displayConfig");
  const btnClose = document.querySelector(".btnClose");
  const btnConfirm = document.querySelector("#confirm");

  btnPomodoro.addEventListener("click", displayPomodoro);
  start.addEventListener("click", startTimer);
  pause.addEventListener("click", pauseTimer);
  reset.addEventListener("click", resetTimer);
  btnSettings.addEventListener("click", showConfig);
  btnClose.addEventListener("click", closeConfig);

  const title = document.querySelector(".title h1");
  title.innerText = "Pomodoro";

  const buttonFocus = document.createElement("button");
  buttonFocus.innerText = "Focus Time";
  buttonFocus.classList.add("btn", "focus");
  settings.appendChild(buttonFocus);
  buttonFocus.addEventListener("click", focusTimer);

  const buttonBreak = document.createElement("button");
  buttonBreak.innerText = "Break Time";
  buttonBreak.classList.add("btn", "break");
  settings.appendChild(buttonBreak);
  buttonBreak.addEventListener("click", breakTimer);
  btnConfirm.addEventListener("click", closeConfig);

  const labelConfig = document.querySelectorAll("[data-confignames] label");
  labelConfig.forEach((element) =>
    element.classList.value === "firstButtonConfig"
      ? (element.innerText = "Focus")
      : (element.innerText = "Break")
  );

  const inputNumberConfig = document.querySelectorAll(".inputNumber input");
  inputNumberConfig.forEach((element) =>
    element.className === "firstInputNumber"
      ? element.setAttribute("value", 25)
      : element.setAttribute("value", 5)
  );

  let timer, min, seg, type;
  focusTimer();

  function displayPomodoro() {
    btnPomodoro.style.animation = "toClick 3s forwards";
    setTimeout(() => {
      displayStart.style.display = "none";
      displayApp.style.display = "flex";
    }, 2000);
  }

  function startTimer() {
    timer = setInterval(() => {
      seg--;
      if (seg < 0) {
        seg = 59;
        min--;
        minutes.innerText = min;
      }
      if (seg < 10 && seg >= 0) {
        seconds.innerText = `0${seg}`;
      } else {
        seconds.innerText = seg;
      }

      if (min < 0) {
        finish(type);
      }
    }, 1000);
    start.setAttribute("disabled", "");
    pause.removeAttribute("disabled");
    reset.removeAttribute("disabled");
  }

  function pauseTimer() {
    clearInterval(timer);
    start.removeAttribute("disabled");
    pause.setAttribute("disabled", "");
  }

  function resetTimer() {
    start.removeAttribute("disabled");
    reset.setAttribute("disabled", "");
    pause.setAttribute("disabled", "");
    if (type === "focus") {
      focusTimer();
    } else {
      breakTimer();
    }
  }

  function finish(type) {
    minutes.innerText = "0";
    seconds.innerText = "00";
    clearInterval(timer);
    pause.setAttribute("disabled", "");
    type === "focus" ? alert("Take a break") : alert("Focus Time!!!!");
  }

  function focusTimer() {
    min = document.querySelector(".firstInputNumber").value;
    seg = 0;
    type = "focus";
    minutes.innerText = min;
    seconds.innerText = "00";
    changeAttribute(type);
    changeTimer(min, seg);
  }

  function breakTimer() {
    min = document.querySelector(".secondInputNumber").value;
    seg = 0;
    type = "break";
    changeTimer(min, seg);
    changeAttribute(type);
  }

  function changeTimer(min) {
    clearInterval(timer);
    minutes.innerText = min;
    seconds.innerText = "00";
    start.removeAttribute("disabled");
  }

  function changeAttribute(type) {
    if (type === "focus") {
      buttonFocus.setAttribute("disabled", "");
      buttonBreak.removeAttribute("disabled", "");
      displayApp.classList.remove("breakActive");
      displayApp.classList.add("focusActive");
    } else {
      buttonBreak.setAttribute("disabled", "");
      buttonFocus.removeAttribute("disabled", "");
      displayApp.classList.remove("focusActive");
      displayApp.classList.add("breakActive");
    }
  }

  function showConfig() {
    displayConfig.style.animation = "toShow 0.5s";
    displayConfig.style.display = "block";
  }

  function closeConfig() {
    displayConfig.style.display = "none";
    if (type === "focus") {
      focusTimer();
    } else {
      breakTimer();
    }
  }
}
