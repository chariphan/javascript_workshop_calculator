//operand operator operand ต้องมี ฝั่งซ้ายและขวา
// A กดปุ่มแล้วแสดงผล
// B แสดงตัวเลขบนหน้าจอเวลากด และ กดปุ่มเคลียเลขกลายเป็น 0
// C จุดทศนิยม 
// D รับค่าตัวเลข
// E แก้ไข setnumber ให้รับค่าที่2 ได้
//F การทำงานของ operator
//ตัวแปรประกอบด้วย 3ส่วน
const calculatorDisplay=document.querySelector('h1');// จอ Display
const inputBtn=document.querySelectorAll('button');//เข้าถึงปุ่มกดทั้งหมด ทั้งเลขและ operaor จะได้ออกมาเป็น  node list
const clearBtn=document.getElementById('clear-btn'); //ปุ่ม clear
//F
const calculate={
    "/":(firstNumber,secondNumber)=> secondNumber!=0 ? firstNumber/secondNumber : "error",
    "*":(firstNumber,secondNumber) => firstNumber * secondNumber,
    "+":(firstNumber,secondNumber) => firstNumber + secondNumber,
    "-":(firstNumber,secondNumber) => firstNumber - secondNumber,
    "=":(firstNumber,secondNumber) => secondNumber
}


//D.1 ตัวเลข1 ตัวดำเนินการ ตัวเลขตัวที่2 เช่น 9+8
let firstValue = 0; // ตัวเลขที่ 1
let operatorValue = ''; // เก็บตัวดำเนินการ
let waitForNext = false; // เก็บสถานะของตัวเลขและตัวดำเนินการอย่าพึ่งให้รับตัว2


//A.2 
function setNUmberValue(number){
// E.1
if(waitForNext){
    calculatorDisplay.textContent=number;
    waitForNext=false;
}else{
    //B.2
const displayValue=calculatorDisplay.textContent;//เอาค่าเริ่มต้นที่เป็น 0มาเก็บไว้ก่อน 
calculatorDisplay.textContent=displayValue==='0'?number:displayValue+number//บรรทัดนี้เชคว่า displayvalue=0ไหม ถ้าเป็น0 จะแทนที่ด้วย number ืี่เรากด แต่ถ้าไม่ใช่ 0 เราก็จะเอา เลขนั้น+ค่าแสดง
// เช่น ตอนแรกเป็น 0 เรากด 7 จะได้  7
// แต่ถ้า ตอนแรกเป็นเลข 8 เรากด 5 จะได้ 85 เลขมาต่อกันไม่ใช่บวกนะ
}
    
    
}
//A3.2
function callOperator(operator){
    //console.log(operator)
    //D.2 ถ้ายังไม่มีการเก็บ firstvalue ให้ไปเอาค่าเริ่มต้น จาก calculatorDisplay มาเป็น firstvalue เช่น กดครั้งแรกเลข7 first ก็คือ 0 
    const currentValue=Number(calculatorDisplay.textContent); 
    //E 2
    if(operatorValue && waitForNext){
        operatorValue=operator;
        return;
    }

    if(!firstValue){
        firstValue=currentValue; //ถ้าไม่มี firstvalue เราจะเอา firstvalue=currentValue
    }else{
       const result = calculate[operatorValue](firstValue,currentValue);
       calculatorDisplay.textContent=result;
       firstValue=result;
       if(firstValue === "error"){
        resetAll();
   }
       }

    operatorValue=operator; //โอเพอเรเต้อ
    waitForNext=true; //รับตัว2 ได้

}
//A4.2 กรองให้กดจุดได้แค่หลักเดียว
function addDecimal(){
    //console.log('decimal');
    //D3 ดัก .
    if(waitForNext) return;
    //C.2
    if(!calculatorDisplay.textContent.includes('.')){//ถ้ายังไม่มีจุด สามารถกดจุดต่อได้
         //C.1 เอาจุดทศนิยมมาแสดง
        calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`;//มันกดจุดได้หลายจุดเราเลยจะกรองให้มี1 จุดที่ C.2
}    
}


//A กรองข้อมูลปุ่ม inputBtn ว่า นั่นเป็น ตัวเลข หรือ operator
inputBtn.forEach((input)=>{//กรองแต่ละปุ่ม โดยเอามาใส่ในตัวแปร input
    //A.1 กรองผ่านชื่อ class พวกไม่มี class จะมีความยาว=0 เราเลยจะเข้าถึง
    //console.log(input.classList.length);
    //ปุ่ม 0-9
    if(input.className.length===0){
        input.addEventListener('click',()=>setNUmberValue(input.value));// ()=> ใส่อันนี้จะทำให้ค่าออกมาตัวเดียวเมื่อกด ถ้าไม่ใส่มันแสดงค่า0-9 หมดเลย
    }else if(input.classList.contains('operator')){//A.3 จะเอาปุ่ม operator จาก class ว่าใน classมีชื่อ operator ไหม
        input.addEventListener('click',()=>callOperator(input.value));
    }else if(input.classList.contains('decimal')){//A.4 จุด
        input.addEventListener('click',()=>addDecimal());
    }
   
});
//B.4 
function resetAll(){
    //D.3
    firstValue=0;
    operatorValue='';
    waitForNext=false;
    calculatorDisplay.textContent='0';
}
// B.3 กดปุ่ม clear
clearBtn.addEventListener('click',()=>resetAll());