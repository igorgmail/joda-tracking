import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fetch = require('node-fetch')

import track from "./track.js";


let trigger = 4000
let interval = 1800000 // 25 минут

async function getLider(){
  const finalArr = await track()
  const lider = finalArr[0]
  const joda = finalArr.find((el) => el.id === '1652')

  const differense = lider.like - joda.like

  console.log("▶ ⇛ lider:", lider);
  console.log("▶ ⇛ joda:", joda);
  console.log("▶ ⇛ differense:", differense);
  return differense
}

async function goTrack(){
  const differense = await getLider()
  console.log("▶ ⇛ differense IN GOTRACK:", differense);
  if(differense >= trigger){
    console.log("--> Разница ", differense);
    console.log("--> Допустимая ", differense);
    goFetchRender()
    console.log("--> Запустили render");
    // здесь запросы на рендер функция
  }else{
    console.log(`--> Разница ${differense} допустимая ${trigger} render не запущен`);
  }
}

async function goFetchRender(){
  const likes = 250
  const joda1 = await fetch(`https://joda-min-singapore.onrender.com/go/${likes}`)
  const joda2 = await fetch(`https://joda-min2-oregon.onrender.com/go/${likes}`)
  const joda3 = await fetch(`https://joda-min3-frankfurt.onrender.com/go/${likes}`)
  const joda4 = await fetch(`https://joda-min4-ohio.onrender.com/go/${likes}`)
}

function round(goTrack, interval) {
  goTrack(); // Сразу вызываем функцию

  // Создаем функцию обратного вызова для setTimeout
  const callback = () => {
    goTrack(); // Вызываем функцию
    setTimeout(callback, interval); // Устанавливаем новый таймер
  };

  // Устанавливаем первый таймер
  setTimeout(callback, interval);
}

round(goTrack, interval)
