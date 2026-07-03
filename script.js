// Display
let display = document.getElementById("display");
let memory = 0;

function appendOperator(op) {
    display.value = display.value.trimEnd();
    if (display.value !== "") {
        display.value += " " + op + " ";
    } else {
        display.value = op + " ";
    }
}

function getCleanExpression() {
    return display.value.replace(/\s/g, "");
}

//PI
function pi() {
    if (display.value === "") {
        display.value = Math.PI;
    } else {
        display.value = display.value.trimEnd() + " * " + Math.PI;
    }
}

// e
function eValue() {
    if (display.value === "") {
        display.value = Math.E;
    } else {
        display.value = display.value.trimEnd() + " * " + Math.E;
    }
}
 

function power() {
    display.value += "**";
}

//%
function percentage() {
    let exp = getCleanExpression();

    let operators = ["+", "-", "*", "/"];

    for (let op of operators) {
        let index = exp.lastIndexOf(op);

        if (index > 0) {
            let first = parseFloat(exp.substring(0, index));
            let second = parseFloat(exp.substring(index + 1));

            if (isNaN(first) || isNaN(second)) {
                display.value = "Error";
                return;
            }

            if (op === "+" || op === "-") {
                second = first * second / 100;
            } else {
                second = second / 100;
            }

            display.value = first + op + second;
            return;
        }
    }
    let num = parseFloat(exp);
    if (!isNaN(num)) {
        display.value = num / 100;
    } else {
        display.value = "Error";
    }
}
//!
function factorial() {
    display.value += "!";
}
function calculate() {
    try {
        let exp = getCleanExpression();

        // Replace factorials
        exp = exp.replace(/(\d+)!/g, function(match, num) {
            num = parseInt(num);
            let fact = 1;

            for (let i = 2; i <= num; i++) {
                fact *= i;
            }

            return fact;
        });

        display.value = eval(exp);

    } catch (e) {
        console.log(e);
        display.value = "Error";
    }
}


//∛(
function cubeRoot() {
    if (display.value !== "") {
        display.value = "∛(" + display.value + ")";
    }
}function calculate() {
    try {
        let exp = getCleanExpression();

        // Factorial
        exp = exp.replace(/(\d+)!/g, function(match, num) {
            let fact = 1;
            num = parseInt(num);

            for (let i = 1; i <= num; i++) {
                fact *= i;
            }

            return fact;
        });

        // Cube Root
        exp = exp.replace(/∛\(([^)]+)\)/g, function(match, num) {
            return Math.cbrt(eval(num));
        });

        display.value = eval(exp);

    } catch {
        display.value = "Error";
    }
}



//CE
function clearEntry() {
    let exp = display.value;

    exp = exp.replace(/\s*\d*\.?\d+\s*$/, "");

    display.value = exp;
}


//sin
function sinFunction() {
    display.value = "sin(" + display.value + ")";
}
//cos
function cosFunction() {
    if (display.value !== "") {
        display.value = "cos(" + display.value + ")";
    }
}
//tan
function tanFunction() {
    if (display.value !== "") {
        display.value = "tan(" + display.value + ")";
    }
}
function calculate() {
    try {
        let exp = getCleanExpression();

        // Factorial
        exp = exp.replace(/(\d+)!/g, function(match, num) {
            let fact = 1;
            num = parseInt(num);

            for (let i = 1; i <= num; i++) {
                fact *= i;
            }

            return fact;
        });

        // Cube Root
        exp = exp.replace(/∛\(([^)]+)\)/g, function(match, num) {
            return Math.cbrt(Number(num));
        });

        // Sine (Degrees)
        exp = exp.replace(/sin\(([^)]+)\)/g, function(match, num) {
            return Math.sin(Number(num) * Math.PI / 180);
        });
        //cos
        exp = exp.replace(/cos\(([^)]+)\)/g, function(match, num) {
        return Math.cos(Number(num) * Math.PI / 180);
        });

        //tan
       
        exp = exp.replace(/tan\(([^)]+)\)/g, function(match, num) {
        let angle = Number(num);
         if (angle % 180 === 90) {
        return "Error";
        }
        let result = Math.tan(angle * Math.PI / 180);
        result = Number(result.toFixed(10));
        return result;
        });

        let answer = eval(exp);
        display.value = Number(answer.toFixed(10));

        display.value = eval(exp);

    } catch (error) {
        display.value = "Error";
    }
}


//MC,MR,M+,M-

function memoryAdd() {
    try {
        memory += Number(eval(getCleanExpression()));
    } catch {
        alert("Invalid expression");
    }
}

function memorySubtract() {
    try {
        memory -= Number(eval(getCleanExpression()));
    } catch {
        alert("Invalid expression");
    }
}

function memoryRecall() {
    display.value = memory;
}

function memoryClear() {
    memory = 0;
}


function toggleTheme(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        document.getElementById("themeBtn").innerHTML="☀️ Light Mode ";
    }else{
        localStorage.setItem("theme","light");
        document.getElementById("themeBtn").innerHTML="🌙 Dark Mode ";
    }
}

window.onload=function(){

    if(localStorage.getItem("theme")=="dark"){
        document.body.classList.add("dark");
        document.getElementById("themeBtn").innerHTML="☀️ Light Mode ";
    }

}
