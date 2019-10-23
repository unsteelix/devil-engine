import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios';


export class AccountCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      isDownloadComplete: false,
      listAccount: []
    };
  
  }


  componentDidMount() {
    //getListAccount
    axios.get(`/getListAccount`,{
      onDownloadProgress: function(progressEvent) {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        console.log("onUploadProgress", totalLength);
        //console.log('скачалось: ');
        //console.log(progressEvent);
      }
    })
      .then(res => {
        const listAccount = res.data;
        console.log('список аккаунтов получен');
        console.log(listAccount);
        this.setState(state => ({
          isDownloadComplete: true,
          listAccount: listAccount.data
        }));
      })
      .catch(function (error) {
        console.log(error);
      })  
  }

  render() {
    
      return (
        <div className="AccountCard">
          <h3>*--------ACCOUNT--------*</h3>
          {this.state.isDownloadComplete ? 
            <div>        
              { this.state.listAccount.map(account => (
                <div key={account.id}>id: {+account.id} idAccount: {+account.idAccount} <b>{account.login} {account.password}</b></div>
              ))}
            </div> 
          : 
          <div>Downloading...</div>}
          <h3>*--------ACCOUNT--------*</h3>
        </div>
      )

  }
}


// приклеиваем данные из store
const mapStateToProps = store => {
  return {

  }
}

// приклеиваем action из store
const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCard)