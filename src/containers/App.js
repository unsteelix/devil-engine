import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { setQuery } from '../actions/queryActions';
import { setListCard } from '../actions/cardActions';


/*  Component   */
import Search from '../components/Search';
import SteinShell from '../components/SteinShell';
import {ListCard} from '../components/ListCard';
import {ListSystemCard} from '../components/ListSystemCard';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      isDownloadComplete: false // флаг статуса загрузки списка карточек с БД
    };
  
  }

  componentDidMount() {
    //getListCard
    axios.get(`/getListCard`,{
      onDownloadProgress: function(progressEvent) {
        //const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        //console.log("onUploadProgress", totalLength);
        //console.log('скачалось: ');
        //console.log(progressEvent);
      }
    })
      .then(res => {
        const listCard = res.data;
        console.log('список карт получен');
        console.log(listCard);
        this.setState(state => ({
          isDownloadComplete: true
        }));
        this.props.setListCard(listCard.data);
        //let json = JSON.parse(listCard);
        //console.log(json);
      })
      .catch(function (error) {
        console.log(error);
      })  
  }

  hasSystemCard(query) {
    
    let hasSystemCard = false;
    let listSystemWord = ['/add', '/auth', '/help', '/account'];

    listSystemWord.forEach(function(word){

      if(~query.indexOf(word)){
        hasSystemCard = true
      }

    })

    return hasSystemCard;
  }

  render() {

    const { query, listCard, setListCard } = this.props

    return (
      <div className="App">
        <Search />
        {this.state.isDownloadComplete ? (this.hasSystemCard(query) ? <ListSystemCard query={query} /> : <ListCard listCard={listCard} query={query} />) : <h1>DOWNLOAD...</h1>}
      </div>
    );
  }
}



// приклеиваем данные из store
const mapStateToProps = store => {
  return {
    query: store.query.query,
    listCard: store.card.listCard
  }
}

// приклеиваем action из store
const mapDispatchToProps = dispatch => {
  return {
    setQuery: query => dispatch(setQuery(query)),
    setListCard: listCard => dispatch(setListCard(listCard))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)