/*	устанавливаем текст в строке запроса */
export function setQuery(query) {
  return {
    type: 'SET_QUERY',
    payload: query
  }
}