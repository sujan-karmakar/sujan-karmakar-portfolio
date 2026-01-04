let input = document.querySelector("input");
let btns = document.querySelectorAll(".selectJS");
let operators = ['+', '-', 'x', '/'];
let parentheses = ['(', ')'];


input.focus();
input.addEventListener("blur", () => {
    input.focus();
});

//Operators shouldn't follow each other and first char is digit
let validInput = () => {
    let inputVal = input.value;
    if (inputVal[0]==='x' || inputVal[0]==='/') {
        alert("Equation cannot start with a operator");
        input.value = inputVal.slice(1);
    }
    if (inputVal.length === 1 && inputVal[0] === ')') {
        alert("Closing parentheses cannot start equation");
        input.value = inputVal.slice(0, inputVal.length - 1);
    }
    if (operators.includes(inputVal[inputVal.length - 3]) && inputVal[inputVal.length - 2] === '.' && operators.includes(inputVal[inputVal.length - 1])) {
        alert("Operator cannot preceed and proceed decimal point simultaneously");
        input.value = inputVal.slice(0, inputVal.length - 1);
    }
    if (operators.includes(inputVal[inputVal.length - 1]) && operators.includes(inputVal[inputVal.length - 2])) {
        if (inputVal[inputVal.length - 1] !== '-') {
            alert("One operator cannot follow another.");
            input.value = inputVal.slice(0, inputVal.length - 1);
        } else if (inputVal[inputVal.length - 2] === '-') {
            alert("Cannot have more than two operators.");
            input.value = inputVal.slice(0, inputVal.length - 1);
        }
    }
    if (parentheses.includes(inputVal[inputVal.length - 3]) && inputVal[inputVal.length - 2] === '.' && parentheses.includes(inputVal[inputVal.length - 1])) {
        alert("Parentheses cannot preceed and proceed decimal point simultaneously");
        input.value = inputVal.slice(0, inputVal.length - 1);
    }
    if (inputVal[inputVal.length - 2] === '.' && inputVal[inputVal.length - 1] === '(') {
        alert("Opening Parentheses cannot follow decimal point.");
        input.value = inputVal.slice(0, inputVal.length - 1);
    }
    if (inputVal[inputVal.length - 1] === '.' && inputVal[inputVal.length - 2] === ')') {
        alert("Closing Parentheses cannot preceed decimal point.");
        input.value = inputVal.slice(0, inputVal.length - 1);
    }

    if (inputVal[inputVal.length - 1] === '.') {
        let parts = inputVal.slice(0, -1).split(/[+\-x\/()]/);
        let currentNumber = parts[parts.length - 1];
        if (currentNumber.includes('.')) {
            alert("Cannot have multiple decimal points in one number.");
            input.value = inputVal.slice(0, inputVal.length - 1);
        }
    }

    if (operators.includes(inputVal[inputVal.length - 1]) && inputVal[inputVal.length - 2] === '(') {
        alert("Opening Parentheses cannot preceed operator.");
        input.value = inputVal.slice(0, inputVal.length - 1);
    }
    if (operators.includes(inputVal[inputVal.length - 2]) && inputVal[inputVal.length - 1] === ')') {
        alert("Closing Parentheses cannot proceed operator.");
        input.value = inputVal.slice(0, inputVal.length - 1);
    }
    if (parentheses.includes(inputVal[inputVal.length - 1]) && parentheses.includes(inputVal[inputVal.length - 2])) {
        alert("Parentheses does not follow each other use some operator or number.");
        input.value = inputVal.slice(0, inputVal.length - 1);
    }
    if (parentheses.includes(inputVal[inputVal.length - 3]) && inputVal[inputVal.length - 2] === '.' && operators.includes(inputVal[inputVal.length - 1])) {
        alert("Use some value after decimal point simultaneously");
        input.value = inputVal.slice(0, inputVal.length - 1);
    }
    if (operators.includes(inputVal[inputVal.length - 3]) && inputVal[inputVal.length - 2] === '.' && parentheses.includes(inputVal[inputVal.length - 1])) {
        alert("Use some value after decimal point simultaneously");
        input.value = inputVal.slice(0, inputVal.length - 1);
    }
}


//Add only digits and operator to input
input.addEventListener("input", function () {
    input.value = input.value.replace(/[^0-9.+\-x\/()]/g, '');

    validInput();
});


//Enter is equal to
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let equal = document.querySelector("#equal");
        equal.click();
    } else if (event.key === '*') {
        let mul = document.querySelector("#mul");
        mul.click();
    } else if (event.key === "Escape") {
        let ac = document.querySelector("#ac");
        ac.click();
    } else if (event.key === "Backspace") {
        input.focus();
    }
});

// AC and DEL buttons
let acBtn = document.querySelector("#ac");
let delBtn = document.querySelector("#del");

acBtn.addEventListener("click", () => {
    input.value = "";
});

delBtn.addEventListener("click", () => {
    input.value = input.value.slice(0, -1);
    validInput();
});


// HTML Buttons event Listener
for (let btn of btns) {
    btn.addEventListener("mousedown", (e) => {
        e.preventDefault();
    });

    btn.addEventListener("click", () => {
        if (btn.innerText != '=') {
            let start = input.selectionStart;
            let end = input.selectionEnd;
            let text = btn.innerText;
            let val = input.value;

            input.value = val.slice(0, start) + text + val.slice(end);
            input.selectionStart = input.selectionEnd = start + text.length;

            validInput();
        } else {
            let arr = numAndOperatorArr();
            if(operators.includes(arr[arr.length - 1])) { //Equation cannot end with operator
                alert("Equation cannot end with operator");
                input.value = input.value.slice(0, input.value.length - 1);
            }
            let result = calculation(arr);
            if (result !== undefined && result !== null) {
                input.value = result;
            }
        }
    })
}

//Store ops and nums in a array for infix calculation
let numAndOperatorArr = () => {
    let inputVal = input.value;
    let nums = inputVal.split(/([+\-x\/()])/).filter(token => token.trim() !== '');

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === '-') {
            if (i === 0 || ['+', '-', 'x', '/', '('].includes(nums[i - 1])) {
                if (i + 1 < nums.length && !isNaN(parseFloat(nums[i + 1]))) {
                    nums[i] = '-' + nums[i + 1];
                    nums.splice(i + 1, 1);
                } 
                else if (i + 1 < nums.length && nums[i + 1] === '(') {
                    nums[i] = '-1';
                    nums.splice(i + 1, 0, 'x');
                }
            }
        }
        
        if (i + 1 < nums.length) {
            let curr = nums[i];
            let next = nums[i + 1];
            
            let isCurrNum = !isNaN(parseFloat(curr));
            let isNextNum = !isNaN(parseFloat(next));
            
            if ((isCurrNum && next === '(') || 
                (curr === ')' && next === '(') || 
                (curr === ')' && isNextNum)) {
                nums.splice(i + 1, 0, 'x');
            }
        }
    }
    return nums;
}

function applyOperation(a, b, op) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === 'x') return a * b;
    if (op === '/') {
        if (b === 0) {
            alert("Zero devision error");
            input.value = '';
            return null;
        }
        return a / b;
    }
}

function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === 'x' || op === '/') return 2;
    return 0;
}

function isNumber(num) {
    if (typeof (num) === 'number') {
        return true;
    }
    return false;
}

// Infix Calculation
let calculation = (arr) => {
    while (arr.includes('(')) {
        let idx = arr.lastIndexOf('(');
        let closingIdx = arr.indexOf(')', idx);

        if (closingIdx === -1) {
            alert("Syntax Error: Missing closing parenthesis");
            input.value = '';
            return null;
        }

        let parenthesesArr = arr.slice(idx + 1, closingIdx);
        let result = evaluate(parenthesesArr);
        arr.splice(idx, closingIdx - idx + 1, result);
    }
    
    let finalResult = evaluate(arr);
    
    return finalResult;
}

let evaluate = (arr) => {
    while (arr.includes('x') || arr.includes('/')) {
        let opIdx = -1;
        let mulIdx = arr.indexOf('x');
        let divIdx = arr.indexOf('/');
        
        if (mulIdx !== -1 && divIdx !== -1) {
            opIdx = Math.min(mulIdx, divIdx);
        } else {
            opIdx = Math.max(mulIdx, divIdx);
        }
        
        let result = applyOperation(parseFloat(arr[opIdx - 1]), parseFloat(arr[opIdx + 1]), arr[opIdx]);
        arr.splice(opIdx - 1, 3, result);
    }
    while (arr.includes('+') || arr.includes('-')) {
        let opIdx = -1;
        let addIdx = arr.indexOf('+');
        let subIdx = arr.indexOf('-');
        
        if (addIdx !== -1 && subIdx !== -1) {
            opIdx = Math.min(addIdx, subIdx);
        } else {
            opIdx = Math.max(addIdx, subIdx);
        }
        
        let result = applyOperation(parseFloat(arr[opIdx - 1]), parseFloat(arr[opIdx + 1]), arr[opIdx]);
        arr.splice(opIdx - 1, 3, result);
    }
    
    if (arr.length > 1) {
        alert("Syntax Error: Missing operator");
        return null;
    }
    
    return arr[0];
}