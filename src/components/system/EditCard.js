import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import qs from 'qs';
import { setQuery } from '../../actions/queryActions'
import { editCard } from '../../actions/cardActions'
//import Editor from 'for-editor'
import Upload from '../Upload';
import { md } from '../../utils/api'



export class EditCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      text: this.props.text,
      password: this.props.password,
      isPrivate: this.props.isPrivate,
      editIsComplete: false // флаг, что карта успешно добавлена в БД
    };
  
  }

  isPrivateToggle(){
    this.setState(state => ({
      isPrivate: state.isPrivate ? false : true
    }));
  }

  handleSubmit(){

    let card = {
      id: this.props.id,
      idCard: this.props.idCard,
      text: this.state.text,
      password: this.state.password,
      isPrivate: this.state.isPrivate 
    }

    if(this.props.isAuth){  // есть пользователь
      card.idUser = 1;
    }

    let data = card;
    //добавляем данные в БД
    // затем, если успешно => обновляем store
    axios.post(`/editCard`, qs.stringify({data}))
      .then(res => {
        const idCard = res.data;
        
        console.log(idCard);
        console.log('В базу добавлена карта с id: ' + idCard.data);
        
        if(idCard.data){

          card.id_card = idCard.data;

          this.props.addCard(card);
          this.setState(state => ({
            editIsComplete: true
          }));
          this.props.setQuery(card.title);
        }

      })

  }

  handleChangeText(e) {
    this.setState({
      text: e.target.value 
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
    
      const { id, idCard, isAuth, query, editCard, setQuery } = this.props
      if(this.state.addIsComplete){
        return(
          <div className="">Complete</div>
        );
      }else
      return (
        <div className="EditCard">

          <div className="content-wrap">

            {/*  <div className="preview" dangerouslySetInnerHTML={this.getHtmlFromRaw()} />  */}

            <textarea 
              rows="4" 
              cols="50" 
              className="input-text" 
              onChange={this.handleChangeText} 
              defaultValue={this.state.text}
            />

          </div>

          <input type="text" value={this.state.password} className="input-password" onChange={this.handleChangePassword} placeholder="password" />


          <div className="button-private">
            приватно({this.state.isPrivate}): {!!this.state.isPrivate ? <span onClick={ this.isPrivateToggle } >да</span> : <span onClick={ this.isPrivateToggle } >нет</span>}
          </div>
          
          <div className="button-edit" onClick={ this.handleSubmit } >{idCard ? 'редактировать' : 'создать'} {isAuth ? 'как user' : 'как аноним'}</div>
          
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
    editCard: data => dispatch(editCard(data)),
    setQuery: query => dispatch(setQuery(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCard)