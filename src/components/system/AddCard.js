import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import qs from 'qs';
import { addCard } from '../../actions/cardActions'
import { setQuery } from '../../actions/queryActions'
//import Editor from 'for-editor'
import Upload from '../Upload';
import { md } from '../../utils/api'



export class AddCard extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.isPrivateToggle = this.isPrivateToggle.bind(this);
    this.getHtmlFromRaw = this.getHtmlFromRaw.bind(this);

    this.state = { 
      title: '',
      text: '',
      tag: '',
      password: '',
      isPrivate: false,
      addIsComplete: false // флаг, что карта успешно добавлена в БД
    };
  
  }

  isPrivateToggle(){
    this.setState(state => ({
      isPrivate: state.isPrivate ? false : true
    }));
  }

  handleSubmit(){

    let card = {
      title: this.state.title,
      text: this.state.text,
      tag: this.state.tag,
      password: this.state.password,
      isPrivate: this.state.isPrivate 
    }

    if(this.props.isAuth){  // есть пользователь
      card.idUser = 1;
    }

    let data = card;
    //добавляем данные в БД
    // затем, если успешно => обновляем store
    axios.post(`/addCard`, qs.stringify({data}))
      .then(res => {
        const idCard = res.data;
        
        console.log(idCard);
        console.log('В базу добавлена карта с id: ' + idCard.data);
        
        if(idCard.data){

          card.id_card = idCard.data;

          this.props.addCard(card);
          this.setState(state => ({
            addIsComplete: true
          }));
          this.props.setQuery(card.title);
        }

      })

  }

  handleChangeTitle(e) {
    this.setState({
      title: e.target.value 
    });
  }

  handleChangeText(e) {
    this.setState({
      text: e.target.value 
    });
  }

  handleChangeTag(e) {
    this.setState({
      tag: e.target.value 
    });
  }

  handleChangePassword(e) {
    this.setState({
      password: e.target.value 
    });
  }

  getHtmlFromRaw(){
    let raw = this.state.text;

    return { __html: md.render(raw) };
  }

  render() {
    
      const { isAuth, query, addCard, setQuery } = this.props
      if(this.state.addIsComplete){
        return(
          <div className="">Complete</div>
        );
      }else
      return (
        <div className="AddCard">
          <input type="text" value={this.state.title} className="input-title" onChange={this.handleChangeTitle} placeholder="title"/>
          {/*<Editor value={this.state.text} onChange={this.handleChangeText} />*/}

          <div className="content-wrap">

            <div className="preview" dangerouslySetInnerHTML={this.getHtmlFromRaw()} />

            <textarea 
              rows="4" 
              cols="50" 
              className="input-text" 
              onChange={this.handleChangeText} 
              defaultValue={this.state.text}
            />

          </div>

          <input type="text" value={this.state.tag} className="input-tag" onChange={this.handleChangeTag} placeholder="#tag1 #tag2..." />

          <input type="text" value={this.state.password} className="input-password" onChange={this.handleChangePassword} placeholder="password" />


          <div className="button-private">
            приватно: {this.state.isPrivate ? <span onClick={ this.isPrivateToggle } >да</span> : <span onClick={ this.isPrivateToggle } >нет</span>}
          </div>
          
          {isAuth ? <div className="button-add" onClick={ this.handleSubmit } >добавить</div> : <div className="button-add" onClick={ this.handleSubmit } >добавить анонимно</div>}
          
          <Upload />
        </div>
      )

  }
}


// приклеиваем данные из store
const mapStateToProps = store => {
  return {
    query: store.query.query,
  }
}

// приклеиваем action из store
const mapDispatchToProps = dispatch => {
  return {
    addCard: data => dispatch(addCard(data)),
    setQuery: query => dispatch(setQuery(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard)