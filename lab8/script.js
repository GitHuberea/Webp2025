var container = document.getElementById('container');
let wrongCount = 0; // 連續錯誤次數

window.onload = function () {//隨機產生0到2個字元
  const initialChars = getRandomChars(0, 2);
  container.textContent = initialChars;
};

window.addEventListener("keyup", function (e) {
  const currentText = container.textContent;
  console.log(e.key);

  if (e.key === 'Escape') {
    container.textContent = "";// 清空字串
    wrongCount = 0; 
  } else if (e.key === 'Backspace') {
    container.textContent = currentText.substring(0, currentText.length - 1);// 刪除最後1個字元
    wrongCount = 0;
  } else if (currentText.length > 0 && e.key === currentText[0]) {
    container.textContent = currentText.slice(1); // 檢查輸入字元與第一個字元相同，刪除第1個字元
    wrongCount = 0;
  } else if (/^[a-zA-Z]$/.test(e.key)) {
    wrongCount++; // 累加錯誤次數
    container.textContent += e.key;
  }
  // 每次操作後隨機新增字元
  add_new_chars();
   
   if (wrongCount >= 3) {// 連續打錯三次，再增加6個亂數字元
    const extraChars = getRandomChars(6, 6);
    container.textContent += extraChars;
    wrongCount = 0; // 重設錯誤次數
  }
});

function add_new_chars() {
  const newChars = getRandomChars(1, 3); // 隨機增加1到3個字元
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