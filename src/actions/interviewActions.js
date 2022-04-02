export const productsFetching = () => {
    return {
        type: 'PRODUCTS_FETCHING'
    }
}
export const productsFetched = (products) => {
    return {
        type: 'PRODUCTS_FETCHED',
        payload: products
    }
}
export const productsFetchingError = () => {
    return {
        type: 'PRODUCTS_FETCHING_ERROR'
    }
}