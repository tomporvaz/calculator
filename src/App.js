import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import math from "mathjs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputArr: [],
      inputNum: 0,
      calcArr: [],
      calcString:"Let's calculate!"

    }
    
  }
  /*event handler for number input
  handleNumInput(){
    this.setState(
      inputArr
    )
    
  }
  */
  
  
  
  render() {
    return (
      <div className="App">
        <div id="calculator">
          <p id="display">{this.state.calcString}</p>
          <div id="btnContainer">
            <button id='clear'>CA</button>
                        <button id='divide'>/</button>
            <button id='multiply'>*</button>
            <button id='subtract'>-</button>
            <div id="numBtnsContainer">
              <NumBtns/>
            </div>              
            <button id='add'>+</button>
            <button id='zero'>0</button>
            <button id='decimal'>.</button>
            <button id='equals'>=</button>
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
  let calcArr = [newArr, "-", 3];
  let calcString = calcArr.join("");
  
  console.log(math.eval(calcString));
  
  //number button component
  
  function NumBtns() {
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
    const renderButtons = numbers.map((number, index) => <button id={number}>{index + 1}</button>);
    return renderButtons;
  }
  
  
  
  
  
  export default App;
  