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
      output = output.replace(/%/g, "/100");
      output = eval(output).toString();
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
    if (btnValue === "(" || btnValue === ")") {
      output += btnValue;
    } else if (operators.includes(btnValue)) {
      if (operators.includes(output.slice(-1))) return;
      if (output === "" && btnValue !== "-") return;
      output += btnValue;
    } else if (btnValue === ".") {
      const parts = output.split(/[\+\-\*\/]/);
      if (parts[parts.length - 1].includes(".")) return;
      output += btnValue;
    } else {
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

