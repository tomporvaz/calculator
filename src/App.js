import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import math from "mathjs";

let numbers = [
  "one",
  "two",
  "three", 
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
]

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
    
    /*if inputNumArr only has one number and that number is 0,
    then preform special process for entering numbers or decimal.*/
    if(arr.length === 1 && arr[0] === 0){
      //if input is a decimal, then append decimal and return
      if(input === "."){
        arr.push(".");
      } 
      //if input is a number, then replace 1st position with input
      else if (numRegEx.test(input)){
        console.log("Not a decimal point!");
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
    let arr = [...this.state.calcArr, this.state.inputNumArr.join(""), this.state.total, operation];
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
    let total = math.eval(newArr.join(""));
    let displayArr = [...this.state.calcArr, "=", total];

    this.setState({
      inputNumArr: [],
      calcArr: [],
      total: total
    })
  }

  /*didUpdate for console log debugging*/
  componentDidUpdate(){
    console.log("inputNumArr: " + this.state.inputNumArr);
    console.log("calcArr: " + this.state.calcArr);
    console.log("total: " + this.state.total);
  }






  renderButtons = numbers.map((number, index) => <button id={number} onClick={() => this.handleNumInput((index + 1))}>{index + 1}</button>);
    
  render() {
    
    return (
      <div className="App">
        <div id="calculator">
          <p id="display">{this.state.calcArr}{this.state.inputNumArr}{this.state.total}</p>
          <div id="btnContainer">
            <button id='clear' onClick={this.handleClear}>AC</button>
            <button id='divide' onClick={() => this.handleOperator("/")}>/</button>
            <button id='multiply'onClick={() => this.handleOperator("*")}>*</button>
            <button id='subtract'onClick={() => this.handleOperator("-")}>-</button>
            <div id="numBtnsContainer">
              {this.renderButtons}
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
  
  
  /*
  This is the basic flow of the program using math.js.  
  First the user will input the number via buttons or keypad to update the input array.
  The input array will be joined on the fly into a new state property,
  and this input will be displayed.  
  Second, the input will be pushed onto the calculation array when an operation is selected.
  Third, the operation will also be pushed on to the array.  
  Fourth, the calc array will be joined in a calculation string.
  (Maybe the calculation string should be displayed rather than the input string)
  Fifth, when the enter/= button is selected, calc string will be evaluated with math.eval
  */
  //print("Hello Tom")
  //print(math.eval('123 - 3 * 4'));
  
  let arr = [1, 2, 3, 4];
  let newArr = arr.join("");
  let calcArr = [2, "/", 7];
  let calcString = calcArr.join("");
  
  console.log(math.eval(calcArr.join("")));
  
   
  export default App;
  