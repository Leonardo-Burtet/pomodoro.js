export default function initPomodoro() {
  const btnPomodoro = document.querySelector("[data-pomodoro]");
  const buttonsStart = document.querySelectorAll(".display-start .btn");
  const displayStart = document.querySelector(".display-start");
  const display = document.querySelector(".container");
  const settings = document.querySelector(".settings");
  const title = document.querySelector(".title h1");
  const minutos = document.querySelector("[data-minutos]");
  const segundos = document.querySelector("[data-segundos]");
  const iniciar = document.querySelector("[data-iniciar]");
  const pausar = document.querySelector("[data-pausar]");
  const zerar = document.querySelector("[data-zerar]");
  const settingsTime = document.querySelector("[data-config]");
  const displayConfig = document.querySelector(".displayConfig");
  const btnClose = document.querySelector(".btnClose");
  const btnSetConfig = document.querySelector("#confirma");
  console.log(btnSetConfig);

  btnPomodoro.addEventListener("click", displayPomodoro);
  iniciar.addEventListener("click", iniciarTimer);
  pausar.addEventListener("click", pausarTimer);
  zerar.addEventListener("click", zerarTimer);
  settingsTime.addEventListener("click", showConfig);
  btnClose.addEventListener("click", closeConfig);

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
  btnSetConfig.addEventListener("click", closeConfig);

  title.innerText = "Pomodoro";

  let timer, min, seg, type;
  focusTimer();

  function displayPomodoro() {
    buttonsStart.forEach((item) => {
      if (item !== btnPomodoro) {
        item.style.animation = "noClick 0.3s forwards";
      }
    });
    btnPomodoro.style.animation = "toClick 3s forwards";
    setTimeout(() => {
      displayStart.style.display = "none";
      display.style.display = "flex";
    }, 2000);
  }

  function iniciarTimer() {
    console.log("iniciar");
    timer = setInterval(() => {
      seg--;
      if (seg <= 0) {
        seg = 59;
        min--;
        minutos.innerText = min;
      }
      if (seg < 10 && seg >= 0) {
        segundos.innerText = `0${seg}`;
      } else {
        segundos.innerText = seg;
      }

      if (min === 0 && seg === 0) {
        segundos.innerText = "00";
        minutos.innerText = "0";
        clearInterval(timer);
        pausar.setAttribute("disabled", "");
      }
    }, 1000);
    iniciar.setAttribute("disabled", "");
    pausar.removeAttribute("disabled");
    zerar.removeAttribute("disabled");
  }

  function pausarTimer() {
    clearInterval(timer);
    iniciar.removeAttribute("disabled");
    pausar.setAttribute("disabled", "");
  }

  function zerarTimer() {
    iniciar.removeAttribute("disabled");
    zerar.setAttribute("disabled", "");
    pausar.setAttribute("disabled", "");
    if (type === "focus") {
      focusTimer();
    } else {
      breakTimer();
    }
  }

  function focusTimer() {
    min = document.querySelector(".numberFoco").value;
    seg = 0;
    type = "focus";
    minutos.innerText = min;
    segundos.innerText = "00";
    changeAttribute(type);
    changeTimer(min, seg);
  }

  function breakTimer() {
    min = document.querySelector(".numberBreak").value;
    seg = 0;
    type = "break";
    changeTimer(min, seg);
    changeAttribute(type);
  }

  function changeTimer(min) {
    clearInterval(timer);
    minutos.innerText = min;
    segundos.innerText = "00";
    iniciar.removeAttribute("disabled");
  }

  function changeAttribute(type) {
    if (type === "focus") {
      buttonFocus.setAttribute("disabled", "");
      buttonBreak.removeAttribute("disabled", "");
      display.classList.remove("breakActive");
      display.classList.add("focusActive");
    } else {
      buttonBreak.setAttribute("disabled", "");
      buttonFocus.removeAttribute("disabled", "");
      display.classList.remove("focusActive");
      display.classList.add("breakActive");
    }
  }

  function showConfig() {
    displayConfig.style.animation = "Show 0.5s";
    displayConfig.style.display = "block";
  }
  function closeConfig() {
    displayConfig.style.display = "none";
    console.log("aconteceu");
    console.log(type);
    if (type === "focus") {
      focusTimer();
    } else {
      breakTimer();
    }
    /*const numberFoco = document.querySelector(".numberFoco").value;
    const numberBreak = document.querySelector(".numberBreak").value;
    console.log(type);
    console.log(numberFoco);
    console.log(numberBreak);*/
  }
}
