"use strict";

const [...arr] = document.querySelectorAll(".stats");
const menu = document.querySelector(".menu");

window.addEventListener("load", update.bind(null, "weekly"));

menu.addEventListener("click", (e) => button(e));

async function displayStats(index, timePeriod) {
  const work = await getData(index);
  const current = work.timeframes[`${timePeriod}`].current;
  const previous = work.timeframes[`${timePeriod}`].previous;
  const fieldCurrent = arr[index].children[0];
  const fieldPreviou = arr[index].children[1];
  fieldCurrent.textContent = `${current}hrs`;
  switch (timePeriod) {
    case "daily":
      fieldPreviou.textContent = `Yesterday - ${previous}hrs`;
      break;
    case "weekly":
      fieldPreviou.textContent = `Last Week - ${previous}hrs`;
      break;
    case "monthly":
      fieldPreviou.textContent = `Last Month - ${previous}hrs`;
      break;
  }
}

async function getData(index) {
  const data = await fetch("data.json");
  const dataJSON = await data.json();
  return dataJSON[index];
}

function update(value) {
  arr.forEach((_, index) => displayStats(index, value));
}

function button(event) {
  if (!event.target.classList.contains("button")) return;
  [...menu.children].forEach((item) =>
    item.children[0].classList.remove("active")
  );
  const currentElement = event.target;
  currentElement.classList.add("active");
  update(currentElement.textContent.toLowerCase());
}
