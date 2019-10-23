import React from 'react'
import { randomInteger } from '../utils/api'

export default class SteinShell extends React.Component {
  
  constructor(props) {
    super(props);
    this.clickOnButton = this.clickOnButton.bind(this);
    this.getRandomAnswer = this.getRandomAnswer.bind(this);
    this.getClassNameById = this.getClassNameById.bind(this);
    this.clickOnAnswer = this.clickOnAnswer.bind(this);

    this.state = { 
      value: [],
      x: null,
      y: null,
      countPressedButton: 0,
      pressedButton: [],
      answer: this.getRandomAnswer(),
      showAnswer: true
    };
  
  }

  // генерируем случайное число
  getRandomAnswer(){

    let answer = randomInteger(2, 19);

    return answer;
  }

  clickOnButton(id){
    
    // отмечаем что кнопка нажата/отжата
    let new_value = this.state.value;
    new_value[id-1] = new_value[id-1] ? false : true;
    this.setState({
      value: new_value
    })

    // смотрим кол-во нажатых кнопок
    let countPressedButton = 0;
    this.state.value.forEach(function(value){
      if(value){
        countPressedButton++;
      }
    })
    this.setState({
      countPressedButton: countPressedButton
    })

    // записываем в массив нажатых кнопок координаты
    let y = Math.trunc((id - 1) / 5) + 1;
    let x = id + 5 - (y * 5);

    if(countPressedButton > 0 && countPressedButton < 4){
      let new_pressedButton = this.state.pressedButton;
      new_pressedButton[countPressedButton-1] = {
        x: x,
        y: y
      }
      this.setState({
        pressedButton: new_pressedButton
      })
    }

    // проверяем на правильность (x * y) - x
    if(countPressedButton == 3){

      let val_1 = this.state.pressedButton[0]; // первая введенная цифра
      let val_2 = this.state.pressedButton[1]; // вторая введенная цифра
      let val_3 = this.state.pressedButton[2]; // третья введенная цифра

      if( (val_1.x * val_2.y) - val_3.x == this.state.answer){
        this.props.onOpen();
      }
    }


  }

  getClassNameById(id){
    return this.state.value[id-1] ? 'one-col pressed' : 'one-col';
  }

  clickOnAnswer(){
    this.setState({
      showAnswer: false
    })
  }

  componentDidMount() {

  }

  render() {

    if(this.state.showAnswer){
      return (
        <div className="SteinShell">
          <div className="answer" onClick={this.clickOnAnswer}>{this.state.answer}</div>
        </div>
      )
    } else 
    return (
      <div className="SteinShell">

        <div className="list-row">
          {/*<!--  строка 1   -->*/}
          <div className="list-col">

            <div className={this.getClassNameById(1)} onClick={ ()=>{this.clickOnButton(1)} } >dd</div>
            <div className={this.getClassNameById(2)} onClick={ ()=>{this.clickOnButton(2)} } >dd</div>
            <div className={this.getClassNameById(3)} onClick={ ()=>{this.clickOnButton(3)} } >dd</div>
            <div className={this.getClassNameById(4)} onClick={ ()=>{this.clickOnButton(4)} } >dd</div>
            <div className={this.getClassNameById(5)} onClick={ ()=>{this.clickOnButton(5)} } >dd</div>

          </div>

          {/*<!--  строка 2   -->*/}
          <div className="list-col">

            <div className={this.getClassNameById(6)} onClick={ ()=>{this.clickOnButton(6)} } >dd</div>
            <div className={this.getClassNameById(7)} onClick={ ()=>{this.clickOnButton(7)} } >dd</div>
            <div className={this.getClassNameById(8)} onClick={ ()=>{this.clickOnButton(8)} } >dd</div>
            <div className={this.getClassNameById(9)} onClick={ ()=>{this.clickOnButton(9)} } >dd</div>
            <div className={this.getClassNameById(10)} onClick={ ()=>{this.clickOnButton(10)} } >dd</div>

          </div>

          {/*<!--  строка 3   -->*/}
          <div className="list-col">

            <div className={this.getClassNameById(11)} onClick={ ()=>{this.clickOnButton(11)} } >dd</div>
            <div className={this.getClassNameById(12)} onClick={ ()=>{this.clickOnButton(12)} } >dd</div>
            <div className={this.getClassNameById(13)} onClick={ ()=>{this.clickOnButton(13)} } >dd</div>
            <div className={this.getClassNameById(14)} onClick={ ()=>{this.clickOnButton(14)} } >dd</div>
            <div className={this.getClassNameById(15)} onClick={ ()=>{this.clickOnButton(15)} } >dd</div>

          </div>

          {/*<!--  строка 4   -->*/}
          <div className="list-col">

            <div className={this.getClassNameById(16)} onClick={ ()=>{this.clickOnButton(16)} } >dd</div>
            <div className={this.getClassNameById(17)} onClick={ ()=>{this.clickOnButton(17)} } >dd</div>
            <div className={this.getClassNameById(18)} onClick={ ()=>{this.clickOnButton(18)} } >dd</div>
            <div className={this.getClassNameById(19)} onClick={ ()=>{this.clickOnButton(19)} } >dd</div>
            <div className={this.getClassNameById(20)} onClick={ ()=>{this.clickOnButton(20)} } >dd</div>

          </div>

        </div>
      </div>
    )

  }
}