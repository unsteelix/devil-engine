import React, { Component } from 'react';
import { connect } from 'react-redux'

import  AddCard  from '../components/system/AddCard';
import  AuthCard  from '../components/system/AuthCard';
import  HelpCard  from '../components/system/HelpCard';
import  AccountCard  from '../components/system/AccountCard';


export class ListSystemCard extends Component {
  render() {
    const { query } = this.props
    return (
      <div className="ListSystemCard">
    	{query == "/add" && <AddCard />}
    	{query == "/auth" && <AuthCard />}
      {query == "/help" && <HelpCard />}
      {query == "/account" && <AccountCard />}
      </div>
    )
  }
}



// приклеиваем данные из store
const mapStateToProps = store => {
  return {
    query: store.query.query
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
)(ListSystemCard)