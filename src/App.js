import React, { Component } from 'react';
import './App.css';
import math from "mathjs";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNumArr: [],
      calcArr: [],
      total: 0

    }
    this.handleInput = this.handleNumInput.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleCalculation = this.handleCalculation.bind(this);
    
  }
  /*event handler for number inputs*/
  handleNumInput(input){
    let arr =[...this.state.inputNumArr];
    const numRegEx = /\d/;
    
    /*The if/then logic here validates the input of numeral zero,
    and decimal points.  Only 1 decimal per number and only one leading 
    zero before a decimal.*/

    /*If inputNumArr only has one number and that number is 0,
    then preform special process for entering numbers or decimal.*/
    if(arr.length === 1 && arr[0] === 0){
      //if input is a decimal, then append decimal and return
      if(input === "."){
        arr.push(".");
      } 
      //if input is a number, then replace 1st position with input
      else if (numRegEx.test(input)){
        arr[0] = input;
      }
    } 
    /*if input is a decimal and there are no decimals in the array,
    then append a decimal*/
    else if (input === "." && (arr.filter(x => x === ".") == 0)){
      if (arr[0] === undefined){
        arr = [0, "."];
      } else {
      arr.push(".");
      }
    }
    //else if input is a number, then append number to array
    else if (numRegEx.test(input)){
      arr.push(input);
    }
    
    this.setState({
      inputNumArr: arr,
      total: ""
    })
     
  }

  /*event handler for operations*/
  handleOperator(operation){
    let arr = [...this.state.calcArr];
    /*if input number is equal to zero, then update operator in the last position of calcArr
    with the input operation*/
    if(this.state.inputNumArr.length === 0 && this.state.total !== ""){
      arr = [...arr, this.state.total, operation];
    } else if(this.state.inputNumArr.length === 0){
      console.log("Last in calcArr: " + arr[arr.length - 1]);
      arr[arr.length - 1] = operation;
    } else {
      arr = [...arr, this.state.inputNumArr.join(""), operation];
    }

    
    this.setState({
      inputNumArr: [],
      calcArr: arr,
      total: ""
    })
  }

  /*event handler for clear all*/
  handleClear(){
    this.setState({
      inputNumArr: [],
      calcArr: [],
      total: 0
    })
  }

  /*event handler to calculate the total*/
  handleCalculation(){
    let newArr = [...this.state.calcArr, this.state.inputNumArr.join("")];

    /*if then logic added here to test for valid math expression before passing
    to math.eval*/
    if(this.state.inputNumArr.length !== 0){
      let total = math.eval(newArr.join(""));
      total = this.roundDigits(total, 11);
      this.setState({
        inputNumArr: [],
        calcArr: [],
        total: total
      })
    }
  }

  /*
  rounds the number of digits displayed by calculating the number of digits
  to the left of the decimal point and then rounding the numbers to the right
  of the decimal by the difference between the total digits and the left hand
  digits.
  */
  roundDigits(value, digits){
    let numArr = value.toString().split(".");
    let newDigits = digits;
    if(digits > 15){
      newDigits = 15;
    }
    console.log("new digits: " + newDigits);

    //logic to avoid passing math.round a negative number
    if(numArr[0].length > newDigits){
      return math.round(value, newDigits);  
    } else {
      return math.round(value, newDigits - numArr[0].length);
    }
  }


  render() { 
    console.log("rounding = " + (math.round(99999999999999999999.3*3, 15)));
    console.log("math.config: " + JSON.stringify(math.config()));
    console.log("math.format: " + JSON.stringify(this.roundDigits(math.format(99999999999910000.362577, {lower: 0, upper:100000000000}), 11)));
    return (
      <div className="App">
        <h3 style={{color: "white"}}>Calculator by</h3>
        <h4><a href="https://tomporvaz.github.io/">Tom Porvaznik</a></h4>
        <div id="calculator">
          <p id="display">{this.state.calcArr}{this.state.inputNumArr}{this.state.total}</p>
          <div id="btnContainer">
            <button id='clear' onClick={this.handleClear}>AC</button>
            <button id='divide' onClick={() => this.handleOperator("/")}>/</button>
            <button id='multiply'onClick={() => this.handleOperator("*")}>*</button>
            <button id='subtract'onClick={() => this.handleOperator("-")}>-</button>
            <div id="numBtnsContainer">
              <button id="seven" onClick={() => this.handleNumInput(7)}>7</button>
              <button id="eight" onClick={() => this.handleNumInput(8)}>8</button>
              <button id="nine" onClick={() => this.handleNumInput(9)}>9</button>
              <button id="four" onClick={() => this.handleNumInput(4)}>4</button>
              <button id="five" onClick={() => this.handleNumInput(5)}>5</button>
              <button id="six" onClick={() => this.handleNumInput(6)}>6</button>
              <button id="one" onClick={() => this.handleNumInput(1)}>1</button>
              <button id="two" onClick={() => this.handleNumInput(2)}>2</button>
              <button id="three" onClick={() => this.handleNumInput(3)}>3</button>
            </div>              
            <button id='add'onClick={() => this.handleOperator("+")}>+</button>
            <button id='zero' onClick={() => this.handleNumInput(0)}>0</button>
            <button id='decimal'onClick={() => this.handleNumInput(".")}>.</button>
            <button id='equals' onClick={this.handleCalculation}>=</button>
          </div>
        </div>
      </div>
      );
    }
  }; 
   
  export default App;
  