import { createRequire } from "module";
const require = createRequire(import.meta.url);

const logger = require('morgan')
const express = require('express');
const fetch = require('node-fetch')
const HTMLParser = require('node-html-parser');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

function setDate() {
  const date = new Date();
  // Получаем текущее значение часового пояса в минутах
  const currentTimezoneOffset = date.getTimezoneOffset();
  // Рассчитываем разницу в минутах между текущим часовым поясом и GMT+0700
  const targetTimezoneOffset = -7 * 60; // GMT+0700 в минутах
  // Рассчитываем разницу в минутах между текущим часовым поясом и целевым часовым поясом
  const timezoneOffsetDifference = targetTimezoneOffset - currentTimezoneOffset;
  // Увеличиваем время на разницу часовых поясов
  date.setMinutes(date.getMinutes() + timezoneOffsetDifference);
  return date.toTimeString();
}

async function track(){
    const resultArray = [];
    let pageNumber = 1
// while(true){
  const response = await fetch(`https://sib.fm/promocat?page=1`)
  const page = await response.text()

  const root = HTMLParser.parse(page);
  const element = root.getElementById('b-c-prize')
  const divArray =  element.querySelectorAll('div>div> .bg-card-cat')
  if(divArray.length === 0) {
    console.log("Item block not found");
    // break
  }
  divArray.forEach((el) => {
    const item = el.getAttribute('item')
    const itemId = `card-c-like-${item}`
    const itemIdElement = el.parentNode.getElementById(itemId)
    const itemIdValue = itemIdElement.innerText.trim()
    resultArray.push({page: pageNumber,id: item,like: itemIdValue})
  })
  pageNumber += 1
// }
resultArray.sort((a, b) => b.like - a.like)
  console.log("------------------------------------------------");
  console.log("------ Время запроса -", setDate());

  return resultArray
}

export default track
