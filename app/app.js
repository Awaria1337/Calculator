const history = JSON.parse(localStorage.getItem('history')) || [];

function updateDisplay(value) {
    const display = document.getElementById('display');
    display.value = value;
    adjustFontSize(display);
}

function addToHistory(expression) {
    history.push(expression);
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = '';
    history.forEach((expression, index) => {
        const p = document.createElement('p');
        p.textContent = expression;
        const deleteIcon = document.createElement('span');
        deleteIcon.textContent = 'x';
        deleteIcon.className = 'delete-icon';
        deleteIcon.onclick = () => deleteHistoryItem(index);
        p.appendChild(deleteIcon);

        historyElement.appendChild(p); 
    });
}


function appendNumber(number) {
    const displayValue = document.getElementById('display').value;
    updateDisplay(displayValue === '0' ? number : displayValue + number);
}

function appendOperator(operator) {
    const displayValue = document.getElementById('display').value;
    if (operator === '±') {
        updateDisplay(displayValue.startsWith('-') ? displayValue.slice(1) : '-' + displayValue);
    } else if (operator === '%') {
        updateDisplay((parseFloat(displayValue) / 100).toString());
    } else {
        if (displayValue !== '' && !isNaN(displayValue.slice(-1))) {
            updateDisplay(displayValue + operator);
        }
    }
}

function clearDisplay() {
    updateDisplay('');
}

function calculate() {
    try {
        const displayValue = document.getElementById('display').value;
        const lastChar = displayValue.slice(-1);
        const result = eval(displayValue
            .replaceAll('×', '*')
            .replaceAll('÷', '/')
            .replaceAll('−', '-')
            .replaceAll('+', '+'));
        updateDisplay(result);
        addToHistory(`${displayValue} = ${result}`);
    } catch {
        updateDisplay('Error');
    }
}

function adjustFontSize(textarea) {
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
    const lines = textarea.value.split('\n').length;
    if (lines > 1) {
        textarea.style.fontSize = '1.5em';
        textarea.style.overflowY = 'scroll';
    } else {
        textarea.style.fontSize = '2.5em';
        textarea.style.overflowY = 'hidden';
    }
}

function deleteHistoryItem(index) {
    history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

renderHistory();
