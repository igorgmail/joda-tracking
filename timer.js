function delayedInterval(fn, interval) {
  fn(); // Сразу вызываем функцию

  // Создаем функцию обратного вызова для setTimeout
  const callback = () => {
    fn(); // Вызываем функцию
    setTimeout(callback, interval); // Устанавливаем новый таймер
  };

  // Устанавливаем первый таймер
  setTimeout(callback, interval);
}

// Пример использования
function myFunction() {
  console.log('Функция выполняется');
}

delayedInterval(myFunction, 5000)