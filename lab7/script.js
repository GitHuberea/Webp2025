var container = document.getElementById('container');

window.onload = function () {//隨機產生 0 到 2 個字元
  const initialChars = getRandomChars(0, 2);
  container.textContent = initialChars;
};

window.addEventListener("keyup", function (e) {
  const currentText = container.textContent;
  console.log(e.key);
  if (e.key === 'Escape') {
    // 清空字串
    container.textContent = "";
  } else if (e.key === 'Backspace') {
    // 刪除最後一個字元
    container.textContent = currentText.substring(0, currentText.length - 1);
  } else if (currentText.length > 0 && e.key === currentText[0]) {
    // 若輸入字元與第一個字元相同，刪除第一個字元
    container.textContent = currentText.slice(1);
  } else if (/^[a-zA-Z]$/.test(e.key)) {
    container.textContent += e.key;
  }

  // 每次操作後隨機新增字元
  add_new_chars();
});

function add_new_chars() {
  const newChars = getRandomChars(1, 3); // 隨機增加1到 3 個字元
  container.textContent += newChars;
}

function getRandomChars(min, max) {
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z
  }
  return result;
}