let addCss = document.querySelector("#addCss");
let addJs = document.querySelector("#addJs");
let h1Txt = document.querySelector("#h1Txt");

function func1() {
  h1Txt.style.color = "gold";
}

function func2() {
  alert("这是一个弹窗");
}

addCss.addEventListener("click", func1);

addJs.addEventListener("click", func2);