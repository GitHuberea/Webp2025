var container = document.getElementById('container');

window.addEventListener("keyup", function (e) {
  const currentText = container.textContent;
  console.log(e.key);
  if (e.key === 'Escape') {
    container.textContent = "";//清空字串
  }
  else if (e.key === 'Backspace') {
    var str = container.textContent;
    container.textContent = str.substring(0, str.length-1);// 刪除最後一個字元
  } 
  else if (currentText.length > 0 && e.key === currentText[0]) {
    container.textContent = currentText.slice(1); //檢查第一個字元
  } 
  else {
    container.textContent += e.key;
  }
  add_new_chars();// 每次操作後隨機新增字元
});

function add_new_chars() {
  const newChars = getRandomChars(1, 3); // 亂數的增加一到三個字元
  container.textContent += newChars;
}

function getRandomChars(min, max) {// 產生隨機字元
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z
  }
  return result;
}