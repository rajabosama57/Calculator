// const display = document.querySelector("#display");
// const buttons = document.querySelectorAll("button");
// const oparetors = ["%", "/", "*", "+", "-", "="];
// let output = "";

// const calculate = (btnValue) => {
//   if (btnValue === "=" && btnValue !== "") {
//     output = eval(output.replace("%", "/100"));
//   } else if (btnValue === "AC") {
//     output = "";
//   } else if (btnValue === "DEL") {
//     output = output.toString().slice(0, -1);
//   } else {
//     if (btnValue === "" && oparetors.includes(btnValue)) return;
//     output = output+ btnValue;

//   }
//   display.value = output;
// };
// buttons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     calculate(e.target.dataset.value);
//   });
// });
const display = document.querySelector("#display");
const historyDisplay = document.querySelector("#history");
const buttons = document.querySelectorAll("button");
const operators = ["%", "/", "*", "+", "-", "="];
let output = "";
let history = "";

const calculate = (btnValue) => {
  if (btnValue === "=" && output !== "") {
    try {
      history = output;
      // استبدال النسبة المئوية
      output = output.replace(/%/g, "/100");
      // تقييم التعبير مع الأقواس
      output = eval(output).toString();
      // عرض التاريخ والنتيجة
      historyDisplay.value = history;
    } catch (error) {
      output = "Error";
    }
  } else if (btnValue === "AC") {
    output = "";
    history = "";
    historyDisplay.value = "";
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else {
    // التحقق من الأقواس المتوازنة
    if (btnValue === "(" || btnValue === ")") {
      output += btnValue;
    } 
    // التحقق من عدم وجود مشغلات متتالية
    else if (operators.includes(btnValue)) {
      if (operators.includes(output.slice(-1))) return;
      if (output === "" && btnValue !== "-") return;
      output += btnValue;
    } 
    // التحقق من النقاط العشرية
    else if (btnValue === ".") {
      const parts = output.split(/[\+\-\*\/]/);
      if (parts[parts.length - 1].includes(".")) return;
      output += btnValue;
    } 
    // إضافة الأرقام
    else {
      output += btnValue;
    }
  }

  display.value = output || "0";
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calculate(e.target.dataset.value);
  });
});