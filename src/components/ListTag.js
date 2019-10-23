import React from 'react'
import PropTypes from 'prop-types'
import { setQuery } from '../actions/queryActions'
import { connect } from 'react-redux'


export class ListTag extends React.Component {

  // конвертируем строку в массив тегов
  strToList(str){

    let list = [];
    list = str.split(' ');

    return list;
  }

  clickOnTag = (tag) => {
    console.log(tag);
    //this.props.setQuery('ss');
  }

  render() {
    const {listTag} = this.props
    if(listTag){
      return (
        <div className="ListTag">
          { this.strToList(listTag).map((tag, index) => (
            <div key={index} onClick={ () => {this.clickOnTag('tag')} } >#{tag}</div>
          ))}
        </div>
      )
  } else 
    return(<div>void</div>)
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
    setQuery: query => dispatch(setQuery(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTag)