const history = JSON.parse(localStorage.getItem("history")) || [];

function updateDisplay(value) {
  const display = document.getElementById("display");

  display.value = value;
  adjustFontSize(display);
}

function addToHistory(expression) {
  history.push(expression);
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();  
}

function renderHistory() {
  const historyElement = document.getElementById("history");
  historyElement.innerHTML = "";
  history.forEach((expression, index) => {
    const container = document.createElement("div");
    container.className = "history-item";
    const textContainer = document.createElement("div");
    textContainer.className = "text-container";
    const p = document.createElement("p");
    p.textContent = expression;
    textContainer.appendChild(p);
    const deleteIconContainer = document.createElement("div");
    deleteIconContainer.className = "delete-icon-container";
    const deleteIcon = document.createElement("span");
    deleteIcon.textContent = "x";
    deleteIcon.className = "delete-icon";
    deleteIcon.onclick = () => deleteHistoryItem(index);
    deleteIconContainer.appendChild(deleteIcon);
    container.appendChild(textContainer);
    container.appendChild(deleteIconContainer);
    historyElement.appendChild(container);
    const separator = document.createElement("div");
    separator.className = "separator";
    historyElement.appendChild(separator);
  });
}



function appendNumber(number) {
  const displayValue = document.getElementById("display").value;
  updateDisplay(displayValue === "0" ? number : displayValue + number);
}

function toggleSign() {
  const displayValue = document.getElementById("display").value;
  if (displayValue.charAt(0) === '-') {
    updateDisplay(displayValue.substring(1));
  } else {
    updateDisplay('-' + displayValue);
  }
}

function appendOperator(operator) {
  const displayValue = document.getElementById("display").value;
  if (displayValue !== "" && !isNaN(displayValue.slice(-1))) {
    updateDisplay(displayValue + operator);
  } else if (operator === "±") {
    toggleSign();
  } else if (operator === "%") {
    updateDisplay((parseFloat(displayValue) / 100).toString());
  }
}

function clearDisplay() {
  updateDisplay("");
}

function calculate() {
  const displayValue = document.getElementById("display").value;

  console.log(displayValue)
  if (/[+-×÷\/]/.test(displayValue)) {
    try {
      const result = eval(
        displayValue
          .replaceAll("×", "*")
          .replaceAll("÷", "/")
          .replaceAll("−", "-") 
          .replaceAll("+", "+")
      );
      if (result !== undefined) {
        updateDisplay(result);
        addToHistory(`${displayValue} = ${result}`);
      }
    } catch {
      updateDisplay("Error");
    }
  }
}

function adjustFontSize(textarea) {
  const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
  const lines = textarea.value.split("\n").length;
  if (lines > 1) {
    textarea.style.fontSize = "1.5em";
    textarea.style.overflowY = "scroll";
  } else {
    textarea.style.fontSize = "2.5em";
  }
}

function deleteHistoryItem(index) {
  history.splice(index, 1);
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

function deleteAllHistory() {
  history.length = 0;
  localStorage.removeItem("history");
  renderHistory();
}

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (!isNaN(key)) {
    appendNumber(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    const operatorMap = { "+": "+", "-": "−", "*": "×", "/": "÷" };
    appendOperator(operatorMap[key]);
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Backspace") {
    const displayValue = document.getElementById("display").value;
    updateDisplay(displayValue.slice(0, -1));
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === "%") {
    appendOpe
    rator("%");
  }
});

renderHistory();