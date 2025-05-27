const display = document.getElementById("display");

function append(value) {
  display.textContent += value;
}

function clearDisplay() {
  display.textContent = "";
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1);
}

function calculate() {
  try {
    display.textContent = eval(display.textContent.replace('%', '/100'));
  } catch {
    display.textContent = "Error";
  }
}

document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    append(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === '%') {
    append('%');
  } else if (key === 'Escape') {
    clearDisplay();
  }
});