document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';

    function updateDisplay(value) {
        display.textContent = value;
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'C') {
                currentInput = '';
                operator = '';
                firstOperand = '';
                updateDisplay('0');
            } else if (value === '=') {
                if (firstOperand && operator && currentInput) {
                    const result = eval(`${firstOperand} ${operator} ${currentInput}`);
                    updateDisplay(result);
                    currentInput = result;
                    operator = '';
                    firstOperand = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    if (firstOperand && operator) {
                        const result = eval(`${firstOperand} ${operator} ${currentInput}`);
                        updateDisplay(result);
                        firstOperand = result;
                    } else {
                        firstOperand = currentInput;
                    }
                    operator = value;
                    currentInput = '';
                }
            } else {
                currentInput += value;
                updateDisplay(currentInput);
            }
        });
    });
});
