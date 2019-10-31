const initialQuery = {
    string: '',
    type: 'any',
    term: dwp_data.name,
    startDate: 'Jun 01',
    endDate: 'Aug 15',
    results: []
}
  
export const queryReducer = (state = initialQuery, action) => {
    switch (action.type) {
        case 'SET_QUERY_STRING': 
            return { ...state, string: action.payload }
        case 'SET_ACTIVE_FILTER':
            return { ...state, type: action.payload }
        case 'CONTENT_RECEIVED':
            return { ...state, results: action.payload }
        default:
            return state
    }
}