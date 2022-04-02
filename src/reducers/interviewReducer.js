const initialState = {
    products: [],
    productsLoadingStatus: 'idle',
}

const compare = ( a, b ) => {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name){
      return 1;
    }
    return 0;
  }

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PRODUCTS_FETCHING':
            return {
                ...state,
                productsLoadingStatus: 'loading'
            }
        case 'PRODUCTS_FETCHED':
            return {
                ...state,
                products: action.payload.sort(compare),
                productsLoadingStatus: 'idle'
            }
        case 'PRODUCTS_FETCHING_ERROR':
            return {
                ...state,
                productsLoadingStatus: 'error'
            }
        default:
            return state
    }
}

export default reducer;