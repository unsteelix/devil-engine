import axios from 'axios';
import qs from 'qs';




/*	NOT USE */
export function filterListCardByQuery(query) {
  return {
    type: 'FILTER_LIST_CARD_BY_QUERY',
    payload: query
  }
}

/*	создаем новую карточку NOT USE	*/
export function addCard(data) {
  return {
    type: 'ADD_CARD',
    payload: data
  }
}


/*  создаем/редактируем карточку  */
export function editCard(data) {
  return {
    type: 'EDIT_CARD',
    payload: data
  }
}


/*	устанавливаем список карточек	*/
export function setListCard(data) {
  return {
    type: 'SET_LIST_CARD',
    payload: data
  }
}


/*  удаляем карточку по id_card */
export function deleteCardByIdCard(idCard) {

  let data = idCard;
  let isDeleted = false;

  axios.post(`/deleteCardByIdCard`, qs.stringify({data}))
  .then(res => {
    const result = res.data;
    
    if(result.data){
      console.log('удалена карточка с id_card: '+idCard);
      alert('удалена карточка с id_card: '+idCard);
      isDeleted = true;
    } else {
      console.log(result);
    }
  
  })

  return {
    type: 'DELETE_CARD_BY_ID_CARD',
    payload: idCard
  }

}