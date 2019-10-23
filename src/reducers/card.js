const initialState = {
  listCard: [],
  listFilteredCard: []
}


export function cardReducer(state = initialState, action) {

  let listCard = state.listCard.slice();
  let card = action.payload;

  switch (action.type) {
    
    case 'SET_LIST_CARD':
    return { ...state, listCard: action.payload }
    
    case 'FILTER_LIST_CARD_BY_QUERY':
    	let query = action.payload;
    	let listFilteredCard = state.listCard.filter(function(card) {
    		if(card.id >= query){
    			return true
    		} else {
    			return false
    		}
		});
    return { ...state, listFilteredCard: listFilteredCard }

    /* NOT USE */
    case 'ADD_CARD': 
        //console.log(card);
    	
    	if(card.idUser){ //добавить как пользователь

    		

    	} else {		  // добавить анонимно

    		listCard = listCard.concat(card);

    	}

    return { ...state, listCard: listCard }

    case 'EDIT_CARD':
        console.log(card);
        
        if(card.idUser){ //добавить как пользователь

            

        } else {          // добавить анонимно

            listCard = listCard.concat(card);

        }

    return { ...state, listCard: listCard }

    case 'DELETE_CARD_BY_ID_CARD':
        let idCard = action.payload;
        let index = null;

        listCard.forEach(function(card, i){
            if(card.idCard == idCard){
                index = i;
            }
        })
console.log(index);
        let new_list_card = listCard.splice(index, 1);

    return { ...state, listCard: new_list_card }

    default:
    return state
  }
}