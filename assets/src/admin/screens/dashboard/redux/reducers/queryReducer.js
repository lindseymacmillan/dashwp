const initialQuery = {
    query_string: '',
    query_filter: 'any',
    query_term: 'Now Here This',
    query_start_date: 'Jun 01',
    query_end_date: 'Aug 15',
    query_results: []
}
  
export const queryReducer = (state = initialQuery, action) => {
    switch (action.type) {
        case 'SET_QUERY_STRING': 
            return { ...state, query_string: action.payload }
        case 'SET_ACTIVE_FILTER':
            return { ...state, query_filter: action.payload }
        case 'CONTENT_RECEIVED':
            return { ...state, query_results: action.payload }
        default:
            return state
    }
}