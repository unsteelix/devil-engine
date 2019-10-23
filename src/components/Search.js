import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setQuery } from '../actions/queryActions'
import { filterListCardByQuery } from '../actions/cardActions'



class Search extends Component {

  constructor(props) {
    super(props);
    this.changeClassName = this.changeClassName.bind(this);

    this.state = { 
      className: 'Search',
      showExtra: false
    };
  
  }

  // NOT USE
  changeClassName(){
    this.setState(state => ({
      className: 'Search extra'
    }));
  }

  onChangeInput = (e) => {
    
    let value = e.target.value;
    let query = this.props.query;
    this.props.setQuery(value); 
    this.props.filterListCardByQuery(value);
    
    if(query.indexOf('/ex') != -1){
      this.setState({showExtra: true, className: 'Search extra'})
    } else {
      this.setState({showExtra: false, className: 'Search'})
    }

  }

  render() {

    const { query } = this.props

    return (
      <div className={this.state.className}>
        <input type="text" placeholder="input some..." value={query} onChange={this.onChangeInput}  />
        <div className="extra">extra</div>
      </div>
    );
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
    setQuery: query => dispatch(setQuery(query)),
    filterListCardByQuery: query => dispatch(filterListCardByQuery(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)