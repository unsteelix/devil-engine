import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import { logout } from '../../actions/authActions'
import axios from 'axios';
import qs from 'qs';



export class AuthCard extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmitLogout = this.handleSubmitLogout.bind(this);
    this.clearForm = this.clearForm.bind(this);

    this.state = { 
      login: '',
      password: '',
      currentAccount: this.props.currentAccount
    };
  
  }

  clearForm(){
    this.setState({ 
      login: '',
      password: '' 
    });
  }

  handleSubmitLogin(){

    let data = {
      login: this.state.login,
      password: this.state.password
    }
    // получаем пользователя по его login/password
    axios.post(`/getAccountByLoginPassword`, qs.stringify({data}))
      .then(res => {
        const account = res.data;
        console.log('аккаунт получен');
        console.log(account);
        
        if(account.data.idAccount){ // успешно получен аккаунт

          this.setState(state => ({
            currentAccount: account.data
          }));
          
          this.props.login(account.data);

        } else {                    // аккаунт не найден

          this.clearForm();

        }

      })
      .catch(function (error) {
        console.log(error);
      }) 

  }

  handleSubmitLogout(){
    this.props.logout();
    this.clearForm();
  }

  handleChangeLogin(e) {
    this.setState({ login: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    
      const { currentAccount, query } = this.props

      return (
        <div className="AuthCard">
        <div>Вы: {currentAccount.idAccount ? <span>user</span> : <span>anonim</span>}</div>


        <input
          id="input-login"
          onChange={this.handleChangeLogin}
          value={this.state.login}
        />
        <input
          id="input-password"
          onChange={this.handleChangePassword}
          value={this.state.password}
        />
        {currentAccount.idAccount ? <h1 onClick={ this.handleSubmitLogout } >LogOut</h1> : <h1 onClick={ this.handleSubmitLogin } >LogIn</h1>}
        </div>
      )

  }
}


// приклеиваем данные из store
const mapStateToProps = store => {
  return {
    currentAccount: store.account.currentAccount
  }
}

// приклеиваем action из store
const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data)),
    logout: data => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthCard)