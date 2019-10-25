const initialContributors = {
    use_contributor_structure: false,
    contributors: [],
    isFetching: false,
    modal: {
        isOpen: false,
        postType: null,
        postFields: []
      }
}
    
export const contributorsReducer = (state = initialContributors, action) => {
switch (action.type) {
    case 'OPEN_CONTRIBUTORS_MODAL': 
          return { ...state, modal: { ...state.modal, isOpen: true, mode: action.payload.mode, contributor: action.payload.contributor } }
        case 'CLOSE_CONTRIBUTORS_MODAL': 
          return { ...state, modal: { ...state.modal, isOpen: false } }
    case 'TOGGLE_USE_CONTRIBUTOR_STRUCTURE': 
        return { ...state, use_contributor_structure: !state.use_contributor_structure }
    case 'CONTRIBUTORS_RECEIVED': 
        return { ...state, isFetching: false, contributors: action.payload }
    default:
        return state
}
}