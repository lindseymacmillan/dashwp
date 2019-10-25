const initialPostTypes = {
    postTypes: [],
    modal: {
      isOpen: false,
      postType: null,
      activeField: {
        type: null
      }
    }
}

Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};
    
export const postTypesReducer = (state = initialPostTypes, action) => {
    switch (action.type) {
        case 'ADD_POST_TYPE': 
          return { ...state, postTypes: [...state.postTypes, action.payload] }
        case 'OPEN_POST_TYPES_MODAL': 
          const postType = JSON.parse(JSON.stringify(action.payload.postType))
          return { ...state, modal: { ...state.modal, isOpen: true, postType: postType, mode: action.payload.mode } }
        case 'ADD_POST_TYPE_CARD_FIELD': {
          const fields = state.modal.postType.card_fields.splice(0)
          fields.push(action.payload)
          return { ...state, modal: { ...state.modal, postType: { ...state.modal.postType, card_fields: fields} } }
        }
        case 'SET_POST_TYPE_CARD_ACTIVE_FIELD': 
          return { ...state, modal: { ...state.modal, activeField: action.payload} }
        case 'MOVE_POST_TYPE_CARD_FIELD': {
          const fields = state.modal.postType.card_fields.slice(0)
          if (0 <= action.payload.to && action.payload.to < fields.length) {
            console.log('is smaller!', action.payload.to, fields.length)
            fields.move(action.payload.from, action.payload.to)
            return { ...state, modal: { ...state.modal, activeField: { ...state.modal.activeField, index: action.payload.to }, postType: { ...state.modal.postType, card_fields: fields} } }
          } else {
            return { ...state}
          }
        }
        case 'DELETE_POST_TYPE_CARD_FIELD': {
          const fields = state.modal.postType.card_fields.slice(0)
          fields.splice(action.payload.index, 1)
          return { ...state, modal: { ...state.modal, activeField: { ...state.modal.activeField, type: null }, postType: { ...state.modal.postType, card_fields: fields} } }
        }
        case 'CLOSE_POST_TYPES_MODAL': 
          return { ...state, modal: { ...state.modal, isOpen: false, activeField: { ...state.modal.activeField, type: null} } }
        case 'FETCHING_POST_TYPES': 
          return { ...state, is_fetching: true }
        case 'POST_TYPES_RECEIVED': 
          return { ...state, is_fetching: false, postTypes: action.payload }
        case 'CREATING_POST_TYPE': 
          return { ...state, is_creating: true }
        case 'POST_TYPE_CREATED': 
          return { ...state, is_creating: false, new_modal_is_open: false }
        case 'GET_POST_TYPE_FIELDS': {
          const postFields = state.post_types[action.payload.post_type].post_fields.slice(0)
          return { ...state, modal: { ...state.modal, post_fields: postFields } }
        }
        case 'ADD_POST_TYPE_FIELD': {
          let postFields = state.modal.post_fields.slice(0)
          postFields[postFields.length] = { ...postFields[postFields.length], label: 'Label', key: 'field_key', is_meta: false, type: 'text', eval: '' }
          return { ...state, modal: { ...state.modal, post_fields: postFields } }
        }
        case 'REMOVE_POST_TYPE_FIELD': {
          let postFields = state.modal.post_fields.slice(0)
          postFields.splice(action.payload.field_index, 1)
          return { ...state, modal: { ...state.modal, post_fields: postFields } }
        }
        case 'MOVE_POST_TYPE_FIELD': {
          let postFields = state.modal.post_fields.slice(0)
          postFields.move(action.payload.from_index, action.payload.to_index)
          return { ...state, modal: { ...state.modal, post_fields: postFields } }
        }
        case 'SET_POST_TYPE_FIELD': {
          let postFields = state.modal.post_fields.slice(0)
          postFields[action.payload.field_index] = { ...postFields[action.payload.field_index], [action.payload.key]: action.payload.value }
          return { ...state, modal: { ...state.modal, post_fields: postFields } }
        }
        default:
            return state
    }
}