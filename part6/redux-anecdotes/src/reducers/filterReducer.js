const filterReducer = (state = '', action) => {
  switch(action.type) {
  case 'FILTER':
    return action.searchField
  default:
    return state
  }
}

export const createFilter = (searchField) => {
  return {
    type: 'FILTER',
    searchField
  }
}

export default filterReducer