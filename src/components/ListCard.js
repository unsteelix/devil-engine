import React from 'react'
import PropTypes from 'prop-types'
import fuzzysort from 'fuzzysort'

import { Card } from '../components/Card';
import { scrollToElementById } from '../utils/api';


export class ListCard extends React.Component {
  
  constructor(props) {
    super(props);
    //this.firstCard = this.firstCard.bind(this);

    this.state = { 
      firstCard: null
    };
  
  }

  scrollToFirst = (firstCard) => {

    if(firstCard){

      let id = firstCard.idCard;
      scrollToElementById(id);
    }
  }

  filter = (listCard) => {

    let filteredListCard = [];
    let query = this.props.query.toLowerCase();

    if( query !== ' ' ){

      let results = fuzzysort.go(query, listCard, {
        keys: ['title', 'text', 'tag'],
        // Create a custom combined score to sort by. -100 to the desc score makes it a worse match
        //scoreFn(a) => Math.max(a[0]?a[0].score:-1000, a[1]?a[1].score-100:-1000)
      })

      //console.log(results);
      results.forEach(function(item){
        filteredListCard.push(item.obj);
      })

    } else {
console.log(listCard);
      filteredListCard = listCard.sort(function compareNumeric(a, b) {
        let a_idCard = +a.idCard;
        let b_idCard = +b.idCard;

        if (a_idCard < b_idCard) return 1;
        if (a_idCard > b_idCard) return -1;
      });

    }

    
    /*
    let firstCard = filteredListCard[0];

    this.setState(state => ({
      firstCard: firstCard
    }));
    */
    return filteredListCard;
  }


  render() {
    const {listCard, query } = this.props

    return (
      <div className="ListCard">
        { this.filter(listCard).map((card, index) => (
          <Card index={index} key={card.id+'-'+card.idCard} id={+card.id} idCard={+card.idCard} title={card.title} text={card.text} tag={card.tag} password={card.password} hasStein={card.hasStein} isPrivate={card.isPrivate} />
        ))}
        {this.scrollToFirst( this.state.firstCard )}
      </div>
    )
  }
}

ListCard.propTypes = {
  listCard: PropTypes.array.isRequired
}