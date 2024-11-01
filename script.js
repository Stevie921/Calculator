//  DECLARE VARIABLES
let numbers = document.getElementsByClassName("number");
let equals = document.getElementById("equals");
let operators = document.getElementsByClassName("operator");
let operator = "";
let decimal = document.getElementById("decimal");
let zero = document.getElementById("zero");
let minus = document.getElementById("subtract");
let opArr = [];
let num1 = "";
let running = "";
let num2 = "";
let total = 0;
let reset = document.getElementById("clear");
let clearLast = document.getElementById("clearLast");
let display = document.getElementById("display");


//HANDLE NUMBERS CLICKED
for(let i = 0; i < numbers.length; i++){
 numbers[i].addEventListener("click",function(){
 //REMOVE THE DEFAULT 0 FROM DISPLAY
   if(num1 == ""){
     display.innerText = "";
   }

  //IF EQUALS HAS BEEN PRESSED AND THE NEXT BUTTON PRESSED IS A NUMBER, RESET 
   if(total !== 0 && operator == ""){
     fullReset();
   }
 //IF NO OPERATOR HAS BEEN SELECTED THEN ADD TO NUM1    
    if(operator == ""){
     num1 += this.innerText;
     //ONLY ALLOW ONE ZERO AT THE START OF NUM1 
      if(num1[0] == "0"){
        zero.disabled = true;
      } 
     display.innerText += this.innerText;  
    } else {
     //ALLOW ZERO TO BE CLICKED AGAIN FOR THE START OF NUM2 
     zero.disabled = false; 
     decimal.disabled = false; 
     num2 += this.innerText; 
     //ONLY ALLOW ONE ZERO AT THE START OF NUM2 
     if(num2[0] == "0"){
      zero.disabled = true; 
     } 
     display.innerText += this.innerText; 
    }
   });
 }

const allowOperator = () => {
  for(let i = 0; i < operators.length; i++){
    operators[i].style.pointerEvents = "auto";
  }
} 

allowOperator();

//HANDLE OPERATORS CLICKED
for(let i = 0; i < operators.length; i++){
 operators[i].addEventListener("click",function(){
   if(num1 !== "" && operator !== "" && num2 !== ""){
     sum();
     running = total;
     num1 = running;
     num2 = "";
     operator = "";
   } 
  operator = this.innerText;
   
 //HANDLE MULTIPLE OPERATORS IN A ROW (5 * - + 5) = 10
  opArr.push(this.innerText);
   
   if(opArr.length > 2 && opArr[2] !== "-"){
     operator = this.innerText;
     opArr = [];
   } 
   
  if(num1 !== "" && num2 !== ""){
     sum();
     num1 = total;
     num2 = "";
   }
   display.innerText += operator;
  });
}

//IF DECIMAL IS CLICKED
decimal.addEventListener("click",function(){
    if(num1.indexOf(".") > -1){
     decimal.disabled = true;
    }
});


//SUM FUNCTION
const sum = () => {
  //HANDLES 5 * - 5 = 25;
  if(opArr.length == 2 && opArr[1] == "-"){
    num2 = "-" + num2;
    operator = opArr[0];
  }

 //CONVERT THE STRINGS TO NUMBERS
  num1 = Number(num1);
  num2 = Number(num2);
    switch(operator){
    case "+":
    total  = num1 + num2;
    display.innerText = total;  
    break; 
    case "-":
    total = num1 - num2;
    display.innerText = total;   
    break;
    case "X":
    total = num1 * num2;
    display.innerText = total;   
    break; 
    case "/":
    total = num1 / num2;
    display.innerText = total;   
    break; 
 }
}


//IF EQUALS IS PRESSED
equals.addEventListener("click",function(){
  sum();
  num1 = total.toString();
  num2 = "";
  operator = "";
  opArr = [];
  decimal.disabled = false;
});

//CLEAR LAST INPUT
clearLast.addEventListener("click",function(){
  //CLEAR LAST INPUT INTO NUM1
  if(num1 !== "" && operator == "" && num2 == ""){
    num1 = num1.slice(0,num1.length -1);
    display.innerText = num1;
  }

  //CLEAR THE LAST OPERATOR
  if(num1 !== "" && operator !== "" && num2 == ""){
    operator = "";
    display.innerText = num1 + operator;
  }
  
  //CLEAR THE LAST INPUT INTO NUM2
  if(num1 !== "" && operator !== "" && num2 !== ""){
    num2 = num2.slice(0,num2.length -1);
    display.innerText = num1 + operator + num2;
  }
});

//RESET 
const fullReset = () => {
  display.innerText = "0";
  num1 = "";
  num2 = "";
  operator = "";
  total = 0;
  running.innerText = "";
  decimal.disabled = false;
  zero.disabled = false;
}

reset.addEventListener("click",function(){
   fullReset();
 });




