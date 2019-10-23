import React from 'react'
import PropTypes from 'prop-types'
import { ListTag } from './ListTag';
import { md } from '../utils/api'
import { deleteCardByIdCard } from '../actions/cardActions'
import { PasswordShell } from './PasswordShell';
import SteinShell from './SteinShell';
import { scrollToElementById } from '../utils/api';
import { AddCard } from './system/AddCard';
import { EditCard } from './system/EditCard';


export class Card extends React.Component {
  
  constructor(props) {
    super(props);
    this.addAnimateClass = this.addAnimateClass.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onSteinOpen = this.onSteinOpen.bind(this);

    this.state = { 
      animateClass: 'Card',
      showPasswordShell: (this.props.password != '' ? true : false),
      showSteinShell: this.props.hasStein,
      mode: 'view'
    };
  
  }

  addAnimateClass(){
    this.setState(state => ({
      animateClass: 'Card show'
    }));
  }

  getHtmlFromRaw(){
    let raw = this.props.text;

    return { __html: md.render(raw) };
  }

  // правильынй ввод пароля
  onOpen(){
    this.setState(state => ({
      showPasswordShell: false
    }));
  }

  // правильынй ввод пароля Steins Gate
  onSteinOpen(){
    this.setState({
      showSteinShell: false
    });
  }

  onDoubleClick = (event) => {

    this.switchMode()
    console.log(event);
  }

  switchMode = (mode) => {

    if(mode){

    } else {
      this.setState({
        mode: this.state.mode == 'view' ? 'edit' : 'view'
      })
    }
  }

  componentDidMount() {
    //setTimeout(this.addAnimateClass, 100);
    
    // проверяем index - порядковый номер в списке
    // если index == 1, значит скролим до этого элемента
    if(this.props.index == 1){
      //scrollToElementById(this.props.idCard);
    }
  }

  render() {
    const { index, id, idCard, title, text, tag, password, isPrivate } = this.props


    if(isPrivate == 1){

      return(<h1>private card</h1>)

    } else {

      // режим РЕДАКТИРОВАНИЯ
      if(this.state.mode == 'edit'){

        return (
          <div className="Card" id={idCard} onDoubleClick={this.onDoubleClick} >

            <EditCard id={id} idCard={idCard} text={text} password={password} isPrivate={isPrivate} />

          </div>
        )

      // режим ПРОСМОТРА
      } else {

        return (
          <div className="Card" id={idCard} onDoubleClick={this.onDoubleClick} >

            {title != '' ? <div className="title">{title}</div> : ''}
                      
            {this.state.showSteinShell ? <SteinShell onOpen={this.onSteinOpen} /> : this.state.showPasswordShell ? <PasswordShell password={password} onOpen={this.onOpen} /> : <div className="text" dangerouslySetInnerHTML={this.getHtmlFromRaw()} /> }

            
            
            {tag != '' ? <ListTag listTag={tag} /> : ''}
            <div className="side-panel" onClick={() => {deleteCardByIdCard(idCard)} } >X</div>
          </div>
        )

      } 

    }


  }
}

Card.propTypes = {
  idCard: PropTypes.number.isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired
}